import { create } from 'zustand'
import type { Transaction } from './../types/index'
import { createJSONStorage, persist } from 'zustand/middleware'

type State = {
  transactions: Transaction[]
}

type Action = {
  addTransaction: (transaction: Transaction) => void
  editTransaction: (updatedTransaction: Transaction) => void
  removeTransaction: (id: string) => void
}

export const useTransactionStore = create<State & Action>()(
  persist(
    (set) => ({
      transactions: [],

      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [transaction, ...state.transactions],
        })),

      editTransaction: (updatedTransaction) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === updatedTransaction.id ? updatedTransaction : t,
          ),
        })),

      removeTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((e) => e.id !== id),
        })),
    }),
    {
      name: 'finance-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
