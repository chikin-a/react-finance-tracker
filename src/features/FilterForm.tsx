import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { EXPENSE_CATEGORIES, type Filter } from '../types'

import { Select } from '../components/Select'
import { Switch } from '../components/Switch'
import { TextInput } from '../components/TextInput'
import { IconButton } from '../components/IconButton'
import { CloseIcon } from '../components/icons/CloseIcon'

interface FilterProps {
  onFilterChange: (filters: Filter) => void
}

export const FilterForm: React.FC<FilterProps> = ({ onFilterChange }) => {
  const {
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<Filter>({
    defaultValues: {
      search: '',
      category: '',
      transactionType: 'all',
    },
  })

  const switchOptions = [
    { label: 'All', value: 'all' },
    { label: 'Income', value: 'income' },
    { label: 'Expense', value: 'expense' },
  ]

  useEffect(() => {
    const subscription = watch((value) => onFilterChange(value as Filter))
    return () => subscription.unsubscribe()
  }, [watch, onFilterChange])

  return (
    <div className='w-full bg-white p-5 rounded-4xl border border-stone-100 mb-6 flex flex-col gap-4'>
      <Controller
        name='search'
        control={control}
        rules={{
          minLength: {
            value: 2,
            message: 'Min length is 2 letters',
          },
        }}
        render={({ field }) => (
          <TextInput
            {...field}
            placeholder='Rent, Coffee, Salary...'
            error={errors.search?.message}
          />
        )}
      />

      <div className='flex flex-wrap items-end md:flex-nowrap gap-3'>
        <Controller
          name='category'
          control={control}
          render={({ field, fieldState }) => (
            <Select
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
          name='transactionType'
          control={control}
          render={({ field }) => (
            <Switch
              options={switchOptions}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <IconButton
          size='lg'
          onClick={() => reset()}
          icon={<CloseIcon className='text-white' />}
        />
      </div>
    </div>
  )
}
