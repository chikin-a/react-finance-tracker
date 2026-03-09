import React from 'react'

interface DateInputProps {
  label?: string
  error?: string
}

export const DateInput: React.FC<DateInputProps> = React.forwardRef<
  HTMLInputElement,
  DateInputProps
>(({ label, error, ...props }, ref) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      {label && (
        <label className='text-sm font-bold text-stone-700 ml-1'>{label}</label>
      )}

      <div className='relative group'>
        <div className='absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none'>
          <svg
            className='w-5 h-5 text-stone-400 group-focus-within:text-stone-900 transition-colors'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
            />
          </svg>
        </div>

        <input
          {...props}
          ref={ref}
          type='date'
          className={`
            w-full py-4 pl-12 pr-4 rounded-2xl border transition-all outline-none
            font-bold text-stone-900 appearance-none
            ${
              error
                ? 'border-red-500 bg-red-50 focus:ring-4 focus:ring-red-100'
                : 'border-stone-100 bg-[#FBF9F6] focus:border-stone-900 focus:bg-white focus:ring-4 focus:ring-stone-100'
            }
            /* Стилізація іконки календаря в Chrome/Safari */
            [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer
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
})
