import { Router } from "express";
import userController from "../../controller/user.controller";
import authController from "../../controller/auth.controller";
import AuthMiddleware from "../../middlewares/auth.middleware";
import transactionController from "../../controller/transaction.controller";

const router = Router();

router.use("/auth", authController);


router.use(AuthMiddleware.bearer)
router.use("/users", userController);
router.use("/transactions", transactionController);


export default router;
