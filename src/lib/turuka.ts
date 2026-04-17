import type { FeeResult, FeeSegment } from '../types'

export interface TurukaRates {
  tier1: number  // 1 ~ 50km
  tier2: number  // 51 ~ 100km
  tier3: number  // 101km ~
}

export const TURUKA_DEFAULT_RATES: TurukaRates = {
  tier1: 260,
  tier2: 250,
  tier3: 230,
}

export const TURUKA_TIERS: Array<{
  label: string
  from: number
  upTo: number
  rate: number
}> = [
  { label: '1 ~ 50km', from: 1, upTo: 50, rate: TURUKA_DEFAULT_RATES.tier1 },
  { label: '51 ~ 100km', from: 51, upTo: 100, rate: TURUKA_DEFAULT_RATES.tier2 },
  { label: '101km ~', from: 101, upTo: Infinity, rate: TURUKA_DEFAULT_RATES.tier3 },
]

export function calcTuruka(distanceKm: number, rates: TurukaRates = TURUKA_DEFAULT_RATES): FeeResult {
  if (distanceKm <= 0) {
    return { segments: [], total: 0 }
  }

  const tiers = [
    { label: '1 ~ 50km', from: 1, upTo: 50, rate: rates.tier1 },
    { label: '51 ~ 100km', from: 51, upTo: 100, rate: rates.tier2 },
    { label: '101km ~', from: 101, upTo: Infinity, rate: rates.tier3 },
  ]

  const segments: FeeSegment[] = []
  let remaining = distanceKm

  for (const tier of tiers) {
    if (remaining <= 0) break
    const capacity = tier.upTo === Infinity ? remaining : tier.upTo - tier.from + 1
    const distance = Math.min(remaining, capacity)
    if (distance <= 0) continue
    segments.push({
      label: tier.label,
      distance,
      ratePerKm: tier.rate,
      subtotal: distance * tier.rate,
      isFree: false,
    })
    remaining -= distance
  }

  const total = segments.reduce((sum, s) => sum + s.subtotal, 0)
  return { segments, total }
}
