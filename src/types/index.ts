export const EXPENSE_CATEGORIES = [
  'Grocery & Supermarkets',
  'Cafes & Restaurants',
  'Transport & Taxis',
  'Entertainment & Sports',
  'Beauty & Health',
  'Travel',
  'Utilities & Internet',
  'Clothing & Shoes',
  'Salary/Pension/Stipend',
  'Transfers (P2P)',
  'Replenishment with your own funds',
  'Other',
]

export type Category = (typeof EXPENSE_CATEGORIES)[number]

export type TransitionType = 'income' | 'expense'

export type Modal = 'new' | 'edit' | null

export interface NewTransaction {
  date: string
  amount: number | string
  category: Category
  description: string
}

export interface Transaction extends NewTransaction {
  id: string
  transactionType: TransitionType
}
