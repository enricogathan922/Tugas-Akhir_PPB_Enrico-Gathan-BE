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
exports.TransactionController = void 0;
const express_1 = require("express");
const transaction_service_1 = require("../services/transaction.service");
const base_controller_1 = require("./base.controller");
class TransactionController extends base_controller_1.BaseController {
    getRouter() {
        return this.router;
    }
    constructor() {
        super();
        this.router = (0, express_1.Router)();
        this.transactionService = new transaction_service_1.TransactionService();
        this.index = this.index.bind(this);
        this.store = this.store.bind(this);
        this.remove = this.remove.bind(this);
        this.show = this.show.bind(this);
        this.routes();
    }
    routes() {
        this.router.get("/", this.index);
        this.router.post("/", this.store);
        this.router.delete("/:id", this.remove);
        this.router.get("/:id", this.show);
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const transactions = yield this.transactionService.getAll(user.id);
                return this.success(res, transactions);
            }
            catch (err) {
                return this.error(res, err.message);
            }
        });
    }
    store(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const { description, amount, category, date, group } = req.body;
                if (!description || !amount || !category || !date || !group) {
                    return this.error(res, "Description, amount, category, date, group are required");
                }
                const trx = yield this.transactionService.create(user.id, {
                    description,
                    amount,
                    category,
                    date_created: new Date(date),
                    group
                });
                return this.success(res, trx, "Transaction added");
            }
            catch (err) {
                console.log(err);
                return this.error(res, err.message);
            }
        });
    }
    remove(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const id = Number(req.params.id);
                const deleted = yield this.transactionService.delete(user.id, id);
                return this.success(res, deleted, "Transaction deleted");
            }
            catch (err) {
                return this.error(res, err.message);
            }
        });
    }
    show(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const id = Number(req.params.id);
                const transaction = yield this.transactionService.findById(user.id, id);
                return this.success(res, transaction, 'success get transaction');
            }
            catch (error) {
                console.log(error);
                return this.error(res);
            }
        });
    }
}
exports.TransactionController = TransactionController;
exports.default = new TransactionController().getRouter();
