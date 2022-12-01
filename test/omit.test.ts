import omit from '../omit'

test('omit', () => {
  const obj = { a: 1, b: 2 }

  expect(Object.keys(obj).length).toBe(2)
  expect(omit(obj, []) === obj).toBe(false)
  expect(Object.keys(omit(obj, [])).length).toBe(2)
  expect(Object.keys(omit(obj, ['a'])).length).toBe(1)

  expect(obj['a']).toBe(1)
  expect(omit(obj, ['a'])['a']).toBe(undefined)
})
