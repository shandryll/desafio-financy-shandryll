// Modal de criação de transação - Esqueleto
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
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_TRANSACTION } from "../../../lib/graphql/mutations/Transaction";
import { LIST_MY_TRANSACTIONS } from "../../../lib/graphql/queries/Transaction";
import { toast } from "sonner";
import { useQuery } from "@apollo/client/react";
import { LIST_CATEGORIES } from "../../../lib/graphql/queries/Category";

interface CreateTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateTransactionDialog({
  open,
  onOpenChange,
}: CreateTransactionDialogProps) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("EXPENSE");
  const [date, setDate] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [createTransaction, { loading }] = useMutation(CREATE_TRANSACTION, {
    refetchQueries: [{ query: LIST_MY_TRANSACTIONS }],
    onCompleted: () => {
      toast.success("Transação criada com sucesso!");
      setDescription("");
      setAmount("");
      setType("EXPENSE");
      setDate("");
      setCategoryId("");
      onOpenChange(false);
    },
    onError: () => toast.error("Erro ao criar transação"),
  });
  const { data: categoriesData, loading: loadingCategories } =
    useQuery(LIST_CATEGORIES);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await createTransaction({
        variables: {
          data: {
            description,
            amount: parseFloat(amount),
            type,
            date,
            categoryId,
          },
        },
      });
    } catch (err: any) {
      setError(err.message || "Erro ao criar transação");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl p-8">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Nova transação
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Registre sua despesa ou receita
          </p>
        </DialogHeader>
        <form className="space-y-5 mt-2" onSubmit={handleSubmit}>
          <div className="flex gap-2 justify-center mb-2 border rounded-lg p-1 bg-gray-50">
            <Button
              type="button"
              variant="ghost"
              className={`flex-1 h-12 text-base font-semibold rounded-lg border ${
                type === "EXPENSE"
                  ? "border-red-500 text-red-600 bg-white"
                  : "border-transparent text-gray-500 bg-gray-50"
              }`}
              onClick={() => setType("EXPENSE")}
            >
              Despesa
            </Button>
            <Button
              type="button"
              variant="ghost"
              className={`flex-1 h-12 text-base font-semibold rounded-lg border ${
                type === "INCOME"
                  ? "border-green-600 text-green-700 bg-white"
                  : "border-transparent text-gray-500 bg-gray-50"
              }`}
              onClick={() => setType("INCOME")}
            >
              Receita
            </Button>
          </div>
          <div>
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex. Almoço no restaurante"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="rounded-lg"
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="rounded-lg"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="amount">Valor</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  R$
                </span>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-8 rounded-lg"
                  required
                />
              </div>
            </div>
          </div>
          <div>
            <Label htmlFor="category">Categoria</Label>
            <select
              id="category"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border rounded-lg h-10 px-3 bg-white"
              required
            >
              <option value="">Selecione</option>
              {loadingCategories && <option>Carregando...</option>}
              {categoriesData?.listCategories?.map((cat: any) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <DialogFooter>
            {error && (
              <span className="text-red-500 text-sm mr-auto">{error}</span>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-semibold bg-green-700 hover:bg-green-800 rounded-lg"
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
