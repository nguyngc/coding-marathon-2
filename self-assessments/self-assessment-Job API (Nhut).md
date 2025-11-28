## Self-Assessment – Job API (Nhut)

In this sprint, my main task on the backend was to build and improve the **Job API**. I worked on the Job model, CRUD controllers, pagination with `_limit`, ID validation, and error handling with a custom middleware.

---

### Example 1 – Improving the `getAllJobs` Endpoint

At first, my `getAllJobs` endpoint just returned all jobs from the database without any limit or clear sorting:

```js
// controllers/jobController.js (before)
const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({});
    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve jobs" });
  }
};
```

This worked, but it was not very good for the frontend, because there was no pagination and no “latest jobs first”.

I changed it so that it reads the `_limit` query parameter and sorts the jobs from newest to oldest:

```js
// controllers/jobController.js (after)
const getAllJobs = async (req, res) => {
  try {
    const limit = parseInt(req.query._limit);

    const jobs = limit
      ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
      : await Job.find({}).sort({ createdAt: -1 });

    return res.status(200).json(jobs);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve jobs" });
  }
};
```

**What I learned:**

- How to use query parameters to control how many results the API returns.
- That doing sorting and limiting on the backend makes it easier for the frontend to show the data in the right way.

---

### Example 2 – Making Job-by-ID Endpoints More Robust

For `getJobById` (and also `updateJob` and `deleteJob`), my first version assumed that the `id` in the URL was always a valid MongoDB ObjectId:

```js
// controllers/jobController.js (before)
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found." });
    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve job." });
  }
};
```

If the client sent an invalid id (for example `/api/jobs/abc`), Mongoose threw a CastError and the API returned a 500 error, which was not very clear.

I fixed this by checking the id before calling Mongoose:

```js
// controllers/jobController.js (after)
const getJobById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid job id" });
  }

  try {
    const job = await Job.findById(id);
    if (!job) return res.status(404).json({ message: "Job not found." });
    return res.status(200).json(job);
  } catch (error) {
    return res.status(500).json({ message: "Failed to retrieve job." });
  }
};
```

**What I learned:**

- It is important to validate route parameters (like IDs) early to avoid confusing 500 errors.
- Using the correct status codes (400 for bad input, 404 for not found, 500 for server errors) makes the API easier to understand and debug.

---

### Example 3 – Using `customMiddleware` for Error Handling

At the beginning, invalid routes and server errors were handled by Express defaults, which sometimes returned HTML instead of JSON. This did not match the rest of the Job API.

I added a simple `customMiddleware` with `unknownEndpoint` and `errorHandler`:

```js
// middleware/customMiddleware.js
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  response.status(500).json({ message: error.message });
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
```

Then I used it after the Job routes in `app.js`:

```js
// app.js
app.use("/api/jobs", jobRoutes);

app.use(unknownEndpoint);
app.use(errorHandler);
```

**What I learned:**

- Having a central place for error handling keeps the controllers cleaner.
- Returning JSON for errors (instead of the default HTML) makes the Job API more consistent and easier for the frontend to work with.
