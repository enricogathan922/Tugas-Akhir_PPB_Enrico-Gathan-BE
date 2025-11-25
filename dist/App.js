"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const index_route_1 = __importDefault(require("./routes/index.route"));
const cors_1 = __importDefault(require("cors"));
class App {
    constructor(port) {
        this.app = (0, express_1.default)();
        this.port = port;
        console.log('created application');
        this.initializeMiddleware();
        this.initializeRoutes();
        this.initializeNotFoundHandler();
        this.initializeErrorHandler();
    }
    initializeMiddleware() {
        this.app.use((0, cors_1.default)({
            origin: "*",
            credentials: true,
        }));
        this.app.use(express_1.default.json());
    }
    getApp() {
        return this.app;
    }
    initializeRoutes() {
        this.app.get("/", (req, res) => {
            res.json({
                status: true,
                message: "api running!",
            });
        });
        this.app.use("/api", index_route_1.default);
    }
    initializeNotFoundHandler() {
        this.app.use("/", (_req, res) => {
            res.status(404).json({
                status: 404,
                message: "Route not found",
                data: null,
            });
        });
    }
    initializeErrorHandler() {
        this.app.use((err, _req, res, _next) => {
            console.error(err);
            res.status(500).json({
                status: 500,
                message: "Internal server error",
                error: err.message,
            });
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server running on http://localhost:${this.port}`);
        });
    }
}
exports.App = App;
