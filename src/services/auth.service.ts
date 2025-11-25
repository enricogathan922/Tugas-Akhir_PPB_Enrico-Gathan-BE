import prisma from "../helpers/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class AuthService {
    async register(data: { name: string; email: string; password: string }) {
        const existing = await prisma.user.findUnique({
            where: { email: data.email },
        });

        if (existing) {
            throw new Error("Email already exists");
        }

        const hashed = await bcrypt.hash(data.password, 10);

        return await prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashed,
            },
        });
    }

    async login(email: string, password: string) {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) throw new Error("Invalid email or password");

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error("Invalid email or password");

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET || "secret",
            { expiresIn: "1d" }
        );

        return { user, token };
    }
}
