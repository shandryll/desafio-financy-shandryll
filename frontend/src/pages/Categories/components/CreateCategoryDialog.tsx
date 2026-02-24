// Modal de criação de categoria - Esqueleto
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
import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { CREATE_CATEGORY } from "../../../lib/graphql/mutations/Transaction";
import { LIST_CATEGORIES } from "../../../lib/graphql/queries/Category";
import { toast } from "sonner";
import { CATEGORY_ICONS, CATEGORY_COLORS } from "./category-options";
import { DynamicLucideIcon } from "./DynamicLucideIcon";

interface CreateCategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateCategoryDialog({
  open,
  onOpenChange,
}: CreateCategoryDialogProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState(CATEGORY_ICONS[0]);
  const [color, setColor] = useState(CATEGORY_COLORS[0]);
  const [createCategory, { loading }] = useMutation(CREATE_CATEGORY, {
    refetchQueries: [{ query: LIST_CATEGORIES }],
    onCompleted: () => {
      toast.success("Categoria criada com sucesso!");
      setName("");
      onOpenChange(false);
    },
    onError: () => toast.error("Erro ao criar categoria"),
  });
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      await createCategory({
        variables: { data: { name, description, icon, color } },
      });
    } catch (err: any) {
      setError(err.message || "Erro ao criar categoria");
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            Nova categoria
          </DialogTitle>
          <p className="text-sm text-muted-foreground">
            Organize suas transações com categorias
          </p>
        </DialogHeader>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="category-title">Título</Label>
            <Input
              id="category-title"
              placeholder="Ex. Alimentação"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="category-description">Descrição</Label>
            <Textarea
              id="category-description"
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
                  style={{ background: c }}
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
