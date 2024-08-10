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
const mongoose_1 = require("mongoose");
const user_schema_1 = __importDefault(require("../schemas/user.schema"));
const userModel = (0, mongoose_1.model)("User", user_schema_1.default);
const userRepository = {
    getAll: () => __awaiter(void 0, void 0, void 0, function* () {
        const allUsers = yield userModel.find();
        return allUsers;
    }),
    getOneByEmail: (email) => __awaiter(void 0, void 0, void 0, function* () {
        // return one user based on email
        const user = yield userModel.findOne({ email });
        return user;
    }),
    create: (userData) => __awaiter(void 0, void 0, void 0, function* () {
        // create one user based on user data given
        // return one user created
        const user = new userModel(userData);
        const newUser = yield user.save();
        return newUser;
    }),
    delete: (id) => __awaiter(void 0, void 0, void 0, function* () {
        // delete one user based on id
        // return deleted user
        const deletedUser = yield userModel.findOneAndDelete({ _id: id });
        return deletedUser;
    }),
};
exports.default = userRepository;
