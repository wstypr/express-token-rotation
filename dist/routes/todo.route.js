"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const todo_controller_1 = __importDefault(require("../controllers/todo.controller"));
const todoRouter = (0, express_1.Router)();
todoRouter.use(auth_middleware_1.default);
todoRouter.get("/", todo_controller_1.default.handleGetAll);
todoRouter.post("/", todo_controller_1.default.handleCreate);
exports.default = todoRouter;
