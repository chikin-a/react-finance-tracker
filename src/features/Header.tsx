import { Button } from '../components/Button'
import type { Modal } from '../types'

interface HeaderProps {
  onOpenModal: (modal: Modal) => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenModal }) => {
  return (
    <header className='flex justify-between items-end mb-10'>
      <div>
        <p className='text-stone-400 font-bold uppercase text-xs tracking-widest mb-1'>
          Welcome back,
        </p>
        <h1 className='text-3xl font-black tracking-tight text-stone-950'>
          My Finances
        </h1>
      </div>
      <Button label='Add Transaction' onClick={() => onOpenModal('new')} />
    </header>
  )
}
