require("dotenv").config();
const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

const connectDB = require("./config/db");
const { unknownEndpoint, errorHandler } = require("./middleware/customMiddleware");

const userRouter = require("./routes/userRouter");  
const jobRouter = require("./routes/jobRoutes");  

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

connectDB();

app.use("/api/users", userRouter);

app.use("/api/jobs", jobRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
