import express from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();

app.get("/", (_, res) => {
  res.send("ok");
});

app.listen(process.env.PORT, () => {
  console.log(`listening to port:${process.env.PORT}`);
});
