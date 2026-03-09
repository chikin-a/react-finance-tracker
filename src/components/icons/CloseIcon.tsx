interface CloseIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export const CloseIcon: React.FC<CloseIconProps> = ({
  className = '',
  ...props
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      stroke='currentColor'
      className={`w-6 h-6 text-stone-400 ${className}`}
      {...props}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth={2}
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  )
}
