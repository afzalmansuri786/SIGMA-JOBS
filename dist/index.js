"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = require("./config/db.config");
const user_routes_1 = require("./routes/user.routes");
const app = (0, express_1.default)();
const port = 3002;
app.use(express_1.default.json());
app.use('/api', user_routes_1.userRouter);
(0, db_config_1.mongooseDbConnection)();
app.listen(port, () => {
    console.warn(`Server is up at port : ${port}`);
});
