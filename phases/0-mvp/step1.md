# Step 1: core-types

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `CLAUDE.md`
- `docs/ARCHITECTURE.md`
- `docs/PRD.md`

## 작업

`src/types/index.ts`를 생성하라. 이 파일은 프로젝트 전체에서 사용하는 공통 타입을 정의한다.

포함해야 할 타입:

### ServiceType

```ts
export type ServiceType = "turuka" | "socar"
```

### FeeSegment

구간별 요금 내역 1행을 나타낸다.

```ts
export interface FeeSegment {
  label: string       // 예: "1 ~ 50km", "0 ~ 30km", "전 구간"
  distance: number    // 실제 적용된 km 수
  ratePerKm: number   // km당 단가 (0이면 무료 구간)
  subtotal: number    // distance × ratePerKm
  isFree: boolean     // ratePerKm === 0 일 때 true
}
```

### FeeResult

계산 결과 전체를 나타낸다.

```ts
export interface FeeResult {
  segments: FeeSegment[]   // 적용된 구간만 포함 (거리 미달 구간 제외)
  total: number
}
```

### SocarTieredRates

쏘카 일반 차종 요금 입력값.

```ts
export interface SocarTieredRates {
  isElectric: false
  upTo30: number      // 0~30km 구간 단가
  upTo100: number     // 30~100km 구간 단가
  over100: number     // 100km~ 구간 단가
}
```

### SocarElectricRates

쏘카 전기차 요금 입력값.

```ts
export interface SocarElectricRates {
  isElectric: true
  ratePerKm: number   // 전 구간 동일 단가 (0이면 무료)
}
```

### SocarRates

```ts
export type SocarRates = SocarTieredRates | SocarElectricRates
```

## Acceptance Criteria

```bash
npm run build   # TypeScript strict 모드에서 컴파일 에러 없음
```

## 검증 절차

1. `npm run build`를 실행해 타입 오류가 없는지 확인한다.
2. 아키텍처 체크리스트:
   - `src/types/index.ts` 파일이 존재하는가?
   - 모든 타입이 `export`되어 있는가?
   - TypeScript strict 모드에서 오류가 없는가?
3. 결과에 따라 `phases/0-mvp/index.json`의 step 1을 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "src/types/index.ts 생성 — FeeSegment, FeeResult, SocarTieredRates, SocarElectricRates, SocarRates, ServiceType 타입 정의 완료"`
   - 실패 → `"status": "error"`, `"error_message": "구체적 에러"`

## 금지사항

- `src/types/index.ts` 외 다른 파일을 생성하거나 수정하지 마라. 이 step은 타입 정의만 담당한다.
- 타입에 구현 로직(함수, 클래스 메서드)을 포함하지 마라. 순수 타입 선언만 허용한다.
