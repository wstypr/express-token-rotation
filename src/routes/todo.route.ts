import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import todoController from "../controllers/todo.controller";

const todoRouter = Router();
todoRouter.use(authMiddleware);

todoRouter.get("/", todoController.handleGetAll);
todoRouter.post("/", todoController.handleCreate);

export default todoRouter;
