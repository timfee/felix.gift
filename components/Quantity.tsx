import useForwardedRef from "@/lib/useForwardedRef"
import { MinusIcon, PlusIcon } from "@heroicons/react/outline"
import clsx from "clsx"
import { Dispatch, FC, forwardRef, SetStateAction } from "react"

type QuantityType = {
  quantity: [number, Dispatch<SetStateAction<number>>]
}
const Quantity: FC<QuantityType> = ({ quantity: [quantity, setQuantity] }) => {
  const adjustBy = (amount: number) => {
    if (!isNaN(quantity)) {
      if (quantity + amount < 1) {
        setQuantity(1)
      } else if (quantity + amount > 10) {
        setQuantity(10)
      } else {
        setQuantity(quantity => quantity + amount)
      }
    } else {
      setQuantity(1)
    }
  }

  return (
    <div className="flex items-center space-x-1.5 mx-auto justify-center">
      <button
        onClick={() => {
          adjustBy(-1)
        }}
        type="button"
        className={clsx(
          "text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center",
          {
            "bg-slate-400": quantity <= 1,
            " bg-indigo-700 hover:bg-indigo-800  focus:ring-indigo-300 ":
              quantity > 0,
          }
        )}>
        <MinusIcon className="w-4 h-4" />
        <span className="sr-only">Reduce quantity</span>
      </button>

      <input
        type="number"
        min="1"
        onChange={e => {
          let value = e.currentTarget.valueAsNumber
          if (value < 1) {
            value = 1
          } else if (value > 10) {
            value = 10
          } else if (isNaN(value)) {
            value = 1
          }
          setQuantity(value)
        }}
        max="10"
        className="w-20 text-xl font-bold text-center bg-white border-2 border-indigo-600 rounded-full outline-none cursor-default "
        name="quantity"
        value={quantity}></input>
      <button
        onClick={() => {
          adjustBy(1)
        }}
        type="button"
        disabled={quantity >= 10}
        className={clsx(
          "text-white focus:ring-4 focus:outline-none font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center",
          {
            "bg-slate-400": quantity >= 10,
            " bg-indigo-700 hover:bg-indigo-800  focus:ring-indigo-300 ":
              quantity < 10,
          }
        )}>
        <PlusIcon className="w-4 h-4" />
        <span className="sr-only">Increase quantity</span>
      </button>
    </div>
  )
}

export default Quantity
