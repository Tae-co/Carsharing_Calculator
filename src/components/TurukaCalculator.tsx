import { useState } from 'react'
import { calcTuruka } from '../lib/turuka'
import { FeeBreakdown } from './FeeBreakdown'

const clampPositive = (val: string): number | "" => {
  if (val === "") return ""
  const parsed = parseInt(val, 10)
  if (isNaN(parsed)) return ""
  return parsed < 0 ? 0 : parsed
}

const inputClass = "w-full rounded-lg bg-white border border-gray-300 px-4 py-3 pr-16 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

export function TurukaCalculator() {
  const [tier1, setTier1] = useState<number | "">("")
  const [tier2, setTier2] = useState<number | "">("")
  const [tier3, setTier3] = useState<number | "">("")
  const [distanceKm, setDistanceKm] = useState<number | "">("")

  const ratesReady =
    typeof tier1 === "number" &&
    typeof tier2 === "number" &&
    typeof tier3 === "number"

  const hasDistance = typeof distanceKm === "number" && distanceKm > 0

  const result =
    ratesReady && hasDistance
      ? calcTuruka(distanceKm, { tier1, tier2, tier3 })
      : null

  const makeRateHandler = (setter: (v: number | "") => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => setter(clampPositive(e.target.value))

  return (
    <section className="space-y-5">
      <div className="rounded-lg bg-white border border-gray-200 p-6 space-y-4">
        {/* 단가 입력 섹션 */}
        <div className="space-y-3">
          <p className="text-xs text-gray-400">
            구간별 단가 — 투루카 앱 → 차량 선택 → 요금 안내에서 확인
          </p>

          <div>
            <label htmlFor="turuka-tier1" className="block text-sm text-gray-700 mb-1.5">
              1 ~ 50km 단가
            </label>
            <div className="relative">
              <input
                id="turuka-tier1"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="예: 260"
                value={tier1}
                onChange={makeRateHandler(setTier1)}
                className={inputClass}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                원/km
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="turuka-tier2" className="block text-sm text-gray-700 mb-1.5">
              51 ~ 100km 단가
            </label>
            <div className="relative">
              <input
                id="turuka-tier2"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="예: 250"
                value={tier2}
                onChange={makeRateHandler(setTier2)}
                className={inputClass}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                원/km
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="turuka-tier3" className="block text-sm text-gray-700 mb-1.5">
              101km ~ 단가
            </label>
            <div className="relative">
              <input
                id="turuka-tier3"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="예: 230"
                value={tier3}
                onChange={makeRateHandler(setTier3)}
                className={inputClass}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                원/km
              </span>
            </div>
          </div>
        </div>

        {/* 구분선 */}
        <hr className="border-gray-200" />

        {/* 거리 입력 */}
        <div>
          <label htmlFor="turuka-distance" className="block text-sm text-gray-700 mb-1.5">
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
                const val = clampPositive(e.target.value)
                setDistanceKm(val === 0 ? "" : val)
              }}
              className="w-full rounded-lg bg-white border border-gray-300 px-4 py-3 pr-12 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
              km
            </span>
          </div>
        </div>
      </div>

      {/* 결과 영역 */}
      {result !== null ? (
        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">계산 결과</p>
          <FeeBreakdown result={result} isElectric={false} distanceKm={distanceKm as number} />
        </div>
      ) : (
        <p className="text-center text-sm text-gray-400 py-2">
          {!ratesReady
            ? "단가를 먼저 입력해주세요."
            : "주행거리를 입력하면 요금이 계산됩니다."}
        </p>
      )}
    </section>
  )
}
