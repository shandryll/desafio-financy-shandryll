import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import { useMutation } from "@apollo/client/react";
import { DELETE_CATEGORY } from "../../../lib/graphql/mutations/Transaction";
import { LIST_CATEGORIES } from "../../../lib/graphql/queries/Category";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface DeleteCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string | null;
}

export function DeleteCategoryDialog({
  open,
  onOpenChange,
  categoryId,
}: DeleteCategoryDialogProps) {
  const [deleteCategory, { loading }] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }],
    onCompleted: () => {
      toast.success("Categoria excluída!");
      onOpenChange(false);
    },
    onError: () => toast.error("Erro ao excluir categoria"),
  });
  const [error, setError] = useState<string | null>(null);

  async function handleDelete() {
    setError(null);
    try {
      await deleteCategory({ variables: { id: categoryId } });
    } catch (err: any) {
      setError(err.message || "Erro ao excluir categoria");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir Categoria</DialogTitle>
        </DialogHeader>
        <p>Tem certeza que deseja excluir esta categoria?</p>
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
