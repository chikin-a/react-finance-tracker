import { type ButtonHTMLAttributes } from 'react'

type IconButtonProps = {
  icon: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline' | 'danger'
  size?: 'sm' | 'md' | 'lg' | 'full'
  disabled?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton: React.FC<IconButtonProps> = ({
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
    primary: 'bg-stone-950 hover:bg-stone-800 shadow-sm',
    secondary:
      'bg-white border border-stone-200 hover:bg-stone-50',
    danger: 'bg-[#8E4336] hover:bg-[#7a392e]',
    outline:
      'bg-transparent border-2 border-stone-950 hover:bg-stone-950',
  }

  const sizes = {
    sm: 'px-2 py-2 rounded-xl',
    md: 'px-3 py-3 rounded-2xl',
    lg: 'px-4 py-4 rounded-[20px]',
    full: 'w-full py-4 rounded-2xl',
  }

  return (
    <button
      {...props}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]}`}
    >
      {icon}
    </button>
  )
}
