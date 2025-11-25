"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const App_1 = require("./App");
const PORT = parseInt(process.env.APP_PORT || "3000", 10);
const app = new App_1.App(PORT);
app.listen();
