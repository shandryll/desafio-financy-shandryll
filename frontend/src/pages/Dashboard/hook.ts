import { isSameMonth, parseISO } from "date-fns";
import { useContext, useMemo } from "react";
import { AuthContext } from "@/context/auth";
import type { Category, Transaction } from "@/types";

export type TransactionWithCategory = Transaction & {
  category: { id: string; title: string; color?: string | null; icon?: string | null };
};

export type CategoryWithTransactions = Category & {
  transactions: { value: number }[];
};

export function useDashboard() {
  const { transactions, categories } = useContext(AuthContext);

  const {
    totalBalance,
    totalRevenueCurrMonth,
    totalExpenseCurrMonth,
  } = useMemo(() => {
    const listTransactionExpense = transactions.filter(
      (t) => t.type === "expense",
    );
    const listTransactionRevenue = transactions.filter(
      (t) => t.type === "revenue",
    );

    const totalExpense = listTransactionExpense.reduce(
      (acc, t) => acc + t.value,
      0,
    );
    const totalRevenue = listTransactionRevenue.reduce(
      (acc, t) => acc + t.value,
      0,
    );

    const totalBalance = totalRevenue - totalExpense;

    const totalRevenueCurrMonth = listTransactionRevenue
      .filter((t) => isSameMonth(parseISO(t.date), new Date()))
      .reduce((acc, t) => acc + t.value, 0);

    const totalExpenseCurrMonth = listTransactionExpense
      .filter((t) => isSameMonth(parseISO(t.date), new Date()))
      .reduce((acc, t) => acc + t.value, 0);

    return {
      totalBalance,
      totalRevenueCurrMonth,
      totalExpenseCurrMonth,
    };
  }, [transactions]);

  function formatValue(value: number) {
    const valueNumber = Number(value) / 100;
    return valueNumber.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  }

  function formatValueByType(type: "expense" | "revenue", value: number) {
    if (type === "expense") {
      value = value * -1;
    }
    return formatValue(value).replace(/(\+|-)/, "$1 ");
  }

  const recentTransactions = useMemo((): TransactionWithCategory[] => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return sorted.slice(0, 5).map((t) => {
      const cat = categories.find((c) => c.id === t.category_id || c.id === t.category?.id);
      return {
        ...t,
        category: {
          id: t.category?.id ?? t.category_id ?? "",
          title: t.category?.title ?? "",
          color: cat?.color ?? undefined,
          icon: cat?.icon ?? undefined,
        },
      };
    });
  }, [transactions, categories]);

  const categoriesWithMoreTransactions = useMemo((): CategoryWithTransactions[] => {
    const withCount = categories.map((category) => {
      const catTransactions = transactions.filter(
        (t) => t.category_id === category.id || t.category?.id === category.id,
      );
      return {
        ...category,
        transactions: catTransactions.map((t) => ({ value: t.value })),
      };
    });
    return withCount
      .sort((a, b) => b.transactions.length - a.transactions.length)
      .slice(0, 5);
  }, [categories, transactions]);

  return {
    totalBalance,
    recentTransactions,
    totalRevenueCurrMonth,
    totalExpenseCurrMonth,
    categoriesWithMoreTransactions,
    formatValue,
    formatValueByType,
  };
}
