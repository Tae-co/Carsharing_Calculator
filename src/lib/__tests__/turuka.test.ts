import { describe, it, expect } from 'vitest'
import { calcTuruka } from '../turuka'

describe('calcTuruka', () => {
  it('0km → segments: [], total: 0', () => {
    const result = calcTuruka(0)
    expect(result.segments).toEqual([])
    expect(result.total).toBe(0)
  })

  it('1km → 구간 1개, total: 260', () => {
    const result = calcTuruka(1)
    expect(result.segments).toHaveLength(1)
    expect(result.segments[0].label).toBe('1 ~ 50km')
    expect(result.segments[0].distance).toBe(1)
    expect(result.segments[0].ratePerKm).toBe(260)
    expect(result.segments[0].subtotal).toBe(260)
    expect(result.segments[0].isFree).toBe(false)
    expect(result.total).toBe(260)
  })

  it('50km → 구간 1개, total: 13000', () => {
    const result = calcTuruka(50)
    expect(result.segments).toHaveLength(1)
    expect(result.segments[0].label).toBe('1 ~ 50km')
    expect(result.segments[0].distance).toBe(50)
    expect(result.segments[0].ratePerKm).toBe(260)
    expect(result.segments[0].subtotal).toBe(13000)
    expect(result.segments[0].isFree).toBe(false)
    expect(result.total).toBe(13000)
  })

  it('51km → 구간 2개, total: 13250', () => {
    const result = calcTuruka(51)
    expect(result.segments).toHaveLength(2)
    expect(result.segments[0].label).toBe('1 ~ 50km')
    expect(result.segments[0].distance).toBe(50)
    expect(result.segments[0].ratePerKm).toBe(260)
    expect(result.segments[0].subtotal).toBe(13000)
    expect(result.segments[0].isFree).toBe(false)
    expect(result.segments[1].label).toBe('51 ~ 100km')
    expect(result.segments[1].distance).toBe(1)
    expect(result.segments[1].ratePerKm).toBe(250)
    expect(result.segments[1].subtotal).toBe(250)
    expect(result.segments[1].isFree).toBe(false)
    expect(result.total).toBe(13250)
  })

  it('80km → 구간 2개, total: 20500', () => {
    const result = calcTuruka(80)
    expect(result.segments).toHaveLength(2)
    expect(result.segments[0].distance).toBe(50)
    expect(result.segments[0].subtotal).toBe(13000)
    expect(result.segments[1].distance).toBe(30)
    expect(result.segments[1].subtotal).toBe(7500)
    expect(result.total).toBe(20500)
  })

  it('100km → 구간 2개, total: 25500', () => {
    const result = calcTuruka(100)
    expect(result.segments).toHaveLength(2)
    expect(result.segments[0].label).toBe('1 ~ 50km')
    expect(result.segments[0].distance).toBe(50)
    expect(result.segments[0].subtotal).toBe(13000)
    expect(result.segments[1].label).toBe('51 ~ 100km')
    expect(result.segments[1].distance).toBe(50)
    expect(result.segments[1].subtotal).toBe(12500)
    expect(result.total).toBe(25500)
  })

  it('101km → 구간 3개, total: 25730', () => {
    const result = calcTuruka(101)
    expect(result.segments).toHaveLength(3)
    expect(result.segments[0].distance).toBe(50)
    expect(result.segments[0].subtotal).toBe(13000)
    expect(result.segments[1].distance).toBe(50)
    expect(result.segments[1].subtotal).toBe(12500)
    expect(result.segments[2].label).toBe('101km ~')
    expect(result.segments[2].distance).toBe(1)
    expect(result.segments[2].ratePerKm).toBe(230)
    expect(result.segments[2].subtotal).toBe(230)
    expect(result.segments[2].isFree).toBe(false)
    expect(result.total).toBe(25730)
  })

  it('120km → 구간 3개, total: 30100', () => {
    const result = calcTuruka(120)
    expect(result.segments).toHaveLength(3)
    expect(result.segments[0].distance).toBe(50)
    expect(result.segments[0].subtotal).toBe(13000)
    expect(result.segments[1].distance).toBe(50)
    expect(result.segments[1].subtotal).toBe(12500)
    expect(result.segments[2].distance).toBe(20)
    expect(result.segments[2].subtotal).toBe(4600)
    expect(result.total).toBe(30100)
  })
})
