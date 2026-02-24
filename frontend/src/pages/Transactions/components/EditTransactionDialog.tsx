import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { UPDATE_TRANSACTION } from "../../../lib/graphql/mutations/Transaction";
import { LIST_MY_TRANSACTIONS } from "../../../lib/graphql/queries/Transaction";
import { LIST_CATEGORIES } from "../../../lib/graphql/queries/Category";
import { toast } from "sonner";

interface EditTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: any | null;
}

export function EditTransactionDialog({
  open,
  onOpenChange,
  transaction,
}: EditTransactionDialogProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("EXPENSE");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { data: categoriesData, loading: loadingCategories } =
    useQuery(LIST_CATEGORIES);
  const [updateTransaction, { loading }] = useMutation(UPDATE_TRANSACTION, {
    refetchQueries: [{ query: LIST_MY_TRANSACTIONS }],
    onCompleted: () => {
      toast.success("Transação atualizada!");
      onOpenChange(false);
    },
    onError: () => toast.error("Erro ao atualizar transação"),
  });

  useEffect(() => {
    if (transaction) {
      setDescription(transaction.description || "");
      setAmount(transaction.amount?.toString() || "");
      setType(transaction.type || "EXPENSE");
      setDate(transaction.date ? transaction.date.slice(0, 10) : "");
      setCategoryId(transaction.category?.id || "");
    }
  }, [transaction]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await onEdit({
        id: transaction.id,
        description,
        amount: parseFloat(amount),
        type,
        categoryId,
        date,
      });
      onClose();
    } catch (err: any) {
      setError(err.message || "Erro ao editar transação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar Transação</DialogTitle>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            placeholder="Valor"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full border rounded-md h-10 px-3"
          >
            <option value="EXPENSE">Despesa</option>
            <option value="INCOME">Receita</option>
          </select>
          <Input
            placeholder="Data"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full border rounded-md h-10 px-3"
          >
            <option value="">Selecione uma categoria</option>
            {loadingCategories && <option>Carregando...</option>}
            {categoriesData?.listCategories?.map((cat: any) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
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
