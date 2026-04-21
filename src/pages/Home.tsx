import { Helmet } from 'react-helmet-async'
import Calculator from '../components/Calculator'
import { calcTuruka } from '../lib/turuka'
import { calcSocar } from '../lib/socar'
import { formatKRW } from '../lib/format'

// 예시 요금 계산 (일반적인 단가 기준)
const EXAMPLE_DISTANCES = [50, 100, 120, 200]
const TURUKA_EXAMPLE = { tier1: 260, tier2: 250, tier3: 230 }
const SOCAR_EXAMPLE = { isElectric: false as const, upTo30: 210, upTo100: 190, over100: 170 }

export default function Home() {
  return (
    <>
      <Helmet>
        <title>쏘카 주행요금 계산 · 투루카 주행요금 계산 | 주행요금 계산 방법 안내</title>
        <meta name="description" content="쏘카 주행요금 계산, 쏘카 주행요금 계산 방법, 투루카 주행요금 계산, 투루카 주행요금 계산 방법을 한 번에 확인하세요. 구간별 단가를 입력하면 예상 주행요금을 바로 계산할 수 있습니다." />
        <meta name="keywords" content="쏘카 주행요금 계산, 쏘카 주행요금 계산 방법, 투루카 주행요금 계산, 투루카 주행요금 계산 방법, 카셰어링 주행요금 계산기, 쏘카 요금, 투루카 요금" />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://carsharecalc.vercel.app/" />
        <meta property="og:title" content="쏘카 주행요금 계산 · 투루카 주행요금 계산" />
        <meta property="og:description" content="쏘카 주행요금 계산 방법과 투루카 주행요금 계산 방법을 확인하고 구간별 예상 요금을 바로 계산해 보세요." />
        <meta property="og:url" content="https://carsharecalc.vercel.app/" />
        <meta property="og:image" content="https://carsharecalc.vercel.app/og-image.png" />
        <meta property="og:image:secure_url" content="https://carsharecalc.vercel.app/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="카셰어링 주행요금 계산기 — 투루카·쏘카 요금 비교" />
      </Helmet>
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto space-y-5">

        {/* 헤더 */}
        <header className="mb-6">
          <h1 className="text-2xl font-bold text-blue-600">쏘카 주행요금 계산 · 투루카 주행요금 계산</h1>
          <p className="text-sm text-gray-500 mt-2 leading-relaxed">
            쏘카 주행요금 계산 방법과 투루카 주행요금 계산 방법을 쉽게 확인하고, 구간별 단가를 입력해 예상 주행요금을 바로 계산할 수 있습니다.
            시간요금과 보험료는 포함되지 않습니다.
          </p>
        </header>

        {/* 계산기 */}
        <Calculator />

        {/* 사용법 안내 */}
        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">쏘카·투루카 주행요금 계산 방법</h2>
          <ol className="space-y-2 text-sm text-gray-600 list-decimal list-inside">
            <li>쏘카 또는 투루카 탭을 선택해 서비스별 주행요금 계산 화면으로 이동합니다.</li>
            <li>앱의 요금 안내에서 구간별 단가를 확인해 쏘카 주행요금 계산 또는 투루카 주행요금 계산에 맞게 입력합니다.</li>
            <li>구간별 단가(원/km)와 예상 주행거리(km)를 입력하면 계산 방법에 따라 자동 반영됩니다.</li>
            <li>구간별 요금 내역과 총 예상 주행요금이 바로 계산됩니다.</li>
          </ol>
        </section>

        {/* 요금 구조 안내 */}
        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">쏘카·투루카 주행요금 계산 방법 안내</h2>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-blue-600">투루카 주행요금 계산 방법</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              투루카 주행요금 계산 방법은 주행거리를 3구간으로 나눠 단가를 적용하는 방식입니다. 1~50km 구간, 51~100km 구간, 101km 이상 구간으로 구분되며
              거리가 늘어날수록 단가가 낮아지는 체감 요금 구조입니다. 차종과 등급에 따라 구간 단가가 다르므로 앱에서
              해당 차량의 투루카 주행요금을 확인한 뒤 계산기에 입력해 주세요.
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-blue-600">쏘카 주행요금 계산 방법</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              쏘카 주행요금 계산 방법도 유사한 3구간 체감 요금 방식입니다. 0~30km, 31~100km, 101km 이상으로 구간이 구분됩니다.
              차종에 따라 쏘카 주행요금 단가가 다르며, 요금은 쏘카 앱의 차량 선택 화면에서 확인할 수 있습니다.
            </p>
          </div>
        </section>

        {/* 예시 계산 */}
        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-4">
          <div>
            <h2 className="text-sm font-semibold text-gray-800">📌 예시 계산</h2>
            <p className="text-xs text-gray-400 mt-0.5">일반적인 단가 기준 (투루카 260/250/230원 · 쏘카 210/190/170원)</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left text-xs font-medium text-gray-400 pb-2">주행거리</th>
                  <th className="text-right text-xs font-medium text-gray-400 pb-2">투루카</th>
                  <th className="text-right text-xs font-medium text-gray-400 pb-2">쏘카</th>
                  <th className="text-right text-xs font-medium text-gray-400 pb-2">차이</th>
                </tr>
              </thead>
              <tbody>
                {EXAMPLE_DISTANCES.map((km) => {
                  const t = calcTuruka(km, TURUKA_EXAMPLE)
                  const s = calcSocar(SOCAR_EXAMPLE, km)
                  const diff = Math.abs(t.total - s.total)
                  const cheaper: 'turuka' | 'socar' | 'same' =
                    t.total < s.total ? 'turuka' : t.total > s.total ? 'socar' : 'same'
                  return (
                    <tr key={km} className="border-b border-gray-100 last:border-0">
                      <td className="py-2.5 text-gray-700 font-medium">{km}km</td>
                      <td className={`py-2.5 tabular-nums text-right ${cheaper === 'turuka' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
                        {formatKRW(t.total)}
                      </td>
                      <td className={`py-2.5 tabular-nums text-right ${cheaper === 'socar' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
                        {formatKRW(s.total)}
                      </td>
                      <td className="py-2.5 tabular-nums text-right text-xs text-gray-400">
                        {cheaper === 'same'
                          ? '동일'
                          : `${cheaper === 'turuka' ? '투루카' : '쏘카'} -${formatKRW(diff)}`}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-400">* 실제 단가는 차종마다 다릅니다. 이용할 차량의 앱 요금 안내를 직접 확인하세요.</p>
        </section>

        {/* FAQ */}
        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">자주 묻는 질문</h2>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-700">Q. 주행요금 외에 어떤 요금이 청구되나요?</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                카셰어링 이용 시 주행요금 외에 시간요금, 보험료, 주차비 등이 별도로 청구됩니다.
                본 계산기는 주행요금만 계산하므로 실제 청구 금액은 이보다 높을 수 있습니다.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Q. 쏘카 주행요금 계산 방법과 투루카 주행요금 계산 방법은 어떻게 확인하나요?</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                투루카 주행요금 계산 방법은 앱 내 차량 선택 후 요금 안내에서 구간별 단가를 확인해 적용하면 되고,
                쏘카 주행요금 계산 방법도 쏘카 앱 차량 선택 화면의 구간별 단가를 입력하면 바로 확인할 수 있습니다.
                차종과 등급에 따라 단가가 다르므로 이용할 차량의 실제 단가를 기준으로 계산해 주세요.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Q. 계산 결과가 실제 요금과 다를 수 있나요?</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                네, 실제 청구 요금은 GPS 기반 정확한 주행거리, 프로모션 할인, 쿠폰 적용 등에 따라 다를 수 있습니다.
                본 계산기는 참고용으로만 사용해 주세요.
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700">Q. 투루카와 쏘카 중 어느 쪽이 더 저렴한가요?</p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                두 서비스 모두 차종, 지역, 시간대에 따라 요금이 다릅니다. 두 탭에 각각 단가를 입력해 비교해 보면
                어느 쪽이 더 유리한지 직접 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </section>

      </div>
    </main>
    </>
  )
}
