import clsx from 'clsx'

import { TOTAL_STOCK } from '@/lib/config'

type CountdownProps = {
  Remaining: number
  className?: string
}
const Countdown = ({ Remaining, className, ...props }: CountdownProps) => {
  return (
    <div className={clsx('relative', className)} {...props}>
      <div className="absolute blur -inset-1 rounded-xl bg-gradient-to-r from-indigo-500 via-orange-500 to-pink-500 animate-gradient bg-[length:200%_200%]" />
      <div className="relative p-4 bg-white rounded-lg ring-1 ring-gray-900/5 items-top">
        <div className="flex justify-between mb-1">
          <span className="text-xl font-bold text-indigo-700">
            {Remaining} left
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-indigo-600 h-2.5 rounded-full"
            style={{
              width: (1 - (TOTAL_STOCK - Remaining) / TOTAL_STOCK) * 100 + '%',
            }}></div>
        </div>
        <p className="mt-3 text-sm text-gray-700">
          We produced a limited first batch of {TOTAL_STOCK} air fresheners.
          Order now!
        </p>
      </div>
    </div>
  )
}

export default Countdown
