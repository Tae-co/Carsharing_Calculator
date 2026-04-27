import { useState } from 'react'
import { calcTuruka } from '../lib/turuka'
import { calcSocar } from '../lib/socar'
import { calcGreencar } from '../lib/greencar'
import { formatKRW } from '../lib/format'

const clampPositive = (val: string): number | "" => {
  if (val === "") return ""
  const parsed = parseInt(val, 10)
  if (isNaN(parsed)) return ""
  return parsed < 0 ? 0 : parsed
}

const inputClass =
  "w-full rounded-lg bg-white border border-gray-300 px-3 py-2.5 pr-14 text-gray-900 text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-400 transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"

interface RateInputProps {
  id: string
  label: string
  value: number | ""
  onChange: (v: number | "") => void
  placeholder: string
}

function RateInput({ id, label, value, onChange, placeholder }: RateInputProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs text-gray-600 mb-1 truncate">{label}</label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="numeric"
          min="0"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(clampPositive(e.target.value))}
          className={inputClass}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">원/km</span>
      </div>
    </div>
  )
}

export function ComparisonCalculator() {
  // 투루카 단가
  const [t1, setT1] = useState<number | "">("")
  const [t2, setT2] = useState<number | "">("")
  const [t3, setT3] = useState<number | "">("")

  // 쏘카 단가
  const [s1, setS1] = useState<number | "">("")
  const [s2, setS2] = useState<number | "">("")
  const [s3, setS3] = useState<number | "">("")

  // 그린카 단가
  const [g1, setG1] = useState<number | "">("")
  const [g2, setG2] = useState<number | "">("")
  const [g3, setG3] = useState<number | "">("")

  // 공통 거리
  const [distanceKm, setDistanceKm] = useState<number | "">("")

  const turukaReady = typeof t1 === "number" && typeof t2 === "number" && typeof t3 === "number"
  const socarReady = typeof s1 === "number" && typeof s2 === "number" && typeof s3 === "number"
  const greencarReady = typeof g1 === "number" && typeof g2 === "number" && typeof g3 === "number"
  const hasDistance = typeof distanceKm === "number" && distanceKm > 0

  const readyRatesCount = [turukaReady, socarReady, greencarReady].filter(Boolean).length

  const turukaResult =
    turukaReady && hasDistance
      ? calcTuruka(distanceKm, { tier1: t1, tier2: t2, tier3: t3 })
      : null

  const socarResult =
    socarReady && hasDistance
      ? calcSocar({ isElectric: false, upTo30: s1, upTo100: s2, over100: s3 }, distanceKm)
      : null

  const greencarResult =
    greencarReady && hasDistance
      ? calcGreencar({ upTo30: g1, upTo100: g2, over100: g3 }, distanceKm)
      : null

  const services = [
    {
      key: "turuka" as const,
      label: "투루카",
      result: turukaResult,
      colors: {
        label: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        total: "text-blue-600",
        banner: "bg-blue-50 border-blue-200 text-blue-700",
      },
    },
    {
      key: "socar" as const,
      label: "쏘카",
      result: socarResult,
      colors: {
        label: "text-green-600",
        bg: "bg-green-50",
        border: "border-green-200",
        total: "text-green-600",
        banner: "bg-green-50 border-green-200 text-green-700",
      },
    },
    {
      key: "greencar" as const,
      label: "그린카",
      result: greencarResult,
      colors: {
        label: "text-orange-500",
        bg: "bg-orange-50",
        border: "border-orange-200",
        total: "text-orange-500",
        banner: "bg-orange-50 border-orange-200 text-orange-700",
      },
    },
  ]

  const readyServices = services.filter(s => s.result !== null)
  const canCompare = readyServices.length >= 2

  const minTotal = canCompare ? Math.min(...readyServices.map(s => s.result!.total)) : null
  const winnerCount = canCompare ? readyServices.filter(s => s.result!.total === minTotal).length : 0
  const winner = canCompare && winnerCount === 1 ? readyServices.find(s => s.result!.total === minTotal) : null

  const bannerMsg = canCompare
    ? winner ? `${winner.label}가 가장 저렴합니다` : "요금이 동일합니다"
    : null

  const bannerClass = canCompare
    ? (winner?.colors.banner ?? "bg-gray-50 border-gray-200 text-gray-600")
    : ""

  return (
    <section className="space-y-5">
      {/* 단가 입력 */}
      <div className="rounded-lg bg-white border border-gray-200 p-6 space-y-5">
        <p className="text-xs text-gray-400">두 개 이상의 단가를 입력하면 바로 비교합니다.</p>

        <div className="space-y-3">
          <p className="text-xs font-medium text-blue-600 uppercase tracking-wide">투루카 단가</p>
          <div className="grid grid-cols-3 gap-3">
            <RateInput id="cmp-t1" label="1~50km" value={t1} onChange={setT1} placeholder="260" />
            <RateInput id="cmp-t2" label="51~100km" value={t2} onChange={setT2} placeholder="250" />
            <RateInput id="cmp-t3" label="101km~" value={t3} onChange={setT3} placeholder="230" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium text-green-600 uppercase tracking-wide">쏘카 단가</p>
          <div className="grid grid-cols-3 gap-3">
            <RateInput id="cmp-s1" label="0~30km" value={s1} onChange={setS1} placeholder="210" />
            <RateInput id="cmp-s2" label="30~100km" value={s2} onChange={setS2} placeholder="190" />
            <RateInput id="cmp-s3" label="100km~" value={s3} onChange={setS3} placeholder="170" />
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-medium text-orange-500 uppercase tracking-wide">그린카 단가</p>
          <div className="grid grid-cols-3 gap-3">
            <RateInput id="cmp-g1" label="1~30km" value={g1} onChange={setG1} placeholder="240" />
            <RateInput id="cmp-g2" label="30~100km" value={g2} onChange={setG2} placeholder="210" />
            <RateInput id="cmp-g3" label="100km~" value={g3} onChange={setG3} placeholder="190" />
          </div>
        </div>

        <div>
          <label htmlFor="cmp-distance" className="block text-sm text-gray-700 mb-1.5">주행거리</label>
          <div className="relative">
            <input
              id="cmp-distance"
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
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 pointer-events-none">km</span>
          </div>
        </div>
      </div>

      {/* 비교 결과 */}
      {canCompare ? (
        <div aria-live="polite" className="space-y-3">
          {/* 승자 배너 */}
          <div className={`rounded-lg border px-4 py-3 text-sm font-medium text-center ${bannerClass}`}>
            {bannerMsg}
          </div>

          {/* 결과 카드 */}
          <div className={`grid gap-2 ${readyServices.length === 3 ? "grid-cols-3" : "grid-cols-2"}`}>
            {readyServices.map((service) => {
              const isWin = service.result!.total === minTotal
              return (
                <div
                  key={service.key}
                  className={`rounded-lg border p-3 space-y-2 ${isWin ? `${service.colors.bg} ${service.colors.border}` : "bg-white border-gray-200"}`}
                >
                  <p className={`text-xs font-semibold ${isWin ? service.colors.label : "text-gray-400"}`}>
                    {service.label} {isWin && winnerCount === 1 && "👑"}
                  </p>
                  <div className="space-y-1">
                    {service.result!.segments.map((seg, i) => (
                      <div key={i} className="flex justify-between text-xs text-gray-500">
                        <span className="truncate mr-1">{seg.label}</span>
                        <span className="tabular-nums shrink-0">{formatKRW(seg.subtotal)}</span>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-1.5 flex justify-between items-baseline">
                    <span className="text-xs text-gray-400">합계</span>
                    <span className={`text-sm font-semibold tabular-nums ${isWin ? service.colors.total : "text-gray-900"}`}>
                      {formatKRW(service.result!.total)}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>

          <p className="text-xs text-gray-400">* 주행요금만 포함. 시간요금·보험료·주차비는 별도입니다. 실제 주행요금과 다를 수 있습니다.</p>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-400 py-2">
          {readyRatesCount < 2
            ? "두 개 이상의 서비스 단가를 입력해주세요."
            : "주행거리를 입력하면 비교 결과가 표시됩니다."}
        </p>
      )}
    </section>
  )
}
