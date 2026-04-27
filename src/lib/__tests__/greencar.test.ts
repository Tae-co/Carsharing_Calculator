import { describe, it, expect } from 'vitest'
import { calcGreencar } from '../greencar'

const DEFAULT = { upTo30: 240, upTo100: 210, over100: 190 }

describe('calcGreencar', () => {
  it('0km → segments: [], total: 0', () => {
    const result = calcGreencar(DEFAULT, 0)
    expect(result.segments).toEqual([])
    expect(result.total).toBe(0)
  })

  it('1km → 구간 1개, total: 240', () => {
    const result = calcGreencar(DEFAULT, 1)
    expect(result.segments).toHaveLength(1)
    expect(result.segments[0].label).toBe('1 ~ 30km')
    expect(result.segments[0].distance).toBe(1)
    expect(result.segments[0].ratePerKm).toBe(240)
    expect(result.segments[0].subtotal).toBe(240)
    expect(result.segments[0].isFree).toBe(false)
    expect(result.total).toBe(240)
  })

  it('30km → 구간 1개, total: 7200', () => {
    const result = calcGreencar(DEFAULT, 30)
    expect(result.segments).toHaveLength(1)
    expect(result.segments[0].label).toBe('1 ~ 30km')
    expect(result.segments[0].distance).toBe(30)
    expect(result.segments[0].subtotal).toBe(7200)
    expect(result.total).toBe(7200)
  })

  it('31km → 구간 2개, total: 7410', () => {
    const result = calcGreencar(DEFAULT, 31)
    expect(result.segments).toHaveLength(2)
    expect(result.segments[0].label).toBe('1 ~ 30km')
    expect(result.segments[0].distance).toBe(30)
    expect(result.segments[0].subtotal).toBe(7200)
    expect(result.segments[1].label).toBe('30 ~ 100km')
    expect(result.segments[1].distance).toBe(1)
    expect(result.segments[1].ratePerKm).toBe(210)
    expect(result.segments[1].subtotal).toBe(210)
    expect(result.total).toBe(7410)
  })

  it('100km → 구간 2개, total: 21900', () => {
    const result = calcGreencar(DEFAULT, 100)
    expect(result.segments).toHaveLength(2)
    expect(result.segments[0].distance).toBe(30)
    expect(result.segments[0].subtotal).toBe(7200)
    expect(result.segments[1].distance).toBe(70)
    expect(result.segments[1].subtotal).toBe(14700)
    expect(result.total).toBe(21900)
  })

  it('101km → 구간 3개, total: 22090', () => {
    const result = calcGreencar(DEFAULT, 101)
    expect(result.segments).toHaveLength(3)
    expect(result.segments[0].distance).toBe(30)
    expect(result.segments[0].subtotal).toBe(7200)
    expect(result.segments[1].distance).toBe(70)
    expect(result.segments[1].subtotal).toBe(14700)
    expect(result.segments[2].label).toBe('100km ~')
    expect(result.segments[2].distance).toBe(1)
    expect(result.segments[2].ratePerKm).toBe(190)
    expect(result.segments[2].subtotal).toBe(190)
    expect(result.total).toBe(22090)
  })

  it('120km → 구간 3개, total: 25700', () => {
    const result = calcGreencar(DEFAULT, 120)
    expect(result.segments).toHaveLength(3)
    expect(result.segments[0].distance).toBe(30)
    expect(result.segments[0].subtotal).toBe(7200)
    expect(result.segments[1].distance).toBe(70)
    expect(result.segments[1].subtotal).toBe(14700)
    expect(result.segments[2].distance).toBe(20)
    expect(result.segments[2].subtotal).toBe(3800)
    expect(result.total).toBe(25700)
  })
})
