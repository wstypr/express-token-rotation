"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const refreshTokenSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.ObjectId, ref: "User" },
    token: String,
});
const refreshTokenModel = (0, mongoose_1.model)("refreshToken", refreshTokenSchema);
exports.default = refreshTokenModel;
