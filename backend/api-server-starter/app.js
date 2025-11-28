require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");
const connectDB = require("./config/db");

const jobRoutes = require("./routes/jobRouter");
const userRouter = require("./routes/userRouter");

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use("/api/jobs", jobRoutes);
app.use("/api/users", userRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
