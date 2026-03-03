import { useQuery } from "@apollo/client/react";
import { createContext, type ReactNode, useEffect, useState } from "react";
import { LIST_CATEGORIES } from "@/lib/graphql/queries/Category";
import { LIST_MY_TRANSACTIONS } from "@/lib/graphql/queries/Transaction";
import type { Category } from "@/types";
import type { Transaction } from "@/types";

export type AuthContextProps = {
  transactions: Transaction[];
  categories: Category[];
  refetchCategory: () => void;
  refetchTransaction: () => void;
};

export const AuthContext = createContext({} as AuthContextProps);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const { data: transactionData, refetch: refetchTransaction } = useQuery<{
    listTransaction: Transaction[];
  }>(LIST_MY_TRANSACTIONS);

  const { data: categoryData, refetch: refetchCategory } = useQuery<{
    listCategory: Category[];
  }>(LIST_CATEGORIES);

  useEffect(() => {
    setTransactions(transactionData?.listTransaction ?? []);
    setCategories(categoryData?.listCategory ?? []);
  }, [transactionData, categoryData]);

  return (
    <AuthContext.Provider
      value={{
        transactions,
        categories,
        refetchCategory,
        refetchTransaction,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
