import type { FeeResult, FeeSegment } from '../types'

export interface GreencarRates {
  upTo30: number   // 1 ~ 30km
  upTo100: number  // 30 ~ 100km
  over100: number  // 100km ~
}

export function calcGreencar(rates: GreencarRates, distanceKm: number): FeeResult {
  if (distanceKm <= 0) {
    return { segments: [], total: 0 }
  }

  const { upTo30, upTo100, over100 } = rates
  const tiers = [
    { label: '1 ~ 30km', capacity: 30, rate: upTo30 },
    { label: '30 ~ 100km', capacity: 70, rate: upTo100 },
    { label: '100km ~', capacity: Infinity, rate: over100 },
  ]

  const segments: FeeSegment[] = []
  let remaining = distanceKm

  for (const tier of tiers) {
    if (remaining <= 0) break
    const distance = tier.capacity === Infinity ? remaining : Math.min(remaining, tier.capacity)
    if (distance <= 0) continue
    segments.push({
      label: tier.label,
      distance,
      ratePerKm: tier.rate,
      subtotal: distance * tier.rate,
      isFree: tier.rate === 0,
    })
    remaining -= distance
  }

  const total = segments.reduce((sum, s) => sum + s.subtotal, 0)
  return { segments, total }
}
