import React, { useState, useRef, useEffect } from 'react'

interface Option {
  value: string
  label: string
  icon?: React.ReactNode
}

interface SelectProps {
  label?: string
  options: Option[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: string
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder = 'Select option',
  error,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className='flex flex-col gap-2 w-full relative' ref={containerRef}>
      {label && (
        <label className='text-sm font-bold text-stone-700 ml-1'>{label}</label>
      )}

      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`
          flex items-center justify-between px-5 py-4 rounded-2xl border cursor-pointer transition-all
          ${error ? 'border-red-500 bg-red-50' : 'border-stone-100 bg-[#FBF9F6]'}
          ${isOpen ? 'border-stone-900 ring-4 ring-stone-100 bg-white' : 'hover:border-stone-300'}
        `}
      >
        <div className='flex items-center gap-3'>
          {selectedOption?.icon && (
            <span className='text-xl'>{selectedOption.icon}</span>
          )}
          <span
            className={`font-bold ${selectedOption ? 'text-stone-900' : 'text-stone-400'}`}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>

        <svg
          className={`w-5 h-5 text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill='none'
          viewBox='0 0 24 24'
          stroke='currentColor'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M19 9l-7 7-7-7'
          />
        </svg>
      </div>

      {isOpen && (
        <div className='absolute top-[calc(100%+8px)] left-0 w-full bg-white border border-stone-100 rounded-2xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100'>
          <div className='max-h-60 overflow-y-auto p-2'>
            {options.map((option) => (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-colors
                  ${value === option.value ? 'bg-stone-900 text-white' : 'text-stone-700 hover:bg-stone-50'}
                `}
              >
                {option.icon && <span className='text-xl'>{option.icon}</span>}
                <span className='font-semibold'>{option.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <span className='text-xs text-red-500 font-bold ml-1'>{error}</span>
      )}
    </div>
  )
}
