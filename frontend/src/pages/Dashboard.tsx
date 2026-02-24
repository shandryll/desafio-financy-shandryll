import React from "react";

export default function DashboardPage() {
  return (
    <div className="p-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card: Saldo Total */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-xs text-gray-500">Saldo Total</div>
          <div className="text-2xl font-bold mt-2">R$ 0,00</div>
        </div>
        {/* Card: Receitas do Mês */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-xs text-gray-500">Receitas do Mês</div>
          <div className="text-2xl font-bold mt-2 text-green-600">R$ 0,00</div>
        </div>
        {/* Card: Despesas do Mês */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-xs text-gray-500">Despesas do Mês</div>
          <div className="text-2xl font-bold mt-2 text-red-600">R$ 0,00</div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transações Recentes */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold mb-4">Transações Recentes</div>
          <div className="text-gray-400 text-sm">
            Nenhuma transação recente.
          </div>
        </div>
        {/* Categorias */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-lg font-semibold mb-4">Categorias</div>
          <div className="text-gray-400 text-sm">
            Nenhuma categoria cadastrada.
          </div>
        </div>
      </div>
    </div>
  );
}
