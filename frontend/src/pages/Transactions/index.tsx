// Página de Transações - Esqueleto
import { Page } from "../../components/Page";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateTransactionDialog } from "./components/CreateTransactionDialog";
import { EditTransactionDialog } from "./components/EditTransactionDialog";
import { DeleteTransactionDialog } from "./components/DeleteTransactionDialog";
import { useQuery } from "@apollo/client/react";
import { TransactionTable } from "./components/TransactionTable";
import { LIST_MY_TRANSACTIONS } from "../../lib/graphql/queries/Transaction.ts";

export function TransactionsPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<any | null>(
    null,
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteTransactionId, setDeleteTransactionId] = useState<string | null>(
    null,
  );
  const { data, loading } = useQuery<{
    listMyTransactions: {
      id: string;
      type: string;
      description: string;
      date: string;
      amount: number;
      category?: { id: string; name: string };
      user?: { id: string; name: string };
    }[];
  }>(LIST_MY_TRANSACTIONS);

  function handleEdit(id: string) {
    const tx = data?.listMyTransactions?.find((t) => t.id === id) || null;
    setSelectedTransaction(tx as any);
    setEditDialogOpen(true);
  }

  function handleDelete(id: string) {
    setDeleteTransactionId(id);
    setDeleteDialogOpen(true);
  }

  // Filtros
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [period, setPeriod] = useState("");

  // TODO: Popular categorias e períodos reais
  const categories = [
    { value: "", label: "Todas" },
    // ...adicione categorias reais aqui
  ];
  const periods = [
    { value: "", label: "Todos" },
    { value: "2025-11", label: "Novembro / 2025" },
    // ...adicione períodos reais aqui
  ];

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium text-purple-600">Transações</h1>
          <Button onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova transação
          </Button>
        </div>
        {/* Filtros */}
        <div className="bg-white rounded-lg shadow p-4 grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground mb-1">
              Descrição
            </label>
            <input
              className="border rounded px-3 py-2 w-full"
              placeholder="Buscar por descrição"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground mb-1">Tipo</label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="INCOME">Entrada</option>
              <option value="EXPENSE">Saída</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground mb-1">
              Categoria
            </label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-xs text-muted-foreground mb-1">
              Período
            </label>
            <select
              className="border rounded px-3 py-2 w-full"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            >
              {periods.map((p) => (
                <option key={p.value} value={p.value}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <TransactionTable
          transactions={data?.listMyTransactions || []}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      {/* dialogs outside main content */}
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
