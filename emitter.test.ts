import Emitter from './emitter'

const emitter = new Emitter()

describe('emitter', () => {
  test('has subscriber', () => {
    emitter.on('start', function () {})
    expect(emitter.subscriber.start.length).toBe(1)
  })

  test('trigger emit', () => {
    let i = 0
    emitter.on('add', () => i++)
    emitter.emit('add')
    expect(i).toBe(1)
  })

  test('trigger off', () => {
    emitter.on('collect', function () {})
    emitter.off('collect')
    expect(emitter.subscriber.collect.length).toBe(0)
  })

  test('trigger once', () => {
    let i = 0
    emitter.once('add', () => i++)
    emitter.emit('add')
    emitter.emit('add')
    expect(i).toBe(1)
  })
})
