import { Request, Response } from "express";
import todoService from "../service/todo.service";

const todoController = {
  handleGetAll: async (_: Request, res: Response) => {
    const user = res.locals;
    const allTodos = await todoService.getAll(user.id);
    return res.status(200).json({ data: allTodos });
  },
  handleCreate: async (req: Request, res: Response) => {
    const user = res.locals;
    const data = req.body;

    const newTodo = await todoService.create(user.id, data);
    return res.status(201).json({ data: newTodo });
  },
};

export default todoController;
