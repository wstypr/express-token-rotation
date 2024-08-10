"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const todoSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    content: String,
    isDone: Boolean,
});
const todoModel = (0, mongoose_1.model)("Todo", todoSchema);
exports.default = todoModel;
