import { useMemo } from 'react'

import type { Transaction } from '../types'

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CustomTooltip } from '../components/CustomTooltip'
import { formatChartTransactions } from '../utils/transaction'

type TransactionChartProps = {
  data: Transaction[]
}

export const TransactionChart: React.FC<TransactionChartProps> = ({ data }) => {
  const formattedData = useMemo(() => formatChartTransactions(data), [data])
  const hasData = formattedData.length > 0

  return (
    <div className='w-full bg-white p-6 rounded-4xl border border-stone-100 mb-12'>
      <div className='flex justify-between items-center mb-8 px-2'>
        <h3 className='text-lg font-black tracking-tight text-stone-950'>
          Monthly cash flow
        </h3>
      </div>

      {!hasData && (
        <p className='py-10 text-center text-stone-400'>No transactions yet</p>
      )}

      {hasData && (
        <div className='h-70 w-full'>
          <ResponsiveContainer width='100%' height='100%'>
            <AreaChart
              data={formattedData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id='colorIn' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#9a9d8c' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#9a9d8c' stopOpacity={0} />
                </linearGradient>
                <linearGradient id='colorEx' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#8e4336' stopOpacity={0.3} />
                  <stop offset='95%' stopColor='#8e4336' stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                vertical={false}
                strokeDasharray='3 3'
                stroke='#f5f5f4'
              />
              <XAxis dataKey='date' hide />
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: '#d6d3d1', fontSize: 10, fontWeight: 700 }}
              />
              <Tooltip content={<CustomTooltip />} />

              <Area
                type='monotone'
                dataKey='income'
                stroke='#9a9d8c'
                strokeWidth={3}
                fillOpacity={1}
                fill='url(#colorIn)'
                stackId='1'
              />

              <Area
                type='monotone'
                dataKey='expense'
                stroke='#8e4336'
                strokeWidth={3}
                fillOpacity={1}
                fill='url(#colorEx)'
                stackId='0'
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
