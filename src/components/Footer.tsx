import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="border-t border-gray-200 mt-12 py-8 px-4">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-blue-600 transition-colors">홈</Link>
          <Link to="/about" className="hover:text-blue-600 transition-colors">이용안내</Link>
          <Link to="/privacy" className="hover:text-blue-600 transition-colors">개인정보처리방침</Link>
        </div>
        <p className="text-xs text-gray-400 leading-relaxed">
          본 사이트는 투루카·쏘카의 공식 서비스가 아닙니다. 참고용으로만 사용하시고 정확한 요금은 각 서비스 앱에서 확인해 주세요.
        </p>
        <p className="text-xs text-gray-400">
          © {new Date().getFullYear()} 카셰어링 주행요금 계산기
        </p>
      </div>
    </footer>
  )
}
