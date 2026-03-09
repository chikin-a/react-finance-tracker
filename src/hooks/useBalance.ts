import { useMemo } from 'react'
import { useTransactionStore } from '../context/TransactionContext'

export const useBalance = () => {
  const transactions = useTransactionStore((state) => state.transactions)

  return useMemo(
    () =>
      transactions.reduce(
        (acc, t) => {
          const isIncome = t.transactionType === 'income'
          const amount = Number(t.amount)

          return {
            income: isIncome ? acc.income + amount : acc.income,
            expense: !isIncome ? acc.expense + amount : acc.expense,
            balance: isIncome ? acc.balance + amount : acc.balance - amount,
          }
        },
        { balance: 0, income: 0, expense: 0 },
      ),
    [transactions],
  )
}
