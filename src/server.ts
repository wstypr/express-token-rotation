import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route";
import todoRouter from "./routes/todo.route";
import registerRouter from "./routes/register.route";
import loginRouter from "./routes/login.route";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config();

app.get("/", (_, res) => {
  res.send("ok");
});

app.use("/user", userRouter);
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/login", loginRouter);
app.use("/api/v1/todo", todoRouter);

mongoose
  .connect(process.env.DB_URI as string)
  .then(() => console.log("db connection success"))
  .catch((error) => console.log("db connection error", error));

app.listen(process.env.PORT, () => {
  console.log(`listening to port:${process.env.PORT}`);
});
