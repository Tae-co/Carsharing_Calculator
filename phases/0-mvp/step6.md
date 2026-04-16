# Step 6: app-shell

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `CLAUDE.md`
- `docs/ARCHITECTURE.md`
- `docs/PRD.md`
- `docs/UI_GUIDE.md`
- `src/types/index.ts`
- `src/components/TurukaCalculator.tsx`
- `src/components/SocarCalculator.tsx`
- `src/components/FeeBreakdown.tsx`

## 작업

`Calculator.tsx`, `App.tsx`, `main.tsx`를 완성해 앱을 최종 조립하라.

### 1. `src/components/Calculator.tsx` 생성

탭 상태를 관리하고 `TurukaCalculator` 또는 `SocarCalculator`를 조건부 렌더링한다.

```ts
const [activeTab, setActiveTab] = useState<ServiceType>("turuka")
```

#### 탭 전환

- 상단에 "투루카" / "쏘카" 탭 2개
- 탭 클릭 시 `setActiveTab`으로 전환
- 탭 전환 시 하위 컴포넌트가 언마운트되어 상태 자동 초기화된다 — 별도 초기화 로직 불필요

#### 조건부 렌더링

```tsx
{activeTab === "turuka" ? <TurukaCalculator /> : <SocarCalculator />}
```

#### 탭 스타일

- 활성 탭: 진한 배경 또는 하단 밑줄로 구분
- 비활성 탭: 연한 스타일
- `role="tablist"`, `role="tab"`, `aria-selected` 속성 사용

### 2. `src/App.tsx` 완성

```tsx
import Calculator from './components/Calculator'

function App() {
  return (
    <main className="...">
      <header>
        <h1>카셰어링 주행요금 계산기</h1>
        <p>투루카·쏘카의 주행요금을 구간별로 계산해 드립니다.</p>
        <p>주행요금 외 시간요금·보험료는 포함되지 않습니다.</p>
      </header>
      <Calculator />
    </main>
  )
}

export default App
```

- `<main>` 태그 사용 (시맨틱 HTML)
- `<h1>` 태그는 페이지에 1개만 사용
- 전체 레이아웃: 최대 너비 제한(예: `max-w-2xl mx-auto`), 적절한 패딩

### 3. `src/main.tsx` 확인

기존 Vite 스캐폴드 코드가 `App`을 마운트하고 있으면 그대로 두되, `src/index.css`를 import하고 있는지 확인한다:

```tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
```

### 4. 하단 주의 문구

`App.tsx` 또는 `Calculator.tsx` 하단에 추가:

```
* 주행요금만 포함. 시간요금·보험료·주차비는 별도입니다.
```

## Acceptance Criteria

```bash
npm run build   # TypeScript 컴파일 에러 없음, dist/ 생성
npm test        # 모든 테스트 통과
npm run lint    # ESLint 오류 없음
```

## 검증 절차

1. `npm run build` 실행 — 성공해야 한다
2. `npm test` 실행 — 기존 모든 테스트 통과
3. `npm run lint` 실행 — 오류 없음
4. 아키텍처 최종 체크리스트:
   - `<main>` 태그로 콘텐츠가 감싸져 있는가?
   - `<h1>` 태그가 페이지에 1개인가?
   - 탭 전환 시 하위 컴포넌트가 언마운트(key 또는 조건부 렌더링)되어 상태 초기화되는가?
   - `Calculator.tsx`에서만 탭 상태를 관리하는가?
   - `role="tablist"`, `role="tab"` 접근성 속성이 있는가?
5. 결과에 따라 `phases/0-mvp/index.json`의 step 6을 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "Calculator.tsx + App.tsx + main.tsx 조립 완료, 탭 전환 + 전체 앱 빌드 성공"`
   - 실패 → `"status": "error"`, `"error_message": "구체적 에러"`

## 금지사항

- `Calculator.tsx` 이외의 컴포넌트에 탭 상태를 두지 마라.
- 계산 로직을 `App.tsx`나 `Calculator.tsx`에 넣지 마라. 모든 계산은 `lib/`에서 수행된다.
- `App.tsx`에서 `<h1>`을 2개 이상 사용하지 마라.
