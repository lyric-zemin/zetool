// @ts-nocheck
const now = performance.now || Date.now,
  root = typeof window === 'undefined' ? global : window,
  vendors = ['moz', 'webkit'],
  suffix = 'AnimationFrame'

let raf = root['request' + suffix],
  caf = root['cancel' + suffix] || root['cancelRequest' + suffix]

for (let i = 0; !raf && i < vendors.length; i++) {
  raf = root[vendors[i] + 'Request' + suffix]
  caf =
    root[vendors[i] + 'Cancel' + suffix] ||
    root[vendors[i] + 'CancelRequest' + suffix]
}

// Some versions of FF have rAF but not cAF
if (!raf || !caf) {
  let last = 0,
    id = 0
  const queue = [],
    frameDuration = 1000 / 60

  raf = function (callback) {
    if (queue.length === 0) {
      const _now = now(),
        next = Math.max(0, frameDuration - (_now - last))
      last = next + _now
      setTimeout(function () {
        const cp = queue.slice(0)
        // Clear queue here to prevent
        // callbacks from appending listeners
        // to the current frame's queue
        queue.length = 0
        for (var i = 0; i < cp.length; i++) {
          if (!cp[i].cancelled) {
            try {
              cp[i].callback(last)
            } catch (e) {
              setTimeout(function () {
                throw e
              }, 0)
            }
          }
        }
      }, Math.round(next))
    }
    queue.push({
      handle: ++id,
      callback: callback,
      cancelled: false
    })
    return id
  }

  caf = function (handle) {
    for (var i = 0; i < queue.length; i++) {
      if (queue[i].handle === handle) {
        queue[i].cancelled = true
      }
    }
  }
}

export default function (fn: Function): number {
  // Wrap in a new function to prevent
  // `cancel` potentially being assigned
  // to the native rAF function
  return raf.call(root, fn)
}

export const cancel = function (id: number) {
  caf.apply(root, id)
}

export const polyfill = function (object: Object = root) {
  object.requestAnimationFrame = raf
  object.cancelAnimationFrame = caf
}
