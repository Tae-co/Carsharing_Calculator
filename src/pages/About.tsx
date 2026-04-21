import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function About() {
  return (
    <>
      <Helmet>
        <title>쏘카 주행요금 계산 방법 · 투루카 주행요금 계산 방법 | 이용안내</title>
        <meta name="description" content="쏘카 주행요금 계산 방법과 투루카 주행요금 계산 방법, 사용법, 유의사항을 안내합니다. 구간별 주행요금 계산 기준을 쉽게 확인해 보세요." />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <link rel="canonical" href="https://carsharecalc.vercel.app/about" />
        <meta property="og:title" content="쏘카 주행요금 계산 방법 · 투루카 주행요금 계산 방법" />
        <meta property="og:description" content="쏘카 주행요금 계산 방법과 투루카 주행요금 계산 방법, 사용법과 유의사항을 확인하세요." />
        <meta property="og:url" content="https://carsharecalc.vercel.app/about" />
        <meta property="og:image" content="https://carsharecalc.vercel.app/og-image.png" />
        <meta property="og:image:secure_url" content="https://carsharecalc.vercel.app/og-image.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="카셰어링 주행요금 계산기 — 투루카·쏘카 요금 비교" />
      </Helmet>
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto space-y-5">

        <header>
          <Link to="/" className="text-sm text-blue-600 hover:underline">← 계산기로 돌아가기</Link>
          <h1 className="text-lg font-semibold text-gray-900 mt-4">쏘카·투루카 주행요금 계산 방법 이용안내</h1>
        </header>

        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">서비스 소개</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            카셰어링 주행요금 계산기는 투루카·쏘카 이용 시 발생하는 주행요금을 구간별로 미리 계산해 볼 수 있는 무료 웹 서비스입니다.
            카셰어링 서비스는 일정 거리 이상 주행하면 구간별로 다른 단가가 적용되는 체감 요금 구조를 가지고 있어,
            단순 계산으로는 예상 요금을 정확하게 파악하기 어렵습니다. 이 계산기는 쏘카 주행요금 계산 방법과 투루카 주행요금 계산 방법을 쉽게 확인할 수 있도록 만들어졌습니다.
          </p>
        </section>

        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">주요 기능</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold flex-shrink-0">·</span>
              <span>투루카·쏘카 두 서비스의 주행요금을 탭으로 전환하며 계산</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold flex-shrink-0">·</span>
              <span>구간별 단가를 직접 입력해 어떤 차종·등급에도 적용 가능</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold flex-shrink-0">·</span>
              <span>거리 입력 즉시 구간별 요금 내역과 합계 자동 계산</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold flex-shrink-0">·</span>
              <span>탭 전환 시에도 입력값 유지</span>
            </li>
            <li className="flex gap-2">
              <span className="text-blue-600 font-bold flex-shrink-0">·</span>
              <span>모바일에서도 편리하게 사용 가능</span>
            </li>
          </ul>
        </section>

        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-4">
          <h2 className="text-sm font-semibold text-gray-800">계산 방식</h2>

          <div className="space-y-3">
            <div>
              <h3 className="text-xs font-medium text-blue-600 mb-1.5">투루카 주행요금 계산</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>· 1~50km: 입력한 1구간 단가 × 해당 구간 거리</p>
                <p>· 51~100km: 입력한 2구간 단가 × 해당 구간 거리</p>
                <p>· 101km~: 입력한 3구간 단가 × 해당 구간 거리</p>
                <p className="text-gray-500 text-xs mt-2">합계 = 각 구간 소계의 합산</p>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-medium text-blue-600 mb-1.5">쏘카 주행요금 계산</h3>
              <div className="text-sm text-gray-600 space-y-1">
                <p>· 0~30km: 입력한 1구간 단가 × 해당 구간 거리</p>
                <p>· 31~100km: 입력한 2구간 단가 × 해당 구간 거리</p>
                <p>· 101km~: 입력한 3구간 단가 × 해당 구간 거리</p>
                <p className="text-gray-500 text-xs mt-2">합계 = 각 구간 소계의 합산</p>
              </div>
            </div>
          </div>
        </section>

        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">유의사항</h2>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>· 본 사이트는 투루카·쏘카의 공식 서비스가 아닙니다.</li>
            <li>· 주행요금만 계산하며 시간요금, 보험료, 주차비 등은 포함되지 않습니다.</li>
            <li>· 실제 청구 요금은 GPS 거리 측정, 프로모션, 쿠폰 적용 등으로 인해 다를 수 있습니다.</li>
            <li>· 요금 정책은 서비스 사업자가 변경할 수 있으므로 항상 앱에서 최신 정보를 확인하세요.</li>
          </ul>
        </section>

      </div>
    </main>
    </>
  )
}
