import React from 'react'
import { Button } from '../components/Button'
import { Select } from '../components/Select'
import { DateInput } from '../components/DateInput'
import { TextInput } from '../components/TextInput'
import { NumberInput } from '../components/NumberInput'
import { Controller, useForm } from 'react-hook-form'
import { EXPENSE_CATEGORIES, type NewTransaction } from '../types'
import { CloseIcon } from '../components/icons/CloseIcon'

interface TransactionFormProps {
  onSubmit: (data: NewTransaction) => void
  onCancel?: () => void
}

export const NewForm: React.FC<TransactionFormProps> = ({
  onCancel,
  onSubmit,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: '',
      description: '',
      category: '',
      date: '',
    },
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full bg-white p-8 rounded-4xl shadow-2xl border border-stone-100 flex flex-col gap-6'
    >
      <div className='flex justify-between items-center mb-2'>
        <h2 className='text-2xl font-extrabold text-stone-900 tracking-tight'>
          New Transaction
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

      <div className='space-y-4'>
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

        <div className='grid grid-cols-2 gap-4'>
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
      <div className='flex flex-col gap-3 pt-4'>
        <Button label='Add Transaction' size='lg' />
      </div>
    </form>
  )
}
