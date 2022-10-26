/**
 * 观察者
 */

class Emitter {
  subscriber: Record<string, Function[]> = {}

  on(event: string, fn: Function) {
    ;(this.subscriber[event] || (this.subscriber[event] = [])).push(fn)
  }

  emit(event: string, ...args: unknown[]) {
    ;(this.subscriber[event] || []).forEach(fn => fn(...args))
  }

  off(event: string, fn?: Function) {
    if (!fn) {
      this.subscriber[event] = []
    } else {
      const index = (this.subscriber[event] || []).indexOf(fn)
      if (index > -1) this.subscriber[event].splice(index, 1)
    }
  }

  once(event: string, fn: Function) {
    const self = this
    const onceFn = function (...args: unknown[]) {
      fn(...args)
      self.off(event, onceFn)
    }
    this.on(event, onceFn)
  }
}

export default Emitter
