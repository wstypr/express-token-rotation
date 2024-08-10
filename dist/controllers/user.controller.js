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
const user_service_1 = __importDefault(require("../service/user.service"));
const userController = {
    handleGetAll: (_, res) => __awaiter(void 0, void 0, void 0, function* () {
        // get all users
        const allUsers = yield user_service_1.default.getAll();
        return res.status(200).json({ data: allUsers });
    }),
    handleCreate: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        // create a user
        try {
            const newUser = yield user_service_1.default.create(req.body);
            return res.status(201).json({ newUser });
        }
        catch (error) {
            if (error instanceof Error) {
                return res.status(400).json({ error: error.message });
            }
        }
    }),
    handleDelete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        // delete a user based on id
    }),
    handleGetByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        // get a user based on email
    }),
};
exports.default = userController;
