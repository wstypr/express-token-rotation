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
const refreshtoken_schema_1 = __importDefault(require("../schemas/refreshtoken.schema"));
const refreshTokenRepository = {
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { userId, token } = data;
        const newRefreshToken = yield new refreshtoken_schema_1.default({
            userId,
            token,
        }).save();
        return newRefreshToken;
    }),
    delete: (token) => __awaiter(void 0, void 0, void 0, function* () {
        yield refreshtoken_schema_1.default.findOneAndDelete({
            token,
        });
    }),
    deleteAll: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        yield refreshtoken_schema_1.default.deleteMany({ userId });
    }),
    get: (token) => __awaiter(void 0, void 0, void 0, function* () {
        const tokenDB = yield refreshtoken_schema_1.default.findOne({ token });
        return tokenDB;
    }),
};
exports.default = refreshTokenRepository;
