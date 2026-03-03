import { TransactionType } from "@prisma/client";
import { prismaClient } from "../../prisma/prisma";
import {
  CreateTransactionInput,
  UpdateTransactionInput,
} from "../dtos/input/transaction.input";
import { TransactionTypeGql } from "../graphql/enums";

const gqlTypeToPrisma: Record<TransactionTypeGql, TransactionType> = {
  [TransactionTypeGql.expense]: TransactionType.EXPENSE,
  [TransactionTypeGql.revenue]: TransactionType.INCOME,
};

export class TransactionService {
  async createTransaction(userId: string, data: CreateTransactionInput) {
    const category = await prismaClient.category.findUnique({
      where: { id: data.category_id },
    });
    if (!category) throw new Error("Category not found");
    if (category.userId !== userId) throw new Error("Action not authorized");

    return prismaClient.transaction.create({
      data: {
        type: gqlTypeToPrisma[data.type],
        description: data.description,
        date: data.date instanceof Date ? data.date : new Date(data.date),
        amount: data.value,
        category: { connect: { id: data.category_id } },
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
      orderBy: { date: "desc" },
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
    let categoryUpdate: { connect: { id: string } } | undefined;
    if (data.category_id) {
      const category = await prismaClient.category.findUnique({
        where: { id: data.category_id },
      });
      if (!category) throw new Error("Category not found");
      if (category.userId !== userId) throw new Error("Action not authorized");
      categoryUpdate = { connect: { id: data.category_id } };
    }

    return prismaClient.transaction.update({
      where: { id },
      data: {
        type: data.type !== undefined ? gqlTypeToPrisma[data.type] : undefined,
        description: data.description ?? undefined,
        date: data.date ? (data.date instanceof Date ? data.date : new Date(data.date)) : undefined,
        amount: data.value ?? undefined,
        ...(categoryUpdate ? { category: categoryUpdate } : {}),
      },
      include: {
        category: true,
        user: true,
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

  async listTransaction(userId: string) {
    return this.listTransactionsByUser(userId);
  }

  async findByCategoryId(categoryId: string) {
    return prismaClient.transaction.findMany({
      where: { categoryId },
      include: {
        category: true,
        user: true,
      },
    });
  }
}
