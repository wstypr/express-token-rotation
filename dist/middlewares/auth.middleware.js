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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refershToken_repository_1 = __importDefault(require("../repositories/refershToken.repository"));
function authMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { accessToken, refreshToken } = req.cookies;
        // check if accesstoken & refreshtoken exist
        if (!accessToken || !refreshToken) {
            return res.status(401).json({ message: "please re-login" });
        }
        // check if accesstoken valid
        try {
            const { userId, name } = jsonwebtoken_1.default.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
            res.locals = { id: userId, name };
        }
        catch (error) {
            // check if refreshtoken exist in db
            const refreshTokenDB = yield refershToken_repository_1.default.get(refreshToken);
            if (!refreshTokenDB) {
                return res.status(401).json({ message: "please re-login" });
            }
            //  check if refreshtoken valid
            try {
                const { userId, name } = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
                // generate new accesstoken
                const newAccessToken = jsonwebtoken_1.default.sign({ userId, name }, process.env.ACCESS_TOKEN_KEY);
                res.cookie("accessToken", newAccessToken);
                res.locals = { id: userId, name };
            }
            catch (error) {
                // relogin if refreshtoken is invalid
                return res.status(401).json({ message: "please re-login" });
            }
        }
        next();
    });
}
exports.default = authMiddleware;
