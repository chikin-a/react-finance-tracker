import type { Filter, NewTransaction, Transaction } from '../types'

export const formatTransaction = (data: Transaction | NewTransaction) => {
  const amount = Number(data.amount)
  return {
    ...data,
    id: 'id' in data ? data.id : crypto.randomUUID(),
    amount: Math.abs(amount),
    transactionType: amount < 0 ? 'expense' : 'income',
  } as Transaction
}

export const formatChartTransactions = (data: Transaction[]) => {
  const grouped = data.reduce(
    (acc, t) => {
      const date = t.date // Можно форматировать, если нужно (напр. YYYY-MM-DD)

      if (!acc[date]) {
        acc[date] = { income: 0, expense: 0, date }
      }

      if (t.transactionType === 'income') acc[date].income += Number(t.amount)
      if (t.transactionType === 'expense') acc[date].expense += Number(t.amount)

      return acc
    },
    {} as Record<string, { income: number; expense: number; date: string }>,
  )

  return Object.values(grouped)
}

export const filterTransactions = (data: Transaction[], filters: Filter) =>
  data.filter((t) => {
    const matchSearch =
      !filters.search ||
      t.description.toLowerCase().includes(filters.search.toLowerCase())

    const matchCategory = !filters.category || t.category === filters.category

    const matchType =
      filters.transactionType === 'all' ||
      t.transactionType === filters.transactionType

    return matchSearch && matchCategory && matchType
  })
