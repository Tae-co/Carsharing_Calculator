import { useState } from 'react'
import { calcSocar } from '../lib/socar'
import { FeeBreakdown } from './FeeBreakdown'
import type { SocarRates } from '../types'

export function SocarCalculator() {
  const [isElectric, setIsElectric] = useState(false)
  const [upTo30, setUpTo30] = useState<number | "">("")
  const [upTo100, setUpTo100] = useState<number | "">("")
  const [over100, setOver100] = useState<number | "">("")
  const [electricRate, setElectricRate] = useState<number | "">("")
  const [distanceKm, setDistanceKm] = useState<number | "">("")

  const handleElectricToggle = (checked: boolean) => {
    setIsElectric(checked)
    setUpTo30("")
    setUpTo100("")
    setOver100("")
    setElectricRate("")
    setDistanceKm("")
  }

  const parseNumericInput = (val: string): number | "" => {
    if (val === "") return ""
    const parsed = parseInt(val, 10)
    return isNaN(parsed) ? "" : parsed
  }

  const ratesReady = isElectric
    ? typeof electricRate === "number"
    : typeof upTo30 === "number" && typeof upTo100 === "number" && typeof over100 === "number"

  const hasDistance = typeof distanceKm === "number" && distanceKm > 0

  let result = null
  if (ratesReady && hasDistance) {
    const rates: SocarRates = isElectric
      ? { isElectric: true, ratePerKm: electricRate as number }
      : { isElectric: false, upTo30: upTo30 as number, upTo100: upTo100 as number, over100: over100 as number }
    result = calcSocar(rates, distanceKm as number)
  }

  const showRateHint = !ratesReady && hasDistance

  return (
    <section className="space-y-5">
      <div className="rounded-lg bg-[#141414] border border-neutral-800 p-6 space-y-4">
        {/* 전기차 토글 */}
        <label className="flex items-center gap-2.5 cursor-pointer">
          <input
            id="socar-electric"
            type="checkbox"
            checked={isElectric}
            onChange={(e) => handleElectricToggle(e.target.checked)}
            className="sr-only"
          />
          <div
            className={`w-9 h-5 rounded-full relative transition-colors ${isElectric ? 'bg-blue-500' : 'bg-neutral-700'}`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${isElectric ? 'translate-x-4' : 'translate-x-0'}`}
            />
          </div>
          <span className="text-sm text-neutral-300">전기차</span>
        </label>

        {/* 일반 차종 단가 입력 */}
        {!isElectric && (
          <div className="space-y-3">
            <div>
              <label htmlFor="socar-upto30" className="block text-sm text-neutral-300 mb-1.5">
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
                  onChange={(e) => setUpTo30(parseNumericInput(e.target.value))}
                  className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-3 pr-16 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none">
                  원/km
                </span>
              </div>
              <p className="text-xs text-neutral-600 mt-1">
                쏘카 앱 → 차량 선택 → 요금 안내 탭에서 단가를 확인하세요.
              </p>
            </div>

            <div>
              <label htmlFor="socar-upto100" className="block text-sm text-neutral-300 mb-1.5">
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
                  onChange={(e) => setUpTo100(parseNumericInput(e.target.value))}
                  className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-3 pr-16 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none">
                  원/km
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="socar-over100" className="block text-sm text-neutral-300 mb-1.5">
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
                  onChange={(e) => setOver100(parseNumericInput(e.target.value))}
                  className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-3 pr-16 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none">
                  원/km
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 전기차 단가 입력 */}
        {isElectric && (
          <div>
            <label htmlFor="socar-electric-rate" className="block text-sm text-neutral-300 mb-1.5">
              전 구간 단가
            </label>
            <div className="relative">
              <input
                id="socar-electric-rate"
                type="number"
                inputMode="numeric"
                min="0"
                placeholder="예: 150"
                value={electricRate}
                onChange={(e) => setElectricRate(parseNumericInput(e.target.value))}
                className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-3 pr-16 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none">
                원/km
              </span>
            </div>
          </div>
        )}

        {/* 거리 입력 */}
        <div>
          <label htmlFor="socar-distance" className="block text-sm text-neutral-300 mb-1.5">
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
              onChange={(e) => setDistanceKm(parseNumericInput(e.target.value))}
              className="w-full rounded-lg bg-neutral-900 border border-neutral-800 px-4 py-3 pr-12 text-white text-sm placeholder:text-neutral-600 focus:outline-none focus:border-neutral-600 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none">
              km
            </span>
          </div>
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="rounded-lg bg-[#141414] border border-neutral-800 p-6">
        {result !== null ? (
          <FeeBreakdown result={result} isElectric={isElectric} distanceKm={distanceKm as number} />
        ) : showRateHint ? (
          <p className="py-6 text-center text-sm text-neutral-600">
            단가를 먼저 입력해주세요.
          </p>
        ) : (
          <p className="py-6 text-center text-sm text-neutral-600">
            {ratesReady ? "주행거리를 입력하면 요금이 계산됩니다." : "쏘카 앱에서 단가를 확인 후 입력해주세요."}
          </p>
        )}
      </div>
    </section>
  )
}
