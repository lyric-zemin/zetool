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
    if (timer) clearTimeout(timer)
    timer = setTimeout(function () {
      fn(...args)
    }, time)
  }
  scheduledTask.cancel = () => {
    if (timer) clearTimeout(timer)
  }
  return scheduledTask
}
