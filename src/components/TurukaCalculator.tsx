import { useState } from 'react'
import { calcTuruka, TURUKA_TIERS } from '../lib/turuka'
import { FeeBreakdown } from './FeeBreakdown'

export function TurukaCalculator() {
  const [distanceKm, setDistanceKm] = useState<number | "">("")

  const result =
    typeof distanceKm === "number" && distanceKm > 0
      ? calcTuruka(distanceKm)
      : null

  return (
    <section className="space-y-5">
      <div className="rounded-lg bg-[#141414] border border-neutral-800 p-6 space-y-4">
        <div>
          <label htmlFor="turuka-distance" className="block text-sm text-neutral-300 mb-1.5">
            주행거리
          </label>
          <div className="relative">
            <input
              id="turuka-distance"
              type="number"
              inputMode="numeric"
              min="1"
              placeholder="예: 120"
              value={distanceKm}
              onChange={(e) => {
                const val = e.target.value
                if (val === "") {
                  setDistanceKm("")
                } else {
                  const parsed = parseInt(val, 10)
                  if (!isNaN(parsed)) setDistanceKm(parsed)
                }
              }}
              className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-3 pr-12 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none">
              km
            </span>
          </div>
        </div>

        <div className="pt-1">
          <p className="text-xs text-neutral-600 mb-2">요금 구조</p>
          <ul className="space-y-1">
            {TURUKA_TIERS.map((tier) => (
              <li key={tier.label} className="flex justify-between text-xs text-neutral-500">
                <span>{tier.label}</span>
                <span className="tabular-nums">{tier.rate.toLocaleString('ko-KR')}원/km</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded-lg bg-[#141414] border border-neutral-800 p-6">
        {result === null ? (
          <p className="py-6 text-center text-sm text-neutral-600">
            주행거리를 입력하면 요금이 계산됩니다.
          </p>
        ) : (
          <FeeBreakdown result={result} isElectric={false} distanceKm={distanceKm as number} />
        )}
      </div>
    </section>
  )
}
