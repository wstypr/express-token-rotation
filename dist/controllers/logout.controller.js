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
const auth_service_1 = __importDefault(require("../service/auth.service"));
const logoutController = {
    handleLogout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { refreshToken } = req.cookies;
        yield auth_service_1.default.logout(refreshToken);
        return res
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .status(200)
            .json({ message: "logout success" });
    }),
    handleLogoutAll: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = res.locals;
        yield auth_service_1.default.logoutAll(user.id);
        return res
            .clearCookie("accessToken")
            .clearCookie("refreshToken")
            .status(200)
            .json({ message: "logout all success" });
    }),
};
exports.default = logoutController;
