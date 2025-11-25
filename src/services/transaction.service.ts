import prisma from "../helpers/prisma";

export class TransactionService {
    async getAll(userId: number) {
        return await prisma.transaction.findMany({
            where: { user_id: userId },
            orderBy: { id: "desc" }
        });
    }

    async create(userId: number, data: { description: string; amount: number; category: "INCOME" | "OUTCOME", date_created: Date, group: string }) {
        return await prisma.transaction.create({
            data: {
                description: data.description,
                amount: data.amount,
                category: data.category,
                user_id: userId,
                date: data.date_created,
                group: data.group
            },
        });
    }

    async delete(userId: number, id: number) {
        const exists = await prisma.transaction.findFirst({
            where: { id, user_id: userId },
        });

        if (!exists) throw new Error("Transaction not found");

        return await prisma.transaction.delete({
            where: { id },
        });
    }


    async findById(userId: number, id: number) {
        const exists = await prisma.transaction.findFirst({
            where: { id, user_id: userId },
        });
        if (!exists) throw new Error("Transaction not found");
        return exists
    }
}
