import { Page } from "../../components/Page";
import { Button } from "../../components/ui/button";
import { Plus, Tag, ArrowUpDown } from "lucide-react";
import { useState, useMemo } from "react";
import { CreateCategoryDialog } from "./components/CreateCategoryDialog";
import { EditCategoryDialog } from "./components/EditCategoryDialog";
import { DeleteCategoryDialog } from "./components/DeleteCategoryDialog";
import { CategoryTable } from "./components/CategoryTable";
import { useQuery } from "@apollo/client/react";
import { LIST_CATEGORIES } from "../../lib/graphql/queries/Category";
import { Category } from "../../types";
import { Card } from "../../components/ui/card";
import { CategoryIcons } from "../../components/CategoryIcons";

export function CategoriesPage() {
  const [openDialog, setOpenDialog] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<string | null>(null);
  const { data, loading } = useQuery<{ listCategory: Category[] }>(LIST_CATEGORIES);

  const categories = data?.listCategory ?? [];

  const { totalCategories, totalTransactions, mostUsedCategory } = useMemo(() => {
    const totalCategories = categories.length;
    const totalTransactions = categories.reduce(
      (acc, c) => acc + (c.transactions?.length ?? 0),
      0,
    );
    const mostUsedCategory =
      categories.length > 0
        ? [...categories].sort(
            (a, b) => (b.transactions?.length ?? 0) - (a.transactions?.length ?? 0),
          )[0]
        : null;
    return { totalCategories, totalTransactions, mostUsedCategory };
  }, [categories]);

  function handleEdit(id: string) {
    const cat = categories.find((c) => c.id === id) ?? null;
    setSelectedCategory(cat);
    setEditDialogOpen(true);
  }

  function handleDelete(id: string) {
    setDeleteCategoryId(id);
    setDeleteDialogOpen(true);
  }

  return (
    <Page>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 md:leading-8">Categorias</h1>
            <p className="text-gray-600 text-sm mt-0.5">
              Organize suas transações por categorias
            </p>
          </div>
          <Button onClick={() => setOpenDialog(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Nova categoria
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6 flex items-center gap-4 border border-gray-200 bg-white shadow-sm min-w-[250px]">
            <div className="size-8 flex items-center justify-center">
              <Tag className="size-6 text-gray-700" />
            </div>
            <div className="flex flex-col gap-1">
              <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
                {totalCategories}
              </strong>
              <span className="text-xs leading-[16px] font-medium text-gray-500 uppercase tracking-[0.6px]">
                Total de categorias
              </span>
            </div>
          </Card>
          <Card className="p-6 flex items-center gap-4 border border-gray-200 bg-white shadow-sm min-w-[250px]">
            <div className="size-8 flex items-center justify-center">
              <ArrowUpDown className="size-6 text-[var(--color-purple-base)]" />
            </div>
            <div className="flex flex-col gap-1">
              <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
                {totalTransactions}
              </strong>
              <span className="text-xs leading-[16px] font-medium text-gray-500 uppercase tracking-[0.6px]">
                Total de transações
              </span>
            </div>
          </Card>
          <Card className="p-6 flex items-start gap-4 border border-gray-200 bg-white shadow-sm min-w-[250px]">
            {mostUsedCategory && (
              <div
                className="size-8 flex items-center justify-center rounded-[8px]"
                style={{
                  backgroundColor: mostUsedCategory.color
                    ? `var(--color-${mostUsedCategory.color}-light)`
                    : "var(--color-gray-200)",
                  color: mostUsedCategory.color
                    ? `var(--color-${mostUsedCategory.color}-base)`
                    : "var(--color-gray-600)",
                }}
              >
                <CategoryIcons icon={mostUsedCategory.icon} className="size-5" />
              </div>
            )}
            <div className="flex flex-col gap-1">
              <strong className="font-bold text-[28px] leading-[32px] text-gray-800">
                {mostUsedCategory?.title ?? "-"}
              </strong>
              <span className="text-xs leading-[16px] font-medium text-gray-500 uppercase tracking-[0.6px]">
                Categoria mais utilizada
              </span>
            </div>
          </Card>
        </div>

        <CategoryTable
          categories={categories}
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
