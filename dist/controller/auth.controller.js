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
exports.AuthController = void 0;
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const base_controller_1 = require("./base.controller");
class AuthController extends base_controller_1.BaseController {
    getRouter() {
        return this.router;
    }
    constructor() {
        super();
        this.router = (0, express_1.Router)();
        this.authService = new auth_service_1.AuthService();
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
        this.routes();
    }
    routes() {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
    }
    register(req, res) {
        const _super = Object.create(null, {
            error: { get: () => super.error }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.method === 'OPTIONS') {
                    return res.status(200).json(({ body: "OK" }));
                }
                const { name, email, password } = req.body;
                if (!name || !email || !password) {
                    return _super.error.call(this, res, "All fields are required");
                }
                const user = yield this.authService.register({ name, email, password });
                return this.success(res, user, "User registered successfully");
            }
            catch (error) {
                return this.error(res, error.message);
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (req.method === 'OPTIONS') {
                    return res.status(200).json(({ body: "OK" }));
                }
                const { email, password } = req.body;
                if (!email || !password) {
                    return this.error(res, "Email and password are required");
                }
                const result = yield this.authService.login(email, password);
                return this.success(res, result, "Login successful");
            }
            catch (error) {
                return this.error(res, error.message);
            }
        });
    }
}
exports.AuthController = AuthController;
exports.default = new AuthController().getRouter();
