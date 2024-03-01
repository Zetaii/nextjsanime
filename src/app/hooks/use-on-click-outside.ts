import { RefObject, useEffect } from "react"

type Event = MouseEvent | TouchEvent

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T>,
  handler: (event: Event) => void,
  shouldClose: (target: HTMLElement) => boolean // New parameter
) => {
  useEffect(() => {
    const listener = (event: Event) => {
      const el = ref?.current
      const target = event.target as HTMLElement
      if (!el || el.contains(target) || !shouldClose(target)) {
        return
      }

      handler(event) // Call the handler only if the click is outside of the element passed and shouldClose returns true.
    }

    document.addEventListener("mousedown", listener)
    document.addEventListener("touchstart", listener)

    return () => {
      document.removeEventListener("mousedown", listener)
      document.removeEventListener("touchstart", listener)
    }
  }, [ref, handler, shouldClose]) // Reload only if ref, handler, or shouldClose function changes
}
