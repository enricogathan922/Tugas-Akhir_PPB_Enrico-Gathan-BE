import { Router, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { BaseController } from "./base.controller";

export class UserController extends BaseController {
  private router: Router;
  private userService: UserService;

  public getRouter() {
    return this.router;
  }

  constructor() {
    super();
    this.userService = new UserService();
    this.router = Router();
    this.index = this.index.bind(this);
    this.routes();
  }

  private routes() {
    this.router.get("/", this.index);
  }

  private async index(req: Request, res: Response) {
    try {
      const users = await this.userService.getAllUsers();
      super.success(res, users);
    } catch (error) {
      this.error(res, "Failed to fetch users");
    }
  }
}

export default new UserController().getRouter();
