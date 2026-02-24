import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useMutation } from "@apollo/client/react";
import { DELETE_TRANSACTION } from "../../../lib/graphql/mutations/Transaction";
import { LIST_MY_TRANSACTIONS } from "../../../lib/graphql/queries/Transaction";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface DeleteTransactionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionId: string | null;
}

export function DeleteTransactionDialog({
  open,
  onOpenChange,
  transactionId,
}: DeleteTransactionDialogProps) {
  const [deleteTransaction, { loading }] = useMutation(DELETE_TRANSACTION, {
    refetchQueries: [{ query: LIST_MY_TRANSACTIONS }],
    onCompleted: () => {
      toast.success("Transação excluída!");
      onOpenChange(false);
    },
    onError: () => toast.error("Erro ao excluir transação"),
  });
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setError(null);
    try {
      await deleteTransaction({ variables: { id: transactionId } });
    } catch (err: any) {
      setError(err.message || "Erro ao excluir transação");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Transação</DialogTitle>
        </DialogHeader>
        <p>Tem certeza que deseja excluir esta transação?</p>
        <DialogFooter>
          {error && (
            <span className="text-red-500 text-sm mr-auto">{error}</span>
          )}
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Excluir"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
