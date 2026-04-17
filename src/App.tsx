import Calculator from './components/Calculator'

function App() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      <div className="max-w-md mx-auto space-y-5">
        <header className="mb-6">
          <h1 className="text-lg font-semibold text-white">카셰어링 주행요금 계산기</h1>
          <p className="text-sm text-neutral-500 mt-1 leading-relaxed">
            투루카·쏘카의 주행요금을 구간별로 계산해 드립니다.<br />
            주행요금 외 시간요금·보험료는 포함되지 않습니다.
          </p>
        </header>
        <Calculator />
      </div>
    </main>
  )
}

export default App
