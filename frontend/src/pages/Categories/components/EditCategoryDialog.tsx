import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Textarea } from "../../../components/ui/textarea";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client/react";
import { UPDATE_CATEGORY } from "../../../lib/graphql/mutations/Transaction";
import { LIST_CATEGORIES } from "../../../lib/graphql/queries/Category";
import { toast } from "sonner";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "./category-options";
import { DynamicLucideIcon } from "./DynamicLucideIcon";
import type { Category } from "../../../types";

interface EditCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
}

export function EditCategoryDialog({
  open,
  onOpenChange,
  category,
}: EditCategoryDialogProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(CATEGORY_ICONS[0]);
  const [color, setColor] = useState(CATEGORY_COLORS[0]);
  const [error, setError] = useState<string | null>(null);
  const [updateCategory, { loading }] = useMutation(UPDATE_CATEGORY, {
    refetchQueries: ["ListCategory"],
    onCompleted: () => {
      toast.success("Categoria atualizada!");
      onOpenChange(false);
    },
    onError: () => toast.error("Erro ao atualizar categoria"),
  });

  useEffect(() => {
    if (category) {
      setTitle(category.title ?? "");
      setDescription(category.description ?? "");
      setIcon((category.icon as string) || CATEGORY_ICONS[0]);
      setColor((category.color as string) || CATEGORY_COLORS[0]);
    }
  }, [category]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!category) return;
    try {
      await updateCategory({
        variables: {
          id: category.id,
          data: {
            title,
            description: description || undefined,
            icon,
            color,
          },
        },
      });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Erro ao editar categoria");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Editar categoria
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Atualize os dados da categoria
          </p>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="edit-category-title">Título</Label>
            <Input
              id="edit-category-title"
              placeholder="Ex. Alimentação"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="edit-category-description">Descrição</Label>
            <Textarea
              id="edit-category-description"
              placeholder="Descrição da categoria"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="resize-none"
            />
            <span className="text-xs text-muted-foreground">Opcional</span>
          </div>
          <div>
            <Label>Ícone</Label>
            <div className="grid grid-cols-6 gap-2 mt-2">
              {CATEGORY_ICONS.map((ic) => (
                <button
                  type="button"
                  key={ic}
                  className={`border rounded-lg p-2 flex items-center justify-center bg-white hover:bg-muted-foreground/10 ${icon === ic ? "ring-2 ring-primary" : ""}`}
                  onClick={() => setIcon(ic)}
                  aria-label={ic}
                >
                  <DynamicLucideIcon name={ic} size={20} />
                </button>
              ))}
            </div>
          </div>
          <div>
            <Label>Cor</Label>
            <div className="flex gap-2 mt-2 flex-wrap">
              {CATEGORY_COLORS.map((c) => (
                <button
                  type="button"
                  key={c}
                  className={`w-7 h-7 rounded-full border-2 flex items-center justify-center ${color === c ? "ring-2 ring-primary" : ""}`}
                  style={{ background: `var(--color-${c}-base)` }}
                  onClick={() => setColor(c)}
                  aria-label={c}
                >
                  {color === c && (
                    <span className="block w-3 h-3 rounded-full bg-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
          <DialogFooter>
            {error && (
              <span className="text-red-500 text-sm mr-auto">{error}</span>
            )}
            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 text-base font-semibold"
            >
              {loading ? "Salvando..." : "Salvar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
