/**
 * omit
 * 过滤不需要的key
 */

export default function omit<T extends Object, K extends keyof T>(
  obj: T,
  keys: K[]
): Omit<T, K> {
  const copy = { ...obj }

  for (const key of keys) delete copy[key]

  return copy
}
