import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import logoutController from "../controllers/logout.controller";

const logoutRouter = Router();

logoutRouter.use(authMiddleware);

logoutRouter.post("/", logoutController.handleLogout);
logoutRouter.post("/all", logoutController.handleLogoutAll);

export default logoutRouter;
