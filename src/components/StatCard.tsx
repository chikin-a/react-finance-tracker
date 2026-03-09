interface StatCardProps {
  amount: number | string
  label: string
  variant: 'balance' | 'income' | 'expense'
  currency?: string
}

export const StatCard: React.FC<StatCardProps> = ({
  amount,
  label,
  variant,
  currency = '$',
}) => {
  const styles = {
    balance: 'bg-[#FFFFFF] border-stone-100 text-stone-900',
    income: 'bg-[#E6EAD0] border-stone-200 text-stone-900',
    expense: 'bg-[#F2EAE8] border-stone-200 text-[#8E4336]',
  }

  return (
    <div
      className={`flex flex-col justify-center items-center w-60 h-60 rounded-[48px] border transition-transform ${styles[variant]}`}
    >
      <p className='text-[10px] font-bold uppercase tracking-[0.2em] mb-3 opacity-60'>
        {label}
      </p>
      <div className='flex items-start'>
        <span className='text-xl font-bold mt-1 mr-1 opacity-40'>
          {currency}
        </span>
        <p className='text-5xl font-black tracking-tighter italic'>{amount}</p>
      </div>
    </div>
  )
}
