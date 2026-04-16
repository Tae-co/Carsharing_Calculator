export type ServiceType = "turuka" | "socar"

export interface FeeSegment {
  label: string
  distance: number
  ratePerKm: number
  subtotal: number
  isFree: boolean
}

export interface FeeResult {
  segments: FeeSegment[]
  total: number
}

export interface SocarTieredRates {
  isElectric: false
  upTo30: number
  upTo100: number
  over100: number
}

export interface SocarElectricRates {
  isElectric: true
  ratePerKm: number
}

export type SocarRates = SocarTieredRates | SocarElectricRates
