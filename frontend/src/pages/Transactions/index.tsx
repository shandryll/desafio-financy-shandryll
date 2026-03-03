import { Page } from "../../components/Page";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { useState, useContext, useMemo } from "react";
import { CreateTransactionDialog } from "./components/CreateTransactionDialog";
import { EditTransactionDialog } from "./components/EditTransactionDialog";
import { DeleteTransactionDialog } from "./components/DeleteTransactionDialog";
import { TransactionTable } from "./components/TransactionTable";
import { AuthContext } from "@/context/auth";
import { isSameMonth, parseISO } from "date-fns";

export function TransactionsPage() {
  const { transactions, categories } = useContext(AuthContext);

  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const [filters, setFilters] = useState({
    search: "",
    type: "all",
    category: "all",
    period: "all",
  });

  const categoryOptions = useMemo(() => {
    return [
      { value: "all", label: "Todas" },
      ...categories.map((c) => ({ value: c.id, label: c.title })),
    ];
  }, [categories]);

  const periodOptions = useMemo(() => {
    const transactionDates = [
      Date.now(),
      ...transactions.map((t) => new Date(t.date).getTime()),
    ];
    const minDate = new Date(Math.min(...transactionDates));
    let minYear = minDate.getFullYear();
    let minMonth = minDate.getMonth();
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const periods: { value: string; label: string }[] = [];
    while (minYear < currentYear || (minYear === currentYear && minMonth <= currentMonth)) {
      const d = new Date(minYear, minMonth, 1);
      periods.push({
        value: d.toISOString(),
        label: `${d.toLocaleString("pt-BR", { month: "long" })} / ${minYear}`,
      });
      minMonth++;
      if (minMonth > 11) {
        minMonth = 0;
        minYear++;
      }
    }
    periods.reverse();
    return [{ value: "all", label: "Todos" }, ...periods];
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    let list = transactions.filter((t) =>
      (t.description ?? "").toLowerCase().includes(filters.search.toLowerCase()),
    );
    if (filters.type !== "all") {
      list = list.filter((t) => t.type === filters.type);
    }
    if (filters.category !== "all") {
      list = list.filter(
        (t) => t.category?.id === filters.category || t.category_id === filters.category,
      );
    }
    if (filters.period !== "all") {
      const periodDate = new Date(filters.period);
      list = list.filter((t) => isSameMonth(parseISO(t.date), periodDate));
    }
    return list;
  }, [transactions, filters]);

  function handleEdit(id: string) {
    const tx = transactions.find((t) => t.id === id) ?? null;
    setSelectedTransaction(tx);
    setEditDialogOpen(true);
  }

  function handleDelete(id: string) {
    setDeleteTransactionId(id);
    setDeleteDialogOpen(true);
  }

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 md:leading-8">Transações</h1>
            <p className="text-gray-600 text-sm mt-0.5">
              Gerencie todas as suas transações financeiras
            </p>
          </div>
          <Button onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova transação
          </Button>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground mb-1">Buscar</label>
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Buscar por descrição"
              value={filters.search}
              onChange={(e) => setFilters((s) => ({ ...s, search: e.target.value }))}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground mb-1">Tipo</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={filters.type}
              onChange={(e) => setFilters((s) => ({ ...s, type: e.target.value }))}
            >
              <option value="all">Todos</option>
              <option value="revenue">Entrada</option>
              <option value="expense">Saída</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground mb-1">Categoria</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={filters.category}
              onChange={(e) => setFilters((s) => ({ ...s, category: e.target.value }))}
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground mb-1">Período</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={filters.period}
              onChange={(e) => setFilters((s) => ({ ...s, period: e.target.value }))}
            >
              {periodOptions.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <TransactionTable
          transactions={filteredTransactions}
          loading={false}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>

      <CreateTransactionDialog open={openDialog} onOpenChange={setOpenDialog} />
      <EditTransactionDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        transaction={selectedTransaction}
      />
      <DeleteTransactionDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        transactionId={deleteTransactionId}
      />
    </Page>
  );
}

export default TransactionsPage;
