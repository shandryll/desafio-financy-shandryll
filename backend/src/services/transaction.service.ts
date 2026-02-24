import { prismaClient } from "../../prisma/prisma";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";

export class TransactionService {
  async createTransaction(userId: string, data: CreateTransactionInput) {
    const category = await prismaClient.category.findUnique({
      where: { id: data.categoryId },
    });
    if (!category) throw new Error("Category not found");
    if (category.userId !== userId) throw new Error("Action not authorized");

    return prismaClient.transaction.create({
      data: {
        type: data.type,
        description: data.description,
        date: new Date(data.date),
        amount: data.amount,
        category: { connect: { id: data.categoryId } },
        user: { connect: { id: userId } },
      },
      include: {
        category: true,
        user: true,
      },
    });
  }

  async listTransactionsByUser(userId: string) {
    return prismaClient.transaction.findMany({
      where: { userId },
      include: {
        category: true,
        user: true,
      },
    });
  }

  async findTransaction(id: string) {
    const tx = await prismaClient.transaction.findUnique({
      where: { id },
      include: {
        category: true,
        user: true,
      },
    });
    if (!tx) throw new Error("Transaction not found");
    return tx;
  }

  async updateTransaction(
    id: string,
    userId: string,
    data: UpdateTransactionInput,
  ) {
    const tx = await prismaClient.transaction.findUnique({ where: { id } });
    if (!tx) throw new Error("Transaction not found");
    if (tx.userId !== userId) throw new Error("Action not authorized");
    let categoryUpdate: any = undefined;
    if (data.categoryId) {
      const category = await prismaClient.category.findUnique({
        where: { id: data.categoryId },
      });
      if (!category) throw new Error("Category not found");
      if (category.userId !== userId) throw new Error("Action not authorized");
      categoryUpdate = { connect: { id: data.categoryId } };
    }

    return prismaClient.transaction.update({
      where: { id },
      data: {
        type: data.type ?? undefined,
        description: data.description ?? undefined,
        date: data.date ? new Date(data.date) : undefined,
        amount: data.amount ?? undefined,
        ...(categoryUpdate ? { category: categoryUpdate } : {}),
      },
    });
  }

  async deleteTransaction(id: string, userId: string) {
    const tx = await prismaClient.transaction.findUnique({ where: { id } });
    if (!tx) throw new Error("Transaction not found");
    if (tx.userId !== userId) throw new Error("Action not authorized");

    await prismaClient.transaction.delete({ where: { id } });
    return true;
  }
}
