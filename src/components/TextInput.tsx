import React from 'react'

interface TextInputProps {
  label?: string
  placeholder?: string
  error?: string
  icon?: React.ReactNode
  type?: 'text' | 'password' | 'email'
  name?: string
}

export const TextInput: React.FC<TextInputProps> = React.forwardRef<
  HTMLInputElement,
  TextInputProps
>(({ label, placeholder, error, icon, type = 'text', name, ...props }, ref) => {
  return (
    <div className='flex flex-col gap-2 w-full'>
      {label && (
        <label className='text-sm font-bold text-stone-700 ml-1'>{label}</label>
      )}

      <div className='relative group'>
        {icon && (
          <div className='absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-stone-900 transition-colors'>
            {icon}
          </div>
        )}

        <input
          {...props}
          ref={ref}
          type={type}
          name={name}
          placeholder={placeholder}
          className={`
            w-full py-4 rounded-2xl border transition-all outline-none text-stone-900 font-medium
            ${icon ? 'pl-12 pr-4' : 'px-5'}
            ${
              error
                ? 'border-red-500 bg-red-50 focus:ring-4 focus:ring-red-100'
                : 'border-stone-100 bg-[#FBF9F6] focus:border-stone-900 focus:bg-white focus:ring-4 focus:ring-stone-100'
            }
            placeholder:text-stone-400
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
