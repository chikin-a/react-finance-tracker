import React from 'react'
import type { Transaction } from '../types'

interface Props {
  e: Transaction
  onClick?: () => void
}

export const TransactionListItem: React.FC<Props> = ({ e, onClick }) => {
  const isExpense = e.transactionType === 'expense'

  return (
    <div
      onClick={onClick}
      className='group flex items-center justify-between p-4 bg-white border border-stone-100 rounded-2xl hover:border-stone-300 hover:shadow-sm transition-all cursor-pointer'
    >
      <div className='flex items-center gap-4'>
        <div
          className={`w-12 h-12 min-w-12 rounded-xl flex items-center justify-center font-bold text-lg
          ${isExpense ? 'bg-orange-50 text-[#8E4336]' : 'bg-emerald-50 text-emerald-700'}`}
        >
          {e.category.charAt(0).toUpperCase()}
        </div>

        <div className='flex flex-col'>
          <div className='flex items-center gap-2'>
            <span className='font-extrabold text-stone-900 tracking-tight'>
              {e.category}
            </span>
            <span className='text-[10px] font-bold px-2 py-0.5 rounded-full bg-stone-100 text-stone-500 uppercase'>
              {e.transactionType}
            </span>
          </div>
          <span className='text-sm text-stone-500 font-medium line-clamp-1'>
            {e.description || 'No description'}
          </span>
        </div>
      </div>

      <div className='text-right min-w-fit'>
        <div
          className={`text-lg font-black tracking-tight ${isExpense ? 'text-stone-900' : 'text-emerald-600'}`}
        >
          {isExpense ? '-' : '+'} {e.amount}
        </div>
        <div className='text-xs font-bold text-stone-400 uppercase'>
          {e.date}
        </div>
      </div>
    </div>
  )
}
