import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_TRANSACTION } from "../../../lib/graphql/mutations/Transaction";
import { LIST_MY_TRANSACTIONS } from "../../../lib/graphql/queries/Transaction";
import { LIST_CATEGORIES } from "../../../lib/graphql/queries/Category";
import { toast } from "sonner";

interface EditTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: {
    id: string;
    description?: string | null;
    date: string;
    value?: number;
    amount?: number;
    type?: string;
    category?: { id: string };
    category_id?: string;
  } | null;
}

export function EditTransactionDialog({
  open,
  onOpenChange,
  transaction,
}: EditTransactionDialogProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState<"expense" | "revenue">("expense");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { data: categoriesData } = useQuery(LIST_CATEGORIES);
  const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: ["ListTransaction"],
    onCompleted: () => {
      toast.success("Transação atualizada!");
      onOpenChange(false);
    },
    onError: () => toast.error("Erro ao atualizar transação"),
  });

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description || "");
      const raw = transaction.value ?? transaction.amount ?? 0;
      setAmount((Number(raw) / 100).toFixed(2));
      setType((transaction.type === "revenue" || transaction.type === "INCOME") ? "revenue" : "expense");
      setDate(transaction.date ? transaction.date.slice(0, 10) : "");
      setCategoryId(transaction.category?.id ?? transaction.category_id ?? "");
    }
  }, [transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!transaction) return;
    try {
      const valueInCents = Math.round(parseFloat(amount) * 100);
      await updateTransaction({
        variables: {
          id: transaction.id,
          data: {
            description: description || "Sem descrição",
            value: valueInCents,
            type,
            date: date ? new Date(date).toISOString() : new Date().toISOString(),
            category_id: categoryId || undefined,
          },
        },
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao editar transação");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label>Descrição</Label>
            <Input
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Valor</Label>
            <Input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Tipo</Label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as "expense" | "revenue")}
              className="w-full border rounded-md h-10 px-3"
            >
              <option value="expense">Despesa</option>
              <option value="revenue">Receita</option>
            </select>
          </div>
          <div>
            <Label>Data</Label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Categoria</Label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border rounded-md h-10 px-3"
            >
              <option value="">Selecione uma categoria</option>
              {categoriesData?.listCategory?.map((cat: { id: string; title: string }) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter>
            {error && (
              <span className="text-red-500 text-sm mr-auto">{error}</span>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
