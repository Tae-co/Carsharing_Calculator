import type { FeeResult, FeeSegment } from '../types'

export const TURUKA_TIERS: Array<{
  label: string
  from: number
  upTo: number
  rate: number
}> = [
  { label: '1 ~ 50km', from: 1, upTo: 50, rate: 260 },
  { label: '51 ~ 100km', from: 51, upTo: 100, rate: 250 },
  { label: '101km ~', from: 101, upTo: Infinity, rate: 230 },
]

export function calcTuruka(distanceKm: number): FeeResult {
  if (distanceKm <= 0) {
    return { segments: [], total: 0 }
  }

  const segments: FeeSegment[] = []
  let remaining = distanceKm

  for (const tier of TURUKA_TIERS) {
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
