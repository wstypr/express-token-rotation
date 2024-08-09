import { Router } from "express";
import userController from "../controllers/user.controller";

const registerRouter = Router();

registerRouter.post("/", userController.handleCreate);

export default registerRouter;
