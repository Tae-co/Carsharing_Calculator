# Step 2: calc-logic

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `CLAUDE.md`
- `docs/ARCHITECTURE.md`
- `docs/PRD.md`
- `src/types/index.ts` (step 1에서 생성됨)

## 작업

**TDD 방식으로 진행한다. 테스트 파일을 먼저 작성하고, 테스트가 실패하는 것을 확인한 뒤 구현 파일을 작성한다.**

### 1. `src/lib/__tests__/turuka.test.ts` 생성 (먼저 작성)

아래 모든 케이스를 포함하라:

| 입력 | 예상 결과 |
|------|----------|
| 0km | `segments: []`, `total: 0` |
| 1km | 구간 1개 (1~50km), total: 260 |
| 50km | 구간 1개 (1~50km), total: 13000 |
| 51km | 구간 2개, total: 13250 |
| 80km | 구간 2개, total: 20500 |
| 100km | 구간 2개, total: 25500 |
| 101km | 구간 3개, total: 25730 |
| 120km | 구간 3개, total: 30100 |

각 케이스에서 `segments`의 `label`, `distance`, `ratePerKm`, `subtotal`, `isFree` 값도 검증하라.

### 2. `src/lib/__tests__/socar.test.ts` 생성 (먼저 작성)

아래 모든 케이스를 포함하라:

| 시나리오 | 입력 | 예상 결과 |
|---------|------|----------|
| 일반 1구간 | 20km, upTo30=210, upTo100=200, over100=180 | total: 4200 |
| 일반 경계 30km | 30km, upTo30=210, upTo100=200, over100=180 | total: 6300, 구간 1개 |
| 일반 31km | 31km, upTo30=210, upTo100=200, over100=180 | total: 6500, 구간 2개 |
| 일반 100km | 100km, upTo30=210, upTo100=200, over100=180 | total: 20300, 구간 2개 |
| 일반 3구간 | 123km, upTo30=210, upTo100=200, over100=180 | total: 24440, 구간 3개 |
| 전기차 | 80km, ratePerKm=150 | total: 12000, 구간 1개, label: "전 구간" |
| 전기차 무료 | 80km, ratePerKm=0 | total: 0, isFree: true |
| 0km (일반) | 0km | `segments: []`, `total: 0` |
| 0km (전기차) | 0km | `segments: []`, `total: 0` |
| 무료 구간 포함 | 30km, upTo30=0, upTo100=200, over100=180 | 1구간 isFree: true, subtotal: 0 |

### 3. `src/lib/turuka.ts` 구현

시그니처:

```ts
import type { FeeResult, FeeSegment } from '../types'

export const TURUKA_TIERS: Array<{
  label: string
  from: number
  upTo: number    // 마지막 구간은 Infinity
  rate: number
}>

export function calcTuruka(distanceKm: number): FeeResult
```

구현 규칙:
- `distanceKm <= 0`이면 `{ segments: [], total: 0 }` 반환
- 구간 경계: 50km는 1~50 구간(260원) 포함, 51km부터 다음 구간
- 각 구간의 `distance` = `min(남은 거리, 해당 구간 용량)`. 0이면 해당 행 생성 안 함
- `isFree`는 항상 `false` (투루카는 무료 구간 없음)
- `subtotal = distance × rate`
- 요금 구조: 1~50km(260원), 51~100km(250원), 101km~(230원)

### 4. `src/lib/socar.ts` 구현

시그니처:

```ts
import type { FeeResult, FeeSegment, SocarRates } from '../types'

export function calcSocar(rates: SocarRates, distanceKm: number): FeeResult
```

구현 규칙:
- `distanceKm <= 0`이면 `{ segments: [], total: 0 }` 반환
- `isElectric: true` → 단일 행 `{ label: "전 구간", distance: distanceKm, ratePerKm, subtotal, isFree: ratePerKm === 0 }`
- `isElectric: false` → 구간 경계 30km / 100km 기준 누적 합산
  - 0~30km 구간: label "0 ~ 30km"
  - 30~100km 구간: label "30 ~ 100km"
  - 100km~ 구간: label "100km ~"
  - 30km는 "0~30km" 구간에 포함, 31km부터 "30~100km" 구간
  - 적용 거리 0인 구간은 segments에 포함하지 않음
- `ratePerKm === 0`인 구간은 `isFree: true`, `subtotal: 0`

### 5. `src/lib/format.ts` 구현

시그니처:

```ts
export function formatKRW(amount: number): string
```

- `0` → `"0원"`
- `20500` → `"20,500원"`
- `1000000` → `"1,000,000원"`

## Acceptance Criteria

```bash
npm test        # 모든 테스트 통과 (turuka.test.ts, socar.test.ts)
npm run build   # TypeScript 컴파일 에러 없음
```

## 검증 절차

1. 테스트 파일 먼저 작성 → `npm test`로 실패 확인 → 구현 파일 작성 → `npm test`로 전부 통과 확인
2. `npm run build`로 타입 오류 없음 확인
3. 아키텍처 체크리스트:
   - 계산 로직이 `src/lib/` 안에만 있는가? (컴포넌트 안에 계산 로직 없음)
   - `import type`을 사용했는가?
4. 결과에 따라 `phases/0-mvp/index.json`의 step 2를 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "turuka.ts/socar.ts/format.ts 순수 함수 구현 완료, 테스트 전부 통과"`
   - 실패 → `"status": "error"`, `"error_message": "구체적 에러"`

## 금지사항

- 테스트 없이 구현 파일을 먼저 작성하지 마라. 반드시 TDD 순서를 지킨다.
- 컴포넌트 파일(`src/components/`)을 생성하거나 수정하지 마라.
- `src/App.tsx`, `src/main.tsx`를 수정하지 마라.
- 계산 로직을 타입 파일(`src/types/`)에 넣지 마라.
