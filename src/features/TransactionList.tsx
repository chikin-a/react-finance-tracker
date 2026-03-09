import type { Transaction } from '../types'

import { TransactionListItem } from '../components/TransactionListItem'

interface TransactionFormProps {
  transactions: Transaction[]
  onEdit: (e: Transaction) => void
}

export const TransactionList: React.FC<TransactionFormProps> = ({
  transactions,
  onEdit,
}) => {
  return (
    <section>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-xl font-extrabold tracking-tight'>
          Recent Activity
        </h2>
      </div>

      <div className='flex flex-col gap-3'>
        {transactions.length > 0 ? (
          transactions.map((e) => (
            <TransactionListItem key={e.id} e={e} onClick={() => onEdit(e)} />
          ))
        ) : (
          <div className='py-20 text-center border-2 border-dashed border-stone-100 rounded-4xl'>
            <p className='text-stone-400 font-medium text-sm'>
              No transactions yet.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
