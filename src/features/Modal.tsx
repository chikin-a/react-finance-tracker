import React, { useEffect } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
      <div
        className='absolute inset-0 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-300'
        onClick={onClose}
      />

      <div className='relative w-full max-w-xl animate-in zoom-in-95 slide-in-from-bottom-10 duration-300 ease-out'>
        {children}
      </div>
    </div>
  )
}
