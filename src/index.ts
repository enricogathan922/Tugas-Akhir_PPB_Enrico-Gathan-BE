import { config } from "dotenv";
config();

import { App } from "./App";

const PORT = parseInt(process.env.APP_PORT || "3000", 10);
const app = new App(PORT);

export const handler = app.getApp();
export default handler;
