"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controlller_1 = require("../controller/user.controlller");
const auth_1 = require("../auth/auth");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/register', user_controlller_1.userRegisterController);
exports.userRouter.post('/login', user_controlller_1.userLoginController);
exports.userRouter.put('/update/profile', auth_1.verifyUser, user_controlller_1.updateUserProfileController);
exports.userRouter.get('/all-users', auth_1.verifyUser, user_controlller_1.getAllUserController);
exports.userRouter.post('/to-do/create', auth_1.verifyUser, user_controlller_1.createToDoListForUserController);
exports.userRouter.put('/to-do/:id', auth_1.verifyUser, user_controlller_1.updateToDoListForUserController);
exports.userRouter.delete('/to-do/:id/:userId', auth_1.verifyUser, user_controlller_1.deleteToDoListForUserController);
exports.userRouter.get('/to-do/:id', auth_1.verifyUser, user_controlller_1.deleteToDoListForUserController);
