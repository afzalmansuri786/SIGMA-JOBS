"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.todoListModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const toList = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    user: {
        type: mongoose_1.default.Types.ObjectId,
        ref: 'user',
        required: true
    }
}, {
    timestamps: true
});
exports.todoListModel = mongoose_1.default.model('todolist', toList);
