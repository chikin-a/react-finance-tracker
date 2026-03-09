import React from 'react'

interface NumberInputProps {
  label?: string
  currency?: string
  placeholder?: string
  error?: string
  step?: string
}

export const NumberInput: React.FC<NumberInputProps> = React.forwardRef<
  HTMLInputElement,
  NumberInputProps
>(
  (
    {
      label,
      currency = '$',
      placeholder = '0',
      error,
      step = '0.01',
      ...props
    },
    ref,
  ) => {
    return (
      <div className='flex flex-col gap-2 w-full'>
        {label && (
          <label className='text-sm font-bold text-stone-700 ml-1'>
            {label}
          </label>
        )}

        <div className='relative flex items-center group'>
          <span className='absolute left-5 text-2xl font-extrabold text-stone-400 group-focus-within:text-stone-950 transition-colors'>
            {currency}
          </span>

          <input
            {...props}
            ref={ref}
            type='number'
            inputMode='decimal'
            step={step}
            placeholder={placeholder}
            className={`
            w-full py-6 pl-12 pr-6 rounded-3xl border text-3xl font-extrabold transition-all outline-none
            ${
              error
                ? 'border-red-500 bg-red-50 focus:ring-4 focus:ring-red-100'
                : 'border-stone-100 bg-[#FBF9F6] focus:border-stone-900 focus:bg-white focus:ring-8 focus:ring-stone-100/50'
            }
            placeholder:text-stone-300 text-stone-950
          `}
          />
        </div>

        {error && (
          <span className='text-xs text-red-500 font-bold ml-1 animate-in fade-in slide-in-from-top-1'>
            {error}
          </span>
        )}
      </div>
    )
  },
)
