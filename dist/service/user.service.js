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
const userService = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        // get all users
        try {
            const allUsers = yield user_repository_1.default.getAll();
            return allUsers;
        }
        catch (error) {
            console.log("error get all users", error);
        }
    }),
    create: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = data;
        // input validation
        // input validation: name must exist
        if (name.length === 0)
            throw Error("name must be provided");
        // input validation: email must exist
        if (email.length === 0)
            throw Error("email must be provided");
        // input validation: password must exist
        if (password.length === 0)
            throw Error("password must be provided");
        // input validation: email collision check
        const existedUser = yield user_repository_1.default.getOneByEmail(email);
        if (existedUser)
            throw Error("email already registered");
        // hash password
        const hashedPassword = yield bcrypt_1.default.hash(password, 13);
        // save to db
        const newUser = yield user_repository_1.default.create({
            name,
            email,
            password: hashedPassword,
        });
        return newUser;
    }),
};
exports.default = userService;
