// Página de Categorias - Esqueleto
import { Page } from "../../components/Page";
import { Button } from "../../components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";
import { EditCategoryDialog } from "./components/EditCategoryDialog";
import { DeleteCategoryDialog } from "./components/DeleteCategoryDialog";
import { useQuery } from "@apollo/client/react";
import { CategoryTable } from "./components/CategoryTable";
import { LIST_CATEGORIES } from "../../lib/graphql/queries/Category";
import { Category } from "../../types";

export function CategoriesPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const { data, loading } = useQuery<{ listCategories: Category[] }>(
    LIST_CATEGORIES,
  );

  function handleEdit(id: string) {
    const cat = data?.listCategories?.find((c) => c.id === id) || null;
    setSelectedCategory(cat);
    setEditDialogOpen(true);
  }

  function handleDelete(id: string) {
    setDeleteCategoryId(id);
    setDeleteDialogOpen(true);
  }

  // TODO: Adicionar handlers de edição e exclusão
  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-medium text-purple-600">Categorias</h1>
          <Button onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova categoria
          </Button>
        </div>
        <CategoryTable
          categories={data?.listCategories || []}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      <CreateCategoryDialog open={openDialog} onOpenChange={setOpenDialog} />
      <EditCategoryDialog
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        category={selectedCategory}
      />
      <DeleteCategoryDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        categoryId={deleteCategoryId}
      />
    </Page>
  );
}
