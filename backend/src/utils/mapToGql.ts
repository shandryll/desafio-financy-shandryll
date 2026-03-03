import type { User, Transaction, Category } from "@prisma/client";
import { TransactionTypeGql } from "../graphql/enums";

export function mapUserToGql(user: User) {
  return {
    id: user.id,
    full_name: user.name,
    email: user.email,
    password: user.password ?? undefined,
    created_at: user.createdAt,
    updated_at: user.updatedAt,
  };
}

const prismaTypeToGql: Record<string, TransactionTypeGql> = {
  EXPENSE: TransactionTypeGql.expense,
  INCOME: TransactionTypeGql.revenue,
};

export function mapTransactionToGql(tx: Transaction & { category?: Category; user?: User }) {
  return {
    id: tx.id,
    description: tx.description ?? "",
    type: prismaTypeToGql[tx.type] ?? TransactionTypeGql.expense,
    date: tx.date,
    value: tx.amount,
    user_id: tx.userId,
    user: tx.user ? mapUserToGql(tx.user) : undefined,
    category_id: tx.categoryId,
    category: tx.category ? mapCategoryToGql(tx.category) : undefined,
    created_at: tx.createdAt,
    updated_at: tx.updatedAt,
  };
}

export function mapCategoryToGql(cat: Category) {
  return {
    id: cat.id,
    title: cat.title,
    description: cat.description ?? "",
    icon: cat.icon ?? undefined,
    color: cat.color ?? undefined,
    created_at: cat.createdAt,
    updated_at: cat.updatedAt,
    user_id: cat.userId,
  };
}
