"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_repository_1 = __importDefault(require("../repositories/todo.repository"));
const todoService = {
    getAll: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        const allTodos = yield todo_repository_1.default.getAll(userId);
        return allTodos;
    }),
    create: (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
        // input validation
        if (data.content.length === 0)
            throw new Error("content and isdone must be provided");
        const newTodo = yield todo_repository_1.default.create(userId, data);
        return newTodo;
    }),
};
exports.default = todoService;
