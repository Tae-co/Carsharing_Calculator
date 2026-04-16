import type { FeeResult } from '../types/index'
import { formatKRW } from '../lib/format'

interface Props {
  result: FeeResult
  isElectric: boolean
  distanceKm: number
}

export function FeeBreakdown({ result, isElectric, distanceKm }: Props) {
  return (
    <div aria-live="polite">
      <table className="w-full">
        <thead>
          <tr className="border-b border-neutral-800">
            <th className="text-left text-xs font-medium text-neutral-500 uppercase tracking-wider pb-2">구간</th>
            <th className="text-right text-xs font-medium text-neutral-500 uppercase tracking-wider pb-2">거리</th>
            <th className="text-right text-xs font-medium text-neutral-500 uppercase tracking-wider pb-2">단가</th>
            <th className="text-right text-xs font-medium text-neutral-500 uppercase tracking-wider pb-2">소계</th>
          </tr>
        </thead>
        <tbody>
          {result.segments.map((segment, index) => (
            <tr key={index} className="border-b border-neutral-800/50">
              <td className="text-sm text-neutral-400 py-2.5">{segment.label}</td>
              <td className="text-sm text-neutral-300 tabular-nums text-right py-2.5">{segment.distance}km</td>
              <td className="text-sm text-neutral-400 tabular-nums text-right py-2.5">
                {segment.isFree ? '무료' : `${segment.ratePerKm.toLocaleString('ko-KR')}원/km`}
              </td>
              <td className={`text-sm font-medium tabular-nums text-right py-2.5 ${segment.isFree ? 'text-green-500' : 'text-white'}`}>
                {segment.isFree ? '무료' : formatKRW(segment.subtotal)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="border-t border-neutral-800 pt-4 mt-2 flex justify-between items-baseline">
        <span className="text-sm text-neutral-400">합계</span>
        <span className="text-2xl font-semibold text-blue-400 tabular-nums">{formatKRW(result.total)}</span>
      </div>

      {isElectric && (
        <div role="note" className="mt-4 rounded-md bg-green-950 border border-green-900 px-4 py-3 flex items-start gap-2.5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4 h-4 mt-0.5 flex-shrink-0 text-green-500"
          >
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
          <span className="text-sm text-green-400">
            최대 {formatKRW(distanceKm * 100)} 포인트 적립 가능 (연간 최대 70,000원)
          </span>
        </div>
      )}

      <p className="text-xs text-neutral-600 mt-3">* 주행요금만 포함. 시간요금·보험료·주차비는 별도입니다.</p>
    </div>
  )
}
