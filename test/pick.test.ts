import pick from '../pick'

test('pick', () => {
  const obj = { a: 1, b: 2, c: 3 }

  expect(Object.keys(obj).length).toBe(3)
  expect(pick(obj, []) === obj).toBe(false)
  expect(Object.keys(pick(obj, [])).length).toBe(0)
  expect(Object.keys(pick(obj, ['a', 'b'])).length).toBe(2)

  expect(obj['a']).toBe(1)
  expect(pick(obj, ['a'])['a']).toBe(1)
})
