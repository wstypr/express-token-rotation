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
const user_repository_1 = __importDefault(require("../repositories/user.repository"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refershToken_repository_1 = __importDefault(require("../repositories/refershToken.repository"));
const authService = {
    login: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = data;
        // input validation
        // input validation: email & password must not blank
        if (email.length === 0 || password.length === 0)
            throw new Error("authentication failed");
        // input validation: user exist
        const user = yield user_repository_1.default.getOneByEmail(email);
        if (!user)
            throw new Error("user not found");
        // compare password
        const isPasswordMatch = yield bcrypt_1.default.compare(password, user.password);
        if (!isPasswordMatch) {
            throw new Error("authentication failed");
        }
        const { _id, name } = user;
        // authorization using jwt
        const accessToken = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name }, process.env.ACCESS_TOKEN_KEY, { expiresIn: Number(process.env.ACCESS_TOKEN_EXPIRE) });
        const refreshToken = jsonwebtoken_1.default.sign({ userId: user._id, name: user.name }, process.env.REFRESH_TOKEN_KEY, { expiresIn: process.env.REFRESH_TOKEN_EXPIRE });
        refershToken_repository_1.default.create({
            userId: String(user._id),
            token: refreshToken,
        });
        return { user: { _id, name, email }, accessToken, refreshToken };
    }),
    logout: (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
        yield refershToken_repository_1.default.delete(refreshToken);
        return;
    }),
    logoutAll: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield refershToken_repository_1.default.deleteAll(userId);
        return;
    }),
};
exports.default = authService;
