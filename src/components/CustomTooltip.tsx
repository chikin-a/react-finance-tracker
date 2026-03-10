export const CustomTooltip: React.FC = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className='bg-white p-4 rounded-2xl border border-stone-100 shadow-xl'>
        <p className='text-[10px] font-bold text-stone-400 uppercase tracking-widest mb-2'>
          {payload[0].payload.date}
        </p>
        <div className='flex flex-col gap-1'>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-[#9a9d8c]' />
            <span className='text-sm font-black text-stone-900'>
              +${payload[0].value}
            </span>
          </div>
          <div className='flex items-center gap-2'>
            <div className='w-2 h-2 rounded-full bg-[#8e4336]' />
            <span className='text-sm font-black text-stone-900'>
              -${payload[1].value}
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}
