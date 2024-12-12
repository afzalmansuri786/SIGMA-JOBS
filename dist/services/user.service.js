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
exports.getToDoListForUserById = exports.deleteToDoListForUser = exports.updateToDoListForUser = exports.createToDoListForUser = exports.getAllUser = exports.updateUserProfile = exports.userLogin = exports.userRegister = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const auth_1 = require("../auth/auth");
const to_list_model_1 = require("../models/to-list.model");
const user_model_1 = require("../models/user.model");
try { }
catch (error) {
    console.log({ error });
}
const userRegister = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userRole = (userInput === null || userInput === void 0 ? void 0 : userInput.role) === 'admin' ? 'Admin' : 'User';
        if (!(userInput === null || userInput === void 0 ? void 0 : userInput.email) || !(userInput === null || userInput === void 0 ? void 0 : userInput.password)) {
            throw new Error("Unable to register user");
        }
        const userCreate = yield user_model_1.userModel.create(Object.assign({}, userInput));
        yield userCreate.save();
        return { message: `${userRole} registered successfully` };
    }
    catch (error) {
        console.log({ error });
        throw new Error("Unable to register user");
    }
});
exports.userRegister = userRegister;
const userLogin = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findsUser = yield user_model_1.userModel.findOne({
            email: userInput === null || userInput === void 0 ? void 0 : userInput.email
        }).lean();
        if (findsUser) {
            if ((userInput === null || userInput === void 0 ? void 0 : userInput.password) === findsUser.password) {
                const token = yield (0, auth_1.singToken)({ id: findsUser === null || findsUser === void 0 ? void 0 : findsUser._id });
                return {
                    message: "Login successfull",
                    user: token
                };
            }
            else {
                throw new Error("Password invalid");
            }
        }
    }
    catch (error) {
        console.log({ error });
        throw new Error("Error in login");
    }
});
exports.userLogin = userLogin;
const updateUserProfile = (email, userUpdateInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updateUserDetails = yield user_model_1.userModel.findOneAndUpdate({
            email
        }, userUpdateInput, {
            new: true
        });
        if (!updateUserDetails) {
            throw new Error("User updation failed");
        }
        return {
            message: "User profile update successfully"
        };
    }
    catch (error) {
        console.log({ error });
        throw new Error("User updation failed");
    }
});
exports.updateUserProfile = updateUserProfile;
const getAllUser = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let query = {};
        if ((userInput === null || userInput === void 0 ? void 0 : userInput.search) !== null && (userInput === null || userInput === void 0 ? void 0 : userInput.search) !== undefined) {
            query = {
                email: { $regexp: userInput === null || userInput === void 0 ? void 0 : userInput.search, $options: 'i' }
            };
        }
        const findUsers = yield user_model_1.userModel.find(query).sort({
            createdAt: -1
        });
        return {
            message: 'success',
            users: findUsers
        };
    }
    catch (error) {
        console.log({ error });
        throw new Error('Error in fethcing users');
    }
});
exports.getAllUser = getAllUser;
const createToDoListForUser = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createToDoList = yield to_list_model_1.todoListModel.create(Object.assign(Object.assign({}, userInput), { user: userInput === null || userInput === void 0 ? void 0 : userInput.userId }));
        yield createToDoList.save();
        return {
            message: "ToDoList created successfully"
        };
    }
    catch (error) {
        console.log({ error });
        throw new Error("Error in task creation");
    }
});
exports.createToDoListForUser = createToDoListForUser;
const updateToDoListForUser = (userInput) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = (userInput === null || userInput === void 0 ? void 0 : userInput.userId) || '';
        delete userInput.userId;
        console.log({ userId: new mongoose_1.default.Schema.ObjectId(userId), id: new mongoose_1.default.Schema.ObjectId(userInput === null || userInput === void 0 ? void 0 : userInput.id) });
        const findTask = yield to_list_model_1.todoListModel.findById(new mongoose_1.default.Schema.ObjectId(userInput === null || userInput === void 0 ? void 0 : userInput.id)).lean();
        console.log({ findTask });
        if ((findTask === null || findTask === void 0 ? void 0 : findTask.user.toString()) !== userId) {
            throw new Error("You are not owner of this todo list");
        }
        const updateToDoList = yield to_list_model_1.todoListModel.findByIdAndUpdate(userInput === null || userInput === void 0 ? void 0 : userInput.id, userInput);
        if (!updateToDoList) {
            throw new Error("Update task failed");
        }
        return {
            message: "ToDoList update successfully"
        };
    }
    catch (error) {
        console.log({ error });
        throw new Error("Error in task updation");
    }
});
exports.updateToDoListForUser = updateToDoListForUser;
const deleteToDoListForUser = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findTask = yield to_list_model_1.todoListModel.findOne({ _id: id, user: userId }).lean();
        if (!findTask) {
            throw new Error("You are not owner of this todo list");
        }
        const deleteToDoList = yield to_list_model_1.todoListModel.findOneAndDelete({ _id: id });
        if (!deleteToDoList) {
            throw new Error("Delete task failed");
        }
        return {
            message: "ToDoList deleted successfully"
        };
    }
    catch (error) {
        console.log({ error });
        throw new Error("Error in task deletion");
    }
});
exports.deleteToDoListForUser = deleteToDoListForUser;
const getToDoListForUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteToDoList = yield to_list_model_1.todoListModel.findByIdAndDelete(id);
        if (!deleteToDoList) {
            throw new Error("Delete task failed");
        }
        return {
            message: "ToDoList deleted successfully"
        };
    }
    catch (error) {
        console.log({ error });
        throw new Error("Error in task deletion");
    }
});
exports.getToDoListForUserById = getToDoListForUserById;
