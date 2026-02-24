// Tabela de transações - Esqueleto
import { Transaction } from "../../../types";

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TransactionTable({
  transactions,
  loading,
  onEdit,
  onDelete,
}: TransactionTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-4 py-2">Descrição</th>
            <th className="px-4 py-2">Tipo</th>
            <th className="px-4 py-2">Valor</th>
            <th className="px-4 py-2">Categoria</th>
            <th className="px-4 py-2">Data</th>
            <th className="px-4 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td
                colSpan={6}
                className="text-center py-4 text-muted-foreground"
              >
                Carregando...
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="text-center py-4 text-muted-foreground"
              >
                Nenhuma transação encontrada
              </td>
            </tr>
          ) : (
            transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-2">{tx.description}</td>
                <td className="px-4 py-2">
                  <span
                    className={
                      tx.type === "INCOME"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {tx.type === "INCOME" ? "Receita" : "Despesa"}
                  </span>
                </td>
                <td className="px-4 py-2 font-medium">R$ {tx.amount}</td>
                <td className="px-4 py-2">{tx.category?.name}</td>
                <td className="px-4 py-2">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => onEdit(tx.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => onDelete(tx.id)}
                    className="text-red-600 hover:underline"
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
