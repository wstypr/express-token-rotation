import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userController from "./controllers/user.controller";
import userRouter from "./routes/user.route";

const app = express();
app.use(express.json());

dotenv.config();

app.get("/", (_, res) => {
  res.send("ok");
});

app.use("/user", userRouter);
app.use("/register", registerRouter);

mongoose
  .connect(process.env.DB_URI as string)
  .then(() => console.log("db connection success"))
  .catch((error) => console.log("db connection error", error));

app.listen(process.env.PORT, () => {
  console.log(`listening to port:${process.env.PORT}`);
});
