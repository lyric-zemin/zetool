/**
 * pick
 * 获取指定keys组成的新对象
 */

export default function pick<T extends Object, K extends keyof T>(
  obj: T,
  keys: K[]
): Pick<T, K> {
  const ret = {} as Pick<T, K>

  for (const key of keys) ret[key] = obj[key]

  return ret
}
