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
exports.AuthService = void 0;
const prisma_1 = __importDefault(require("../helpers/prisma"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    register(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const existing = yield prisma_1.default.user.findUnique({
                where: { email: data.email },
            });
            if (existing) {
                throw new Error("Email already exists");
            }
            const hashed = yield bcryptjs_1.default.hash(data.password, 10);
            return yield prisma_1.default.user.create({
                data: {
                    name: data.name,
                    email: data.email,
                    password: hashed,
                },
            });
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.default.user.findUnique({
                where: { email },
            });
            if (!user)
                throw new Error("Invalid email or password");
            const match = yield bcryptjs_1.default.compare(password, user.password);
            if (!match)
                throw new Error("Invalid email or password");
            const token = jsonwebtoken_1.default.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" });
            return { user, token };
        });
    }
}
exports.AuthService = AuthService;
