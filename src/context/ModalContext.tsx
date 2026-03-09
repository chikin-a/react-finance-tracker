import { create } from 'zustand'
import type { Modal, Transaction } from '../types'

interface ModalState {
  activeModal: Modal
  payload: Transaction | null
  openModal: (type: Modal, payload?: Transaction) => void
  closeModal: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  activeModal: null,
  payload: null,

  openModal: (type, payload = undefined) => set({ activeModal: type, payload }),

  closeModal: () => set({ activeModal: null, payload: null }),
}))
