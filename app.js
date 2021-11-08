require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//cors
const cors = require('cors');

const connectDB = require("./db/connect");
const authenticateUser = require("./middleware/authentication");

// routers
const authRouter = require("./routes/auth");
const publicRouter = require("./routes/public");
const userRouter = require("./routes/users");
const matchRouter = require("./routes/match");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(cors());
app.use(express.json());

// routes
app.use("/", publicRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateUser, userRouter);
app.use("/api/v1/matches", matchRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
