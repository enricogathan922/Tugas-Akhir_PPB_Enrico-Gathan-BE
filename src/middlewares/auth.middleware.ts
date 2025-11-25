import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../helpers/prisma";

export class AuthMiddleware {
    static async bearer(req: Request, res: Response, next: NextFunction) {
        try {
            const authHeader = req.headers.authorization;

            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                    success: false,
                    message: "Missing or invalid Authorization header",
                });
            }

            const token = authHeader.split(" ")[1];

            const decoded: any = jwt.verify(
                token,
                process.env.JWT_SECRET || "secret"
            );

            const user = await prisma.user.findUnique({
                where: { id: decoded.id },
            });

            if (!user) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid token user",
                });
            }

            req.user = user;
            next();
        } catch (err) {
            return res.status(401).json({
                success: false,
                message: "Invalid or expired token",
            });
        }
    }
}

export default AuthMiddleware;
