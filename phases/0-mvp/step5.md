# Step 5: socar-calculator

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `CLAUDE.md`
- `docs/ARCHITECTURE.md`
- `docs/PRD.md`
- `docs/UI_GUIDE.md`
- `src/types/index.ts`
- `src/lib/socar.ts`
- `src/components/FeeBreakdown.tsx`

## 작업

`src/components/SocarCalculator.tsx`를 생성하라.

### 상태

```ts
const [isElectric, setIsElectric] = useState(false)
const [upTo30, setUpTo30] = useState<number | "">("")
const [upTo100, setUpTo100] = useState<number | "">("")
const [over100, setOver100] = useState<number | "">("")
const [electricRate, setElectricRate] = useState<number | "">("")
const [distanceKm, setDistanceKm] = useState<number | "">("")
```

### 전기차 토글 전환 시 초기화

`isElectric`이 변경될 때 단가 필드와 거리 필드를 모두 초기화한다:

```ts
const handleElectricToggle = (checked: boolean) => {
  setIsElectric(checked)
  setUpTo30("")
  setUpTo100("")
  setOver100("")
  setElectricRate("")
  setDistanceKm("")
}
```

### 계산 결과 파생

입력값이 모두 유효할 때만 `calcSocar`를 호출한다. 별도 `useState`로 결과를 저장하지 않는다:

```ts
// 일반 차종: 세 단가 모두 숫자(0 포함)이고 거리 > 0일 때
// 전기차: electricRate가 숫자(0 포함)이고 거리 > 0일 때
const result = ...calcSocar(rates, distanceKm)... 또는 null
```

단가 0원은 유효한 입력이다(무료 구간). 빈 문자열(`""`)만 무효다.

### 렌더링 요구사항

#### 전기차 토글

```
<label>
  <input type="checkbox" checked={isElectric} onChange={...} />
  전기차
</label>
```

#### 일반 차종 단가 입력 (isElectric === false일 때 표시)

세 개의 단가 입력 필드:
- "0 ~ 30km 단가" — `upTo30`
- "30 ~ 100km 단가" — `upTo100`
- "100km ~ 단가" — `over100`

각 필드:
```
<label>{구간명}</label>
<input type="number" inputMode="numeric" min="0" placeholder="예: 210" />
<span>원/km</span>
```

쏘카 앱에서 단가를 확인하는 방법 안내 문구:
"쏘카 앱 → 차량 선택 → 요금 안내 탭에서 단가를 확인하세요."

#### 전기차 단가 입력 (isElectric === true일 때 표시)

단일 입력 필드:
- "전 구간 단가" — `electricRate`
- `min="0"`, `placeholder="예: 150"`
- "원/km" suffix

#### 거리 입력 (항상 표시)

```
<label>주행거리</label>
<input type="number" inputMode="numeric" min="1" placeholder="예: 120" />
<span>km</span>
```

#### 결과 표시

- 단가 미입력 상태(빈 문자열)에서 거리를 입력한 경우: "단가를 먼저 입력해주세요." 안내 표시
- 모든 필수 입력이 완료되고 거리 > 0이면: `<FeeBreakdown result={result} isElectric={isElectric} distanceKm={distanceKm as number} />` 렌더링
- 거리 미입력 또는 0이면: "주행거리를 입력하면 요금이 계산됩니다." 힌트 표시

#### 스타일

Tailwind CSS 사용. 입력 그룹을 카드 또는 패널 형태로 구성하라.

### 시맨틱 HTML

- 전체를 `<section>` 태그로 감싸라
- 모든 입력 필드에 `<label htmlFor=...>` 연결
- 전기차 토글은 `<label>`로 체크박스를 감싸거나 `htmlFor`로 연결

## Acceptance Criteria

```bash
npm run build   # TypeScript 컴파일 에러 없음
npm test        # 기존 테스트 통과 유지
```

## 검증 절차

1. `npm run build` 실행
2. `npm test` 실행
3. 아키텍처 체크리스트:
   - 계산 로직이 `calcSocar` 호출로만 이루어지는가?
   - `result`가 `useState`가 아닌 렌더 시점 파생값인가?
   - `isElectric` 전환 시 단가·거리 초기화가 이루어지는가?
4. 결과에 따라 `phases/0-mvp/index.json`의 step 5를 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "SocarCalculator.tsx 구현 완료 — 단가 3개 입력, 전기차 토글, calcSocar 호출, FeeBreakdown 연결"`
   - 실패 → `"status": "error"`, `"error_message": "구체적 에러"`

## 금지사항

- 컴포넌트 내부에서 직접 구간 계산 로직을 작성하지 마라. 반드시 `calcSocar()`를 사용한다.
- 결과를 `useState`로 관리하지 마라.
- 쏘카 차종 데이터를 하드코딩하지 마라. 사용자가 단가를 직접 입력한다.
- `Calculator.tsx`, `TurukaCalculator.tsx`, `App.tsx`를 생성하거나 수정하지 마라.
