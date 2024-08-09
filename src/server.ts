import express, { json } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.route";
import registerRouter from "./routes/register.route";
import loginRouter from "./routes/login.route";
import cookieParser from "cookie-parser";
import authService from "./service/auth.service";
import noTokenError from "./errors/notoken.error";

const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config();

app.get("/", (_, res) => {
  res.send("ok");
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/register", registerRouter);
app.use("/api/v1/login", loginRouter);
// app.use("/api/v1/todo", todoRouter);

app.get("/cookie", (req, res) => {
  const { accessToken, refreshToken } = req.cookies;
  res.status(200).json({ accessToken, refreshToken });
});

app.get("/resource", async (req, res) => {
  const { accessToken, refreshToken } = req.cookies;
  console.log(accessToken);
  try {
    const authorizedData = await authService.authorize(
      accessToken,
      refreshToken
    );
    if (authorizedData.accessToken === accessToken) {
      return res
        .status(200)
        .json({ userId: authorizedData.userId, name: authorizedData.name });
    } else {
      console.log(authorizedData.accessToken);
      return res
        .status(200)
        .cookie("accessToken", authorizedData.accessToken)
        .json({ userId: authorizedData.userId, name: authorizedData.name });
    }
  } catch (error) {
    if (error instanceof noTokenError) {
      res
        .status(401)
        .json({ error: error.message, message: "Pleare re-login" });
    }
  }
});

mongoose
  .connect(process.env.DB_URI as string)
  .then(() => console.log("db connection success"))
  .catch((error) => console.log("db connection error", error));

app.listen(process.env.PORT, () => {
  console.log(`listening to port:${process.env.PORT}`);
});
