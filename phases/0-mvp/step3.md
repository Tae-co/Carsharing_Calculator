# Step 3: fee-breakdown

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `CLAUDE.md`
- `docs/ARCHITECTURE.md`
- `docs/PRD.md`
- `docs/UI_GUIDE.md`
- `src/types/index.ts`
- `src/lib/format.ts`

## 작업

`src/components/FeeBreakdown.tsx`를 생성하라. 이 컴포넌트는 계산 결과를 표시하는 **순수 표시 컴포넌트**다. 상태(state)를 가지지 않는다.

### Props 타입

```ts
interface Props {
  result: FeeResult
  isElectric: boolean
  distanceKm: number
}
```

### 렌더링 요구사항

#### 구간 내역 테이블

`result.segments` 배열을 순회해 각 구간을 행으로 렌더링한다.

테이블 헤더: `구간 | 거리 | 단가 | 소계`

각 행 표시:
- **구간**: `segment.label` (예: "1 ~ 50km", "전 구간")
- **거리**: `segment.distance`km
- **단가**: `segment.isFree`이면 "무료", 아니면 `formatKRW(segment.ratePerKm)` + "/km" 표시. formatKRW에서 "원"을 떼고 "원/km"로 표시하거나, 단가는 숫자+"/km"로 표시해도 된다. 예: "260원/km"
- **소계**: `segment.isFree`이면 "무료", 아니면 `formatKRW(segment.subtotal)`

#### 합계 행

테이블 하단 또는 별도 섹션에 합계를 표시한다:
- 레이블: "합계"
- 금액: `formatKRW(result.total)`

#### 탄소중립포인트 배너 (전기차 전용)

`isElectric === true`일 때만 렌더링한다:

```
최대 {distanceKm × 100}원 포인트 적립 가능 (연간 최대 70,000원)
```

숫자는 천단위 콤마 포함 (formatKRW 활용). 예: distanceKm=80이면 "최대 8,000원 포인트 적립 가능 (연간 최대 70,000원)"

#### 스타일

Tailwind CSS를 사용한다. 기본적인 가독성을 갖추면 된다:
- 테이블: `w-full`, 헤더 배경색, 행 구분선
- 합계: bold, 텍스트 강조
- 탄소중립 배너: 녹색 계열 배경, 둥근 모서리

### 시맨틱 HTML

- 테이블은 `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` 사용
- 탄소중립 배너는 `<aside>` 또는 `<div role="note">` 사용
- `aria-live="polite"` 속성을 결과 컨테이너에 추가해 스크린리더가 결과 변경을 감지하도록 한다

## Acceptance Criteria

```bash
npm run build   # TypeScript 컴파일 에러 없음
npm test        # 기존 테스트 통과 유지 (새 테스트 작성 불필요)
```

## 검증 절차

1. `npm run build` 실행해 타입 오류 없음 확인
2. `npm test` 실행해 기존 테스트 깨지지 않음 확인
3. 아키텍처 체크리스트:
   - `FeeBreakdown.tsx`에 `useState`, `useEffect` 등 상태 훅이 없는가?
   - 계산 로직이 없는가? (표시만 담당)
   - `import type`을 사용했는가?
4. 결과에 따라 `phases/0-mvp/index.json`의 step 3을 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "FeeBreakdown.tsx 구현 완료 — 구간 내역 테이블, 합계, 전기차 탄소중립 배너 렌더링"`
   - 실패 → `"status": "error"`, `"error_message": "구체적 에러"`

## 금지사항

- 이 컴포넌트에 `useState`, `useEffect` 등 상태 훅을 사용하지 마라. 순수 표시 컴포넌트다.
- 계산 로직(요금 계산, 구간 분기 등)을 이 파일에 작성하지 마라. 모든 계산은 `src/lib/`에서 수행된다.
- `TurukaCalculator.tsx`, `SocarCalculator.tsx`, `Calculator.tsx`, `App.tsx`를 생성하거나 수정하지 마라.
