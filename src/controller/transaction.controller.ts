import { Router, Request, Response } from "express";
import { TransactionService } from "../services/transaction.service";
import { BaseController } from "./base.controller";

export class TransactionController extends BaseController {
    private router: Router;
    private transactionService: TransactionService;

    public getRouter() {
        return this.router;
    }

    constructor() {
        super();
        this.router = Router();
        this.transactionService = new TransactionService();

        this.index = this.index.bind(this);
        this.store = this.store.bind(this);
        this.remove = this.remove.bind(this);
        this.show = this.show.bind(this)

        this.routes();
    }

    private routes() {
        this.router.get("/", this.index);
        this.router.post("/", this.store);
        this.router.delete("/:id", this.remove);
        this.router.get("/:id", this.show)
    }

    private async index(req: Request, res: Response) {
        try {
            const user = req.user!;
            const transactions = await this.transactionService.getAll(user.id);
            return this.success(res, transactions);
        } catch (err: any) {
            return this.error(res, err.message);
        }
    }

    private async store(req: Request, res: Response) {
        try {
            const user = req.user!;
            const { description, amount, category, date, group } = req.body;

            if (!description || !amount || !category || !date || !group) {
                return this.error(res, "Description, amount, category, date, group are required");
            }

            const trx = await this.transactionService.create(user.id, {
                description,
                amount,
                category,
                date_created: new Date(date),
                group
            });

            return this.success(res, trx, "Transaction added");
        } catch (err: any) {
            console.log(err)
            return this.error(res, err.message);
        }
    }

    private async remove(req: Request, res: Response) {
        try {
            const user = req.user!;
            const id = Number(req.params.id);

            const deleted = await this.transactionService.delete(user.id, id);

            return this.success(res, deleted, "Transaction deleted");
        } catch (err: any) {
            return this.error(res, err.message);
        }
    }


    private async show(req: Request, res: Response) {
        try {
            const user = req.user!;
            const id = Number(req.params.id);
            const transaction = await this.transactionService.findById(user.id, id)
            return this.success(res, transaction, 'success get transaction')
        } catch (error) {
            console.log(error)
            return this.error(res)
        }
    }
}

export default new TransactionController().getRouter();
