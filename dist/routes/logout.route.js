"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
const logout_controller_1 = __importDefault(require("../controllers/logout.controller"));
const logoutRouter = (0, express_1.Router)();
logoutRouter.use(auth_middleware_1.default);
logoutRouter.post("/", logout_controller_1.default.handleLogout);
logoutRouter.post("/all", logout_controller_1.default.handleLogoutAll);
exports.default = logoutRouter;
