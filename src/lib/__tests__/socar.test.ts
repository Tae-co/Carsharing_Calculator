import { describe, it, expect } from 'vitest'
import { calcSocar } from '../socar'
import type { SocarRates } from '../../types'

const tiered = (upTo30: number, upTo100: number, over100: number): SocarRates => ({
  isElectric: false,
  upTo30,
  upTo100,
  over100,
})

const electric = (ratePerKm: number): SocarRates => ({
  isElectric: true,
  ratePerKm,
})

describe('calcSocar', () => {
  it('일반 1구간: 20km, 210/200/180 → total: 4200', () => {
    const result = calcSocar(tiered(210, 200, 180), 20)
    expect(result.segments).toHaveLength(1)
    expect(result.segments[0].label).toBe('0 ~ 30km')
    expect(result.segments[0].distance).toBe(20)
    expect(result.segments[0].ratePerKm).toBe(210)
    expect(result.segments[0].subtotal).toBe(4200)
    expect(result.segments[0].isFree).toBe(false)
    expect(result.total).toBe(4200)
  })

  it('일반 경계 30km: 30km, 210/200/180 → total: 6300, 구간 1개', () => {
    const result = calcSocar(tiered(210, 200, 180), 30)
    expect(result.segments).toHaveLength(1)
    expect(result.segments[0].label).toBe('0 ~ 30km')
    expect(result.segments[0].distance).toBe(30)
    expect(result.segments[0].subtotal).toBe(6300)
    expect(result.total).toBe(6300)
  })

  it('일반 31km: 31km, 210/200/180 → total: 6500, 구간 2개', () => {
    const result = calcSocar(tiered(210, 200, 180), 31)
    expect(result.segments).toHaveLength(2)
    expect(result.segments[0].label).toBe('0 ~ 30km')
    expect(result.segments[0].distance).toBe(30)
    expect(result.segments[0].subtotal).toBe(6300)
    expect(result.segments[1].label).toBe('30 ~ 100km')
    expect(result.segments[1].distance).toBe(1)
    expect(result.segments[1].ratePerKm).toBe(200)
    expect(result.segments[1].subtotal).toBe(200)
    expect(result.total).toBe(6500)
  })

  it('일반 100km: 100km, 210/200/180 → total: 20300, 구간 2개', () => {
    const result = calcSocar(tiered(210, 200, 180), 100)
    expect(result.segments).toHaveLength(2)
    expect(result.segments[0].distance).toBe(30)
    expect(result.segments[0].subtotal).toBe(6300)
    expect(result.segments[1].label).toBe('30 ~ 100km')
    expect(result.segments[1].distance).toBe(70)
    expect(result.segments[1].subtotal).toBe(14000)
    expect(result.total).toBe(20300)
  })

  it('일반 3구간: 123km, 210/200/180 → total: 24440, 구간 3개', () => {
    const result = calcSocar(tiered(210, 200, 180), 123)
    expect(result.segments).toHaveLength(3)
    expect(result.segments[0].distance).toBe(30)
    expect(result.segments[0].subtotal).toBe(6300)
    expect(result.segments[1].distance).toBe(70)
    expect(result.segments[1].subtotal).toBe(14000)
    expect(result.segments[2].label).toBe('100km ~')
    expect(result.segments[2].distance).toBe(23)
    expect(result.segments[2].ratePerKm).toBe(180)
    expect(result.segments[2].subtotal).toBe(4140)
    expect(result.segments[2].isFree).toBe(false)
    expect(result.total).toBe(24440)
  })

  it('전기차: 80km, ratePerKm=150 → total: 12000, 구간 1개, label: "전 구간"', () => {
    const result = calcSocar(electric(150), 80)
    expect(result.segments).toHaveLength(1)
    expect(result.segments[0].label).toBe('전 구간')
    expect(result.segments[0].distance).toBe(80)
    expect(result.segments[0].ratePerKm).toBe(150)
    expect(result.segments[0].subtotal).toBe(12000)
    expect(result.segments[0].isFree).toBe(false)
    expect(result.total).toBe(12000)
  })

  it('전기차 무료: 80km, ratePerKm=0 → total: 0, isFree: true', () => {
    const result = calcSocar(electric(0), 80)
    expect(result.segments).toHaveLength(1)
    expect(result.segments[0].isFree).toBe(true)
    expect(result.segments[0].subtotal).toBe(0)
    expect(result.total).toBe(0)
  })

  it('0km (일반) → segments: [], total: 0', () => {
    const result = calcSocar(tiered(210, 200, 180), 0)
    expect(result.segments).toEqual([])
    expect(result.total).toBe(0)
  })

  it('0km (전기차) → segments: [], total: 0', () => {
    const result = calcSocar(electric(150), 0)
    expect(result.segments).toEqual([])
    expect(result.total).toBe(0)
  })

  it('무료 구간 포함: 30km, upTo30=0 → 1구간 isFree: true, subtotal: 0', () => {
    const result = calcSocar(tiered(0, 200, 180), 30)
    expect(result.segments).toHaveLength(1)
    expect(result.segments[0].isFree).toBe(true)
    expect(result.segments[0].subtotal).toBe(0)
    expect(result.total).toBe(0)
  })
})
