/**
 * 防抖
 */

interface DebounceFn {
  (...args: unknown[]): any
  cancel: () => void
}

export default function (fn: Function, time: number): DebounceFn {
  let timer: number | undefined
  const scheduledTask = function (...args: unknown[]) {
    cancel()
    timer = setTimeout(function () {
      fn(...args)
    }, time)
  }
  const cancel = () => {
    if (timer) clearTimeout(timer)
  }
  scheduledTask.cancel = cancel
  return scheduledTask
}
