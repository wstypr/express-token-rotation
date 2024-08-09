import { Schema, model } from "mongoose";

const todoSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  content: String,
  isDone: Boolean,
});

const todoModel = model("Todo", todoSchema);

export default todoModel;
