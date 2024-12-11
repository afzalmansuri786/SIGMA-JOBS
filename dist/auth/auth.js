"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.verifyUser = exports.verifyToken = exports.singToken = void 0;
const jwt = __importStar(require("jsonwebtoken"));
const user_model_1 = require("../models/user.model");
const singToken = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const signTokenData = yield jwt.sign(payload, 'secreteKey', { expiresIn: '2h' });
        return signTokenData;
    }
    catch (error) {
        console.log({ error });
        return { error };
    }
});
exports.singToken = singToken;
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validToken = yield jwt.verify(token, 'secreteKey');
        return validToken;
    }
    catch (error) {
        console.log({ error });
        return { error };
    }
});
exports.verifyToken = verifyToken;
const verifyUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const token = req.headers.authorization;
        const tokenDetails = yield jwt.decode(token);
        console.log({ tokenDetails });
        const userId = (_a = tokenDetails === null || tokenDetails === void 0 ? void 0 : tokenDetails.id) !== null && _a !== void 0 ? _a : null;
        const userDetails = yield user_model_1.userModel.findById(userId).lean();
        console.log({ userDetails });
        if (userId == null) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if ((userDetails === null || userDetails === void 0 ? void 0 : userDetails.role) !== 'admin') {
            req['user'] = { email: userDetails === null || userDetails === void 0 ? void 0 : userDetails.email, userId: userId, role: 'user' };
            next();
        }
        else {
            req['user'] = { email: userDetails === null || userDetails === void 0 ? void 0 : userDetails.email, role: 'admin', userId: userId };
            next();
        }
    }
    catch (error) {
        console.log({ error });
        return res.status(500).json({ error: "Unauthtorized request" });
    }
});
exports.verifyUser = verifyUser;
