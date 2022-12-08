/**
 * delay 延迟执行
 * 
 * delay(1000).then(...)
 * await delay(2000)
 *  ...
 * @param time
 * @returns
 */

export default function delay(time: number) {
  return new Promise<void>(resolve => {
    setTimeout(resolve, time)
  })
}
