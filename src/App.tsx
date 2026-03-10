import { useBalance } from './hooks/useBalance'
import { useTransactionStore } from './context/TransactionContext'

import type { NewTransaction, Transaction } from './types'

import { Modal } from './features/Modal'
import { Header } from './features/Header'
import { NewForm } from './features/NewForm'
import { StatCard } from './components/StatCard'
import { useModalStore } from './context/ModalContext'
import { TransactionForm } from './features/TransactionForm'
import { TransactionList } from './features/TransactionList'
import { TransactionChart } from './features/TransactionChart'
import { formatTransaction } from './utils/transaction'

export const App = () => {
  const transactions = useTransactionStore((state) => state.transactions)
  const editTransaction = useTransactionStore((state) => state.editTransaction)
  const addTransaction = useTransactionStore((state) => state.addTransaction)
  const removeTransaction = useTransactionStore(
    (state) => state.removeTransaction,
  )

  const { activeModal, payload, openModal, closeModal } = useModalStore()

  const { balance, income, expense } = useBalance()

  const newTransaction = (data: NewTransaction) => {
    addTransaction(formatTransaction(data))
    closeModal()
  }

  const updateTransaction = (data: Transaction) => {
    editTransaction(formatTransaction(data))
    closeModal()
  }

  const deleteTransaction = (id: string) => {
    removeTransaction(id)
    closeModal()
  }

  const handleEdit = (transaction: Transaction) => {
    openModal('edit', transaction)
  }

  return (
    <div className='min-h-screen bg-[#FBF9F6] text-stone-900 font-sans antialiased pb-20'>
      <div className='max-w-4xl mx-auto px-6 pt-12'>
        <Header onOpenModal={openModal} />

        <section className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-12'>
          <StatCard amount={balance} label='Total Balance' variant='balance' />
          <StatCard amount={income} label='Monthly Income' variant='income' />
          <StatCard
            amount={expense}
            label='Monthly Expense'
            variant='expense'
          />
        </section>

        <TransactionChart data={transactions} />

        <TransactionList transactions={transactions} onEdit={handleEdit} />
      </div>

      <Modal isOpen={activeModal === 'new'} onClose={closeModal}>
        <NewForm onSubmit={newTransaction} onCancel={closeModal} />
      </Modal>

      <Modal isOpen={activeModal === 'edit'} onClose={closeModal}>
        <TransactionForm
          onSubmit={updateTransaction}
          onDelete={deleteTransaction}
          onCancel={closeModal}
          initialData={payload || undefined}
        />
      </Modal>
    </div>
  )
}
