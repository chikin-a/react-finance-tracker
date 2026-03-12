interface Option {
  label: string
  value: string
}

interface SwitchProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
  label?: string
  variant?: 'primary' | 'danger'
}

export const Switch: React.FC<SwitchProps> = ({
  options,
  value,
  onChange,
  label,
  variant = 'primary',
}) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      {label && (
        <label className='text-sm font-bold text-stone-700 ml-1'>{label}</label>
      )}

      <div className='inline-flex h-full max-h-14.5 p-1.5 bg-[#FBF9F6] rounded-2xl border border-stone-100 w-full'>
        {options.map((option) => {
          const isActive = value === option.value

          return (
            <button
              key={option.value}
              type='button'
              onClick={() => onChange(option.value)}
              className={`
              flex-1 flex items-center justify-center py-4.5 text-xs font-black uppercase tracking-wider transition-all duration-200 rounded-xl cursor-pointer
              ${
                isActive
                  ? variant === 'danger' && option.value === 'expense'
                    ? 'bg-[#8E4336] text-white shadow-md'
                    : 'bg-stone-950 text-white shadow-md'
                  : 'text-stone-400 hover:text-stone-600'
              }
            `}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
