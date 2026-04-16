import { describe, it, expect } from 'vitest'
import { formatKRW } from '../format'

describe('formatKRW', () => {
  it('0 → "0원"', () => {
    expect(formatKRW(0)).toBe('0원')
  })

  it('20500 → "20,500원"', () => {
    expect(formatKRW(20500)).toBe('20,500원')
  })

  it('1000000 → "1,000,000원"', () => {
    expect(formatKRW(1000000)).toBe('1,000,000원')
  })

  it('260 → "260원"', () => {
    expect(formatKRW(260)).toBe('260원')
  })
})
