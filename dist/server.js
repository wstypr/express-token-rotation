"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const todo_route_1 = __importDefault(require("./routes/todo.route"));
const register_route_1 = __importDefault(require("./routes/register.route"));
const login_route_1 = __importDefault(require("./routes/login.route"));
const logout_route_1 = __importDefault(require("./routes/logout.route"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
dotenv_1.default.config();
app.get("/", (_, res) => {
    res.send("ok");
});
app.use("/user", user_route_1.default);
app.use("/api/v1/register", register_route_1.default);
app.use("/api/v1/login", login_route_1.default);
app.use("/api/v1/todo", todo_route_1.default);
app.use("/api/v1/logout", logout_route_1.default);
mongoose_1.default
    .connect(process.env.DB_URI)
    .then(() => console.log("db connection success"))
    .catch((error) => console.log("db connection error", error));
app.listen(process.env.PORT, () => {
    console.log(`listening to port:${process.env.PORT}`);
});
