import { Router, Request, Response } from "express";
import { AuthService } from "../services/auth.service";
import { BaseController } from "./base.controller";

export class AuthController extends BaseController {
    private router: Router;
    private authService: AuthService;

    public getRouter() {
        return this.router;
    }

    constructor() {
        super();
        this.router = Router();
        this.authService = new AuthService();

        this.register = this.register.bind(this);
        this.login = this.login.bind(this);

        this.routes();
    }

    private routes() {
        this.router.post("/register", this.register);
        this.router.post("/login", this.login);
    }

    private async register(req: Request, res: Response) {
        try {
            if (req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }


            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return super.error(res, "All fields are required");
            }

            const user = await this.authService.register({ name, email, password });

            return this.success(res, user, "User registered successfully");
        } catch (error: any) {
            return this.error(res, error.message);
        }
    }

    private async login(req: Request, res: Response) {
        try {
            if (req.method === 'OPTIONS') { return res.status(200).json(({ body: "OK" })) }

            const { email, password } = req.body;

            if (!email || !password) {
                return this.error(res, "Email and password are required");
            }

            const result = await this.authService.login(email, password);

            return this.success(res, result, "Login successful");
        } catch (error: any) {
            return this.error(res, error.message);
        }
    }
}

export default new AuthController().getRouter();
