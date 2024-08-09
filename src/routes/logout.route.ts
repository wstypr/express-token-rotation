import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import authService from "../service/auth.service";

const logoutRouter = Router()

logoutRouter.use(authMiddleware)

logoutRouter.post("/",()=>{})