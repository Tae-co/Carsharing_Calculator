# Step 4: turuka-calculator

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `CLAUDE.md`
- `docs/ARCHITECTURE.md`
- `docs/PRD.md`
- `docs/UI_GUIDE.md`
- `src/types/index.ts`
- `src/lib/turuka.ts`
- `src/components/FeeBreakdown.tsx`

## 작업

`src/components/TurukaCalculator.tsx`를 생성하라.

### 상태

```ts
const [distanceKm, setDistanceKm] = useState<number | "">("")
```

### 계산 결과 파생

`distanceKm`이 양의 정수일 때만 `calcTuruka(distanceKm)`를 호출해 결과를 파생한다. 별도 `useState`로 결과를 저장하지 않는다 — 렌더 시점에 계산한다:

```ts
const result = typeof distanceKm === "number" && distanceKm > 0
  ? calcTuruka(distanceKm)
  : null
```

### 렌더링 요구사항

#### 거리 입력 필드

```
<label>주행거리</label>
<input
  type="number"
  inputMode="numeric"
  min="1"
  placeholder="예: 120"
  value={distanceKm}
  onChange={...}
/>
<span>km</span>
```

- `value`가 빈 문자열이면 입력 필드가 비어 있어야 한다
- 입력값을 숫자로 파싱해 `setDistanceKm`으로 업데이트한다
- 빈 값이 되면 `setDistanceKm("")`으로 초기화한다

#### 결과 표시

- `result`가 `null`이면: 힌트 문구 "주행거리를 입력하면 요금이 계산됩니다." 표시, `FeeBreakdown` 미렌더링
- `result`가 있으면: `<FeeBreakdown result={result} isElectric={false} distanceKm={distanceKm as number} />` 렌더링

#### 투루카 요금 구조 안내 (선택사항이지만 권장)

사용자가 요금 구조를 이해할 수 있도록 구간 정보를 표시하면 좋다:
- "1 ~ 50km: 260원/km"
- "51 ~ 100km: 250원/km"  
- "101km ~: 230원/km"

`TURUKA_TIERS` 상수를 import해 동적으로 렌더링하라.

#### 스타일

Tailwind CSS 사용. 입력 섹션과 결과 섹션을 시각적으로 구분하라.

### 시맨틱 HTML

- 전체를 `<section>` 태그로 감싸라
- 입력 필드에 `<label htmlFor=...>` 연결

## Acceptance Criteria

```bash
npm run build   # TypeScript 컴파일 에러 없음
npm test        # 기존 테스트 통과 유지
```

## 검증 절차

1. `npm run build` 실행
2. `npm test` 실행해 기존 테스트 통과 확인
3. 아키텍처 체크리스트:
   - 계산 로직이 `calcTuruka` 호출로만 이루어지는가? (컴포넌트 내 직접 계산 없음)
   - `result`가 `useState`가 아닌 렌더 시점 파생값인가?
4. 결과에 따라 `phases/0-mvp/index.json`의 step 4를 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "TurukaCalculator.tsx 구현 완료 — 거리 입력, calcTuruka 호출, FeeBreakdown 연결"`
   - 실패 → `"status": "error"`, `"error_message": "구체적 에러"`

## 금지사항

- 컴포넌트 내부에서 직접 구간 계산 로직을 작성하지 마라. 반드시 `calcTuruka()`를 사용한다.
- 결과를 `useState`로 관리하지 마라. 렌더 시점에 계산(파생)한다.
- `Calculator.tsx`, `SocarCalculator.tsx`, `App.tsx`를 생성하거나 수정하지 마라.
