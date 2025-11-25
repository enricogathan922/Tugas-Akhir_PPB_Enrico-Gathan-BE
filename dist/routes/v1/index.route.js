"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../../controller/user.controller"));
const auth_controller_1 = __importDefault(require("../../controller/auth.controller"));
const auth_middleware_1 = __importDefault(require("../../middlewares/auth.middleware"));
const transaction_controller_1 = __importDefault(require("../../controller/transaction.controller"));
const router = (0, express_1.Router)();
router.use("/auth", auth_controller_1.default);
router.use(auth_middleware_1.default.bearer);
router.use("/users", user_controller_1.default);
router.use("/transactions", transaction_controller_1.default);
exports.default = router;
