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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToDoListForUserByIdController = exports.deleteToDoListForUserController = exports.updateToDoListForUserController = exports.createToDoListForUserController = exports.getAllUserController = exports.updateUserProfileController = exports.userLoginController = exports.userRegisterController = void 0;
const user_service_1 = require("../services/user.service");
const userRegisterController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, phonNo, role } = req.body;
        const data = yield (0, user_service_1.userRegister)({ email, password, phonNo, role });
        res.status(201).json({ data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
exports.userRegisterController = userRegisterController;
const userLoginController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const data = yield (0, user_service_1.userLogin)({ email, password });
        res.status(201).json({ data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
exports.userLoginController = userLoginController;
const updateUserProfileController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password, phonNo } = req.body;
        const data = yield (0, user_service_1.updateUserProfile)(email, { password, phonNo });
        res.status(301).json({ data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
exports.updateUserProfileController = updateUserProfileController;
const getAllUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = (_a = req.user) !== null && _a !== void 0 ? _a : null;
        if (user.role !== 'admin') {
            return res.status(403).json({ message: "Forbidden" });
        }
        const { search } = req.query;
        const data = yield (0, user_service_1.getAllUser)({ search });
        res.status(201).json({ data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
exports.getAllUserController = getAllUserController;
const createToDoListForUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = (_a = req.user) !== null && _a !== void 0 ? _a : null;
        if (user.role !== 'user') {
            return res.status(403).json({ message: "Forbidden" });
        }
        const { title, description } = req.body;
        const data = yield (0, user_service_1.createToDoListForUser)({ title, description, userId: user.userId });
        res.status(201).json({ data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
exports.createToDoListForUserController = createToDoListForUserController;
const updateToDoListForUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = (_a = req.user) !== null && _a !== void 0 ? _a : null;
        if (user.role !== 'user') {
            return res.status(403).json({ message: "Forbidden" });
        }
        const { id } = req.params;
        const { title, description, userId } = req.body;
        const data = yield (0, user_service_1.updateToDoListForUser)({ id, title, description, userId: user === null || user === void 0 ? void 0 : user.userId });
        res.status(201).json({ data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
exports.updateToDoListForUserController = updateToDoListForUserController;
const deleteToDoListForUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = (_a = req.user) !== null && _a !== void 0 ? _a : null;
        if (user.role !== 'user') {
            return res.status(403).json({ message: "Forbidden" });
        }
        const { id, userId } = req.params;
        const data = yield (0, user_service_1.deleteToDoListForUser)(id, user === null || user === void 0 ? void 0 : user.userId);
        res.status(201).json({ data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
exports.deleteToDoListForUserController = deleteToDoListForUserController;
const getToDoListForUserByIdController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const user = (_a = req.user) !== null && _a !== void 0 ? _a : null;
        if (user.role !== 'user') {
            return res.status(403).json({ message: "Forbidden" });
        }
        const { id } = req.params;
        const data = yield (0, user_service_1.getToDoListForUserById)(id);
        res.status(201).json({ data });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});
exports.getToDoListForUserByIdController = getToDoListForUserByIdController;
