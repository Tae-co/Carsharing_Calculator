import { useState } from 'react'
import { calcSocar } from '../lib/socar'
import { FeeBreakdown } from './FeeBreakdown'

const clampPositive = (val: string): number | "" => {
  if (val === "") return ""
  const parsed = parseInt(val, 10)
  if (isNaN(parsed)) return ""
  return parsed < 0 ? 0 : parsed
}

const inputClass = "w-full rounded-lg bg-white border border-gray-300 px-4 py-3 pr-16 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

export function SocarCalculator() {
  const [upTo30, setUpTo30] = useState<number | "">("")
  const [upTo100, setUpTo100] = useState<number | "">("")
  const [over100, setOver100] = useState<number | "">("")
  const [distanceKm, setDistanceKm] = useState<number | "">("")

  const ratesReady =
    typeof upTo30 === "number" &&
    typeof upTo100 === "number" &&
    typeof over100 === "number"

  const hasDistance = typeof distanceKm === "number" && distanceKm > 0

  const result =
    ratesReady && hasDistance
      ? calcSocar(
          { isElectric: false, upTo30, upTo100, over100 },
          distanceKm
        )
      : null

  return (
    <section className="space-y-5">
      <div className="rounded-lg bg-white border border-gray-200 p-6 space-y-4">
        <div className="space-y-3">
          <p className="text-xs text-gray-400">
            구간별 단가 — 쏘카 앱 → 차량 선택 → 요금 안내에서 확인
          </p>

          <div>
            <label htmlFor="socar-upto30" className="block text-sm text-gray-700 mb-1.5">
              0 ~ 30km 단가
            </label>
            <div className="relative">
              <input
                id="socar-upto30"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="예: 210"
                value={upTo30}
                onChange={(e) => setUpTo30(clampPositive(e.target.value))}
                className={inputClass}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                원/km
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="socar-upto100" className="block text-sm text-gray-700 mb-1.5">
              30 ~ 100km 단가
            </label>
            <div className="relative">
              <input
                id="socar-upto100"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="예: 190"
                value={upTo100}
                onChange={(e) => setUpTo100(clampPositive(e.target.value))}
                className={inputClass}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">
                원/km
              </span>
            </div>
          </div>

          <div>
            <label htmlFor="socar-over100" className="block text-sm text-gray-700 mb-1.5">
              100km ~ 단가
            </label>
            <div className="relative">
              <input
                id="socar-over100"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="예: 170"
                value={over100}
                onChange={(e) => setOver100(clampPositive(e.target.value))}
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

        <div>
          <label htmlFor="socar-distance" className="block text-sm text-gray-700 mb-1.5">
            주행거리
          </label>
          <div className="relative">
            <input
              id="socar-distance"
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

      {result !== null ? (
        <div className="rounded-lg bg-white border border-gray-200 p-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">계산 결과</p>
          <FeeBreakdown result={result} isElectric={false} distanceKm={distanceKm as number} />
        </div>
      ) : (
        <p className="text-center text-sm text-gray-400 py-2">
          {!ratesReady
            ? "단가를 먼저 입력해주세요. "
            : "주행거리를 입력하면 요금이 계산됩니다."}
        </p>
      )}
    </section>
  )
}
