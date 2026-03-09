import { Controller, useForm } from 'react-hook-form'
import { NumberInput } from '../components/NumberInput'
import { TextInput } from '../components/TextInput'
import { Select } from '../components/Select'
import { EXPENSE_CATEGORIES, type Transaction } from '../types'
import { DateInput } from '../components/DateInput'
import { Button } from '../components/Button'
import { CloseIcon } from '../components/icons/CloseIcon'

interface EditFormProps {
  initialData?: Transaction
  onSubmit: (data: Transaction) => void
  onDelete?: (id: string) => void
  onCancel: () => void
}

export const TransactionForm: React.FC<EditFormProps> = ({
  initialData,
  onSubmit,
  onDelete,
  onCancel,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Transaction>({
    defaultValues: {
      ...initialData,
      amount:
        initialData?.transactionType === 'expense'
          ? Number(initialData?.amount) * -1
          : initialData?.amount,
    },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-xl w-full bg-white p-8 rounded-4xl shadow-2xl border border-stone-100 flex flex-col gap-5'
    >
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-2xl font-black text-stone-950 tracking-tight'>
          Edit Transaction
        </h2>
        <button
          type='button'
          onClick={onCancel}
          className='p-2 hover:bg-stone-100 rounded-full transition-colors cursor-pointer'
        >
          <CloseIcon />
        </button>
      </div>

      <Controller
        name='amount'
        control={control}
        rules={{
          required: 'Amount is required',
          validate: (value) => {
            const num = Number(value)
            return num !== 0 || 'Value cannot be zero'
          },
        }}
        render={({ field }) => (
          <NumberInput
            {...field}
            label='How much?'
            error={errors.amount?.message}
          />
        )}
      />

      <div className='flex flex-col gap-1'>
        <Controller
          name='description'
          control={control}
          rules={{
            required: 'Description is required',
            minLength: {
              value: 3,
              message: 'Min length is 3 letters',
            },
          }}
          render={({ field }) => (
            <TextInput
              {...field}
              label='Description'
              placeholder='What did you buy?'
              error={errors.description?.message}
            />
          )}
        />
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col gap-1'>
          <Controller
            name='category'
            control={control}
            rules={{ required: 'Category is required' }}
            render={({ field, fieldState }) => (
              <Select
                label='Category'
                options={EXPENSE_CATEGORIES.map((e) => ({
                  label: e,
                  value: e,
                }))}
                value={field.value}
                onChange={field.onChange}
                error={fieldState.error?.message}
              />
            )}
          />
        </div>

        <div className='flex flex-col gap-1'>
          <Controller
            name='date'
            control={control}
            rules={{
              required: 'Date is required',
            }}
            render={({ field }) => (
              <DateInput {...field} label='Date' error={errors.date?.message} />
            )}
          />
        </div>
      </div>

      <div className='flex flex-col gap-3 pt-4 border-t border-stone-50'>
        <Button label='Update Transaction' size='lg' />
        <Button
          type='button'
          label='Delete Transaction'
          size='lg'
          variant='secondary'
          onClick={() => initialData?.id && onDelete?.(initialData.id)}
        />
      </div>
    </form>
  )
}
