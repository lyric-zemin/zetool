import debounce from './debounce'

jest.useFakeTimers()
// jest.spyOn(global, 'setTimeout')

describe('debounce', () => {
  test('only trigger once', () => {
    let i = 0
    const fn = jest.fn(() => i++)
    const debounceFn = debounce(fn, 1000)

    debounceFn()
    debounceFn()
    debounceFn()

    expect(fn).not.toBeCalled()

    jest.runAllTimers()

    expect(fn).toBeCalled()
    expect(fn).toHaveBeenCalledTimes(1)
    expect(i).toBe(1)
  })

  test('cancel', () => {
    let i = 0
    const fn = jest.fn(() => i++)
    const debounceFn = debounce(fn, 1000)

    debounceFn()

    expect(fn).not.toBeCalled()

    debounceFn.cancel()

    jest.runAllTimers()

    expect(fn).not.toBeCalled()
    expect(fn).toHaveBeenCalledTimes(0)
    expect(i).toBe(0)
  })
})
