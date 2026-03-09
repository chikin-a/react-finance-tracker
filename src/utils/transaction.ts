import type { NewTransaction, Transaction } from '../types'

export const formatTransaction = (data: Transaction | NewTransaction) => {
  const amount = Number(data.amount)
  return {
    ...data,
    id: 'id' in data ? data.id : crypto.randomUUID(),
    amount: Math.abs(amount),
    transactionType: amount < 0 ? 'expense' : 'income',
  } as Transaction
}
