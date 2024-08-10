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
const todo_service_1 = __importDefault(require("../service/todo.service"));
const todoController = {
    handleGetAll: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = res.locals;
        const allTodos = yield todo_service_1.default.getAll(user.id);
        return res.status(200).json({ data: allTodos });
    }),
    handleCreate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = res.locals;
        const data = req.body;
        try {
            const newTodo = yield todo_service_1.default.create(user.id, data);
            return res.status(201).json({ data: newTodo });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ message: error.message });
            }
        }
    }),
};
exports.default = todoController;
