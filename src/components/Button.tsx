import { type ButtonHTMLAttributes } from 'react'

type ButtonProps = {
  label: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'full'
  icon?: React.ReactNode
  disabled?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = 'primary',
  size = 'md',
  icon,
  disabled = false,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-bold transition-all duration-200 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'

  const variants = {
    primary: 'bg-stone-950 text-white hover:bg-stone-800 shadow-sm',
    secondary:
      'bg-white text-stone-950 border border-stone-200 hover:bg-stone-50',
    danger: 'bg-[#8E4336] text-white hover:bg-[#7a392e]',
    outline:
      'bg-transparent border-2 border-stone-950 text-stone-950 hover:bg-stone-950 hover:text-white',
  }

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-xl',
    md: 'px-6 py-3 text-sm rounded-2xl',
    lg: 'px-8 py-4 text-base rounded-[20px]',
    full: 'w-full py-4 text-base rounded-2xl',
  }

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
    >
      {icon && <span className='mr-2'>{icon}</span>}
      {label}
    </button>
  )
}
