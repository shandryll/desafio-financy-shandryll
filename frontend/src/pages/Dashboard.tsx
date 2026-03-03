import { format } from "date-fns";
import {
  ChevronRight,
  CircleArrowDown,
  CircleArrowUp,
  Plus,
  Wallet,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { CategoryIcons } from "@/components/CategoryIcons";
import { CategoryTag } from "@/components/CategoryTag";
import { useDashboard } from "./Dashboard/hook";

export default function DashboardPage() {
  const {
    totalBalance,
    recentTransactions,
    totalRevenueCurrMonth,
    totalExpenseCurrMonth,
    categoriesWithMoreTransactions,
    formatValue,
    formatValueByType,
  } = useDashboard();

  return (
    <div className="px-4 md:px-12 flex flex-col gap-4 md:gap-8">
      <div className="w-full flex flex-wrap items-center gap-6">
        <Card className="flex-1 min-w-[225px] p-6 flex flex-col gap-4 border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <Wallet className="size-5 text-[var(--color-purple-base)]" />
            <span className="uppercase text-xs font-medium text-gray-500 tracking-[0.6px]">
              Saldo total
            </span>
          </div>
          <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
            {formatValue(totalBalance)}
          </strong>
        </Card>
        <Card className="flex-1 min-w-[225px] p-6 flex flex-col gap-4 border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <CircleArrowUp className="size-5 text-[var(--color-brand-base)]" />
            <span className="uppercase text-xs font-medium text-gray-500 tracking-[0.6px]">
              Receitas do mês
            </span>
          </div>
          <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
            {formatValue(totalRevenueCurrMonth)}
          </strong>
        </Card>
        <Card className="flex-1 min-w-[225px] p-6 flex flex-col gap-4 border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <CircleArrowDown className="size-5 text-[var(--color-red-base)]" />
            <span className="uppercase text-xs font-medium text-gray-500 tracking-[0.6px]">
              Despesas do mês
            </span>
          </div>
          <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
            {formatValue(totalExpenseCurrMonth)}
          </strong>
        </Card>
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-6">
        <Card className="w-full p-0 flex-1 lg:flex-none lg:w-[calc((2/3*100%)-8px)] border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-b-gray-200 px-6 py-5">
            <h2 className="uppercase text-xs tracking-[0.6px] text-gray-500">
              Transações recentes
            </h2>
            <Link
              to="/transactions"
              className="flex items-center gap-1 text-[var(--color-brand-base)] font-medium text-sm hover:underline"
            >
              Ver todas
              <ChevronRight className="size-5" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            {recentTransactions.length === 0 ? (
              <div className="px-6 py-8 text-gray-400 text-sm text-center">
                Nenhuma transação recente.
              </div>
            ) : (
              recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="min-w-fit flex py-4 border-b border-b-gray-200"
                >
                  <div className="flex-2 min-w-[320px] flex items-center px-6 gap-4">
                    <div
                      className="min-w-10 min-h-10 size-10 rounded-[8px] flex items-center justify-center"
                      style={{
                        backgroundColor: transaction.category.color
                          ? `var(--color-${transaction.category.color}-light)`
                          : "var(--color-gray-200)",
                        color: transaction.category.color
                          ? `var(--color-${transaction.category.color}-base)`
                          : "var(--color-gray-600)",
                      }}
                    >
                      <CategoryIcons
                        icon={transaction.category.icon}
                        className="size-4"
                      />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <strong className="font-medium text-gray-800">
                        {transaction.description || "Sem descrição"}
                      </strong>
                      <span className="text-sm leading-[20px] text-gray-600">
                        {format(transaction.date, "dd/MM/yy")}
                      </span>
                    </div>
                  </div>
                  <div className="min-w-[160px] w-[160px] flex items-center justify-center px-6">
                    <CategoryTag
                      style={{
                        backgroundColor: transaction.category.color
                          ? `var(--color-${transaction.category.color}-light)`
                          : "var(--color-gray-200)",
                        color: transaction.category.color
                          ? `var(--color-${transaction.category.color}-base)`
                          : "var(--color-gray-600)",
                      }}
                    >
                      {transaction.category.title}
                    </CategoryTag>
                  </div>
                  <div className="min-w-[160px] w-[160px] flex items-center justify-end pr-6">
                    <span className="flex items-center gap-2 text-sm font-semibold leading-[20px]">
                      {formatValueByType(
                        transaction.type as "expense" | "revenue",
                        transaction.value,
                      )}
                      {transaction.type === "expense" && (
                        <CircleArrowDown className="min-w-4 min-h-4 size-4 text-[var(--color-red-base)]" />
                      )}
                      {transaction.type === "revenue" && (
                        <CircleArrowUp className="min-w-4 min-h-4 size-4 text-[var(--color-green-base)]" />
                      )}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="flex px-6 py-5 items-center justify-center">
            <Link
              to="/transactions"
              className="flex items-center gap-1 text-[var(--color-brand-base)] hover:cursor-pointer hover:underline"
            >
              <Plus className="size-5" />
              Nova transação
            </Link>
          </div>
        </Card>
        <Card className="w-full h-fit p-0 md:w-auto flex-1 border border-gray-200 bg-white shadow-sm">
          <div className="flex items-center justify-between gap-4 px-6 py-5 border-b border-b-gray-200">
            <h2 className="uppercase text-xs tracking-[0.6px] text-gray-500">
              Categorias
            </h2>
            <Link
              to="/categories"
              className="flex items-center gap-1 text-[var(--color-brand-base)] font-medium text-sm hover:underline"
            >
              Gerenciar
              <ChevronRight className="size-5" />
            </Link>
          </div>
          <div className="flex flex-col gap-5 p-6 overflow-x-auto">
            {categoriesWithMoreTransactions.length === 0 ? (
              <div className="text-gray-400 text-sm text-center py-4">
                Nenhuma categoria cadastrada.
              </div>
            ) : (
              categoriesWithMoreTransactions.map((category) => (
                <div key={category.id} className="flex items-center gap-1">
                  <CategoryTag
                    style={{
                      backgroundColor: category.color
                        ? `var(--color-${category.color}-light)`
                        : "var(--color-gray-200)",
                      color: category.color
                        ? `var(--color-${category.color}-base)`
                        : "var(--color-gray-600)",
                    }}
                  >
                    {category.title}
                  </CategoryTag>
                  <div className="flex-1 flex items-center gap-1">
                    <div className="flex-1 min-w-[50px] w-[50px] flex items-center justify-end">
                      <span className="text-sm leading-[20px] text-gray-600">
                        {category.transactions.length} itens
                      </span>
                    </div>
                    <strong className="min-w-[88px] w-[88px] overflow-x-auto text-right font-semibold text-sm leading-[20px] text-gray-800">
                      {formatValue(
                        category.transactions.reduce(
                          (acc, t) => acc + t.value,
                          0,
                        ),
                      )}
                    </strong>
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
