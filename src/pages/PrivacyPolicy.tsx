import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>개인정보처리방침 | 카셰어링 주행요금 계산기</title>
        <meta name="description" content="카셰어링 주행요금 계산기의 개인정보처리방침을 확인하세요." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://carsharecalc.vercel.app/privacy" />
      </Helmet>
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-lg mx-auto space-y-5">

        <header>
          <Link to="/" className="text-sm text-blue-600 hover:underline">← 계산기로 돌아가기</Link>
          <h1 className="text-lg font-semibold text-gray-900 mt-4">개인정보처리방침</h1>
          <p className="text-xs text-gray-400 mt-1">최종 수정일: 2025년 1월 1일</p>
        </header>

        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">1. 개요</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            카셰어링 주행요금 계산기(이하 "본 서비스")는 사용자의 개인정보를 소중히 여깁니다.
            본 방침은 본 서비스가 어떤 정보를 수집하고, 어떻게 사용하는지 설명합니다.
          </p>
        </section>

        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">2. 수집하는 정보</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            본 서비스는 계산기 기능을 위해 사용자가 입력하는 요금 단가 및 주행거리 값을 처리합니다.
            이 데이터는 사용자의 브라우저 내에서만 처리되며, 서버로 전송되거나 저장되지 않습니다.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            본 서비스는 서비스 개선을 위해 Google Analytics를 사용할 수 있으며,
            이 경우 방문 페이지, 체류 시간, 사용 기기 등의 익명화된 이용 통계가 수집될 수 있습니다.
          </p>
        </section>

        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">3. 광고 및 쿠키</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            본 서비스는 Google AdSense를 통해 광고를 제공할 수 있습니다.
            Google AdSense는 쿠키를 사용하여 사용자의 관심사에 맞는 광고를 표시합니다.
            Google의 광고 쿠키 사용에 관한 자세한 내용은{' '}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google 광고 정책
            </a>
            에서 확인하실 수 있습니다.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            사용자는 브라우저 설정을 통해 쿠키 사용을 거부하거나 삭제할 수 있습니다.
            단, 이 경우 일부 서비스 이용이 제한될 수 있습니다.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            맞춤 광고를 원하지 않는 경우{' '}
            <a
              href="https://www.google.com/settings/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google 광고 설정
            </a>
            에서 비활성화할 수 있습니다.
          </p>
        </section>

        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">4. 제3자 서비스</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            본 서비스는 다음 제3자 서비스를 사용할 수 있습니다.
          </p>
          <ul className="space-y-1.5 text-sm text-gray-600">
            <li>· <strong>Google AdSense</strong>: 광고 게재 (Google LLC)</li>
            <li>· <strong>Google Analytics</strong>: 사용 통계 분석 (Google LLC)</li>
            <li>· <strong>Vercel</strong>: 웹 호스팅 (Vercel Inc.)</li>
          </ul>
          <p className="text-sm text-gray-600 leading-relaxed">
            각 제3자 서비스의 개인정보처리방침은 해당 서비스 제공업체의 홈페이지에서 확인하실 수 있습니다.
          </p>
        </section>

        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">5. 아동 개인정보 보호</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            본 서비스는 만 14세 미만 아동을 대상으로 하지 않으며,
            아동으로부터 의도적으로 개인정보를 수집하지 않습니다.
          </p>
        </section>

        <section className="rounded-lg bg-white border border-gray-200 p-6 space-y-3">
          <h2 className="text-sm font-semibold text-gray-800">6. 방침 변경</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            본 개인정보처리방침은 법령 변경 또는 서비스 변경에 따라 업데이트될 수 있습니다.
            변경 사항은 본 페이지에 게시되며, 중요한 변경의 경우 서비스 내 공지를 통해 안내됩니다.
          </p>
        </section>

      </div>
    </main>
    </>
  )
}
