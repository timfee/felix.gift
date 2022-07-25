import { Ref, useEffect, useRef } from "react"

const useForwardedRef = <T>(ref: Ref<T>) => {
  const innerRef = useRef<T>(null)
  useEffect(() => {
    if (!ref) return
    if (typeof ref === "function") {
      ref(innerRef.current)
    } else {
      ;(ref as React.MutableRefObject<T | null>).current = innerRef.current
    }
  })

  return innerRef
}

export default useForwardedRef
