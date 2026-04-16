import type { FeeResult, FeeSegment, SocarRates } from '../types'

export function calcSocar(rates: SocarRates, distanceKm: number): FeeResult {
  if (distanceKm <= 0) {
    return { segments: [], total: 0 }
  }

  if (rates.isElectric) {
    const { ratePerKm } = rates
    const isFree = ratePerKm === 0
    const segment: FeeSegment = {
      label: '전 구간',
      distance: distanceKm,
      ratePerKm,
      subtotal: distanceKm * ratePerKm,
      isFree,
    }
    return { segments: [segment], total: segment.subtotal }
  }

  const { upTo30, upTo100, over100 } = rates
  const tiers = [
    { label: '0 ~ 30km', capacity: 30, rate: upTo30 },
    { label: '30 ~ 100km', capacity: 70, rate: upTo100 },
    { label: '100km ~', capacity: Infinity, rate: over100 },
  ]

  const segments: FeeSegment[] = []
  let remaining = distanceKm

  for (const tier of tiers) {
    if (remaining <= 0) break
    const distance = tier.capacity === Infinity ? remaining : Math.min(remaining, tier.capacity)
    if (distance <= 0) continue
    const isFree = tier.rate === 0
    segments.push({
      label: tier.label,
      distance,
      ratePerKm: tier.rate,
      subtotal: distance * tier.rate,
      isFree,
    })
    remaining -= distance
  }

  const total = segments.reduce((sum, s) => sum + s.subtotal, 0)
  return { segments, total }
}
