import { model, Schema } from "mongoose";

const refreshTokenSchema = new Schema({
  userId: { type: Schema.ObjectId, ref: "User" },
  token: String,
});

const refreshTokenModel = model("refreshToken", refreshTokenSchema);

export default refreshTokenModel;
