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
exports.TransactionService = void 0;
const prisma_1 = __importDefault(require("../helpers/prisma"));
class TransactionService {
    getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.transaction.findMany({
                where: { user_id: userId },
                orderBy: { id: "desc" }
            });
        });
    }
    create(userId, data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield prisma_1.default.transaction.create({
                data: {
                    description: data.description,
                    amount: data.amount,
                    category: data.category,
                    user_id: userId,
                    date: data.date_created,
                    group: data.group
                },
            });
        });
    }
    delete(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.transaction.findFirst({
                where: { id, user_id: userId },
            });
            if (!exists)
                throw new Error("Transaction not found");
            return yield prisma_1.default.transaction.delete({
                where: { id },
            });
        });
    }
    findById(userId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const exists = yield prisma_1.default.transaction.findFirst({
                where: { id, user_id: userId },
            });
            if (!exists)
                throw new Error("Transaction not found");
            return exists;
        });
    }
}
exports.TransactionService = TransactionService;
