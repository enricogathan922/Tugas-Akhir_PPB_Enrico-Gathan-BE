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
exports.UserController = void 0;
const express_1 = require("express");
const user_service_1 = require("../services/user.service");
const base_controller_1 = require("./base.controller");
class UserController extends base_controller_1.BaseController {
    getRouter() {
        return this.router;
    }
    constructor() {
        super();
        this.userService = new user_service_1.UserService();
        this.router = (0, express_1.Router)();
        this.index = this.index.bind(this);
        this.routes();
    }
    routes() {
        this.router.get("/", this.index);
    }
    index(req, res) {
        const _super = Object.create(null, {
            success: { get: () => super.success }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield this.userService.getAllUsers();
                _super.success.call(this, res, users);
            }
            catch (error) {
                this.error(res, "Failed to fetch users");
            }
        });
    }
}
exports.UserController = UserController;
exports.default = new UserController().getRouter();
