# 아키텍처

## 디렉토리 구조
```
/
├── index.html                  # 앱 진입점 — SEO 메타태그 직접 작성
├── public/
│   ├── sitemap.xml             # 정적 sitemap (URL 1개)
│   └── robots.txt              # 크롤러 허용 설정
├── src/
│   ├── main.tsx                # React 앱 마운트
│   ├── App.tsx                 # 루트 컴포넌트 — Calculator 렌더링
│   ├── components/
│   │   ├── Calculator.tsx       # 탭 상태 관리, TurukaCalculator/SocarCalculator 조건부 렌더링
│   │   ├── TurukaCalculator.tsx # 거리 입력 상태, calcTuruka 호출
│   │   ├── SocarCalculator.tsx  # 단가 입력 + 전기차 토글 + 거리 입력, calcSocar 호출
│   │   └── FeeBreakdown.tsx     # 구간 내역 테이블 + 합계 + 탄소중립 배너 (순수 표시)
│   ├── lib/
│   │   ├── turuka.ts           # 투루카 계산 순수 함수
│   │   ├── socar.ts            # 쏘카 계산 순수 함수
│   │   ├── format.ts           # formatKRW() — 천단위 콤마
│   │   └── __tests__/
│   │       ├── turuka.test.ts
│   │       └── socar.test.ts
│   └── types/
│       └── index.ts            # 공통 타입 정의
└── vite.config.ts
```

---

## 컴포넌트 역할 상세

### `App.tsx`
- `<main>` 태그로 콘텐츠 감싸기 (시맨틱 HTML)
- 페이지 헤더(`<h1>`) + `Calculator` 렌더링

### `Calculator.tsx`
- 서비스 탭(`"turuka" | "socar"`) 상태를 `useState`로 관리
- 탭 전환 시 `TurukaCalculator` 또는 `SocarCalculator`를 조건부 렌더링
- 탭 전환 시 하위 컴포넌트 언마운트 → 상태 자동 초기화

### `TurukaCalculator.tsx`
- 거리 입력 상태(`distanceKm: number | ""`) 관리
- `distanceKm > 0`일 때만 `calcTuruka(distanceKm)` 호출 → `FeeBreakdown`에 전달
- 입력 전·0이면 `FeeBreakdown` 미렌더링, 힌트 문구 표시

### `SocarCalculator.tsx`
- 상태:
  ```ts
  isElectric: boolean
  rates: {
    upTo30: number | ""
    upTo100: number | ""
    over100: number | ""
  }
  electricRate: number | ""
  distanceKm: number | ""
  ```
- 모든 필수 입력값이 유효한 경우에만 `calcSocar(rates, distanceKm)` 호출
- `isElectric` 전환 시 단가 필드·결과 초기화

### `FeeBreakdown.tsx`
- props: `result: FeeResult`, `isElectric: boolean`, `distanceKm: number`
- 구간별 내역 테이블 + 합계 렌더링
- `isElectric === true`이면 탄소중립포인트 배너 렌더링
- 상태 없음, 순수 표시 컴포넌트

---

## 패턴
- Vite + React SPA. 서버 사이드 렌더링 없음.
- 모든 컴포넌트는 클라이언트에서 실행. `"use client"` 지시어 불필요.
- 계산 로직은 `lib/`의 순수 함수로만. 컴포넌트 내 계산 금지.
- 타입 전용 import는 `import type` 사용.

---

## 데이터 흐름
```
사용자 입력 (거리, 단가, 전기차 여부)
  → Calculator (탭 상태)
    → TurukaCalculator / SocarCalculator (입력 상태)
      → lib/turuka.ts 또는 lib/socar.ts (순수 함수, 동기)
        → FeeResult 반환
          → FeeBreakdown 렌더링
```

외부 네트워크 호출 없음. 모든 계산은 클라이언트에서 동기적으로 완결.

---

## 상태 관리
- 서비스 탭: `Calculator`의 `useState`
- 투루카 거리: `TurukaCalculator`의 `useState`
- 쏘카 단가 + 전기차 토글 + 거리: `SocarCalculator`의 `useState`
- 계산 결과: 입력값으로부터 렌더 시점에 파생 (별도 상태 없음)
- 전역 상태 라이브러리 미사용

---

## SEO 구현

### `index.html` — 메타태그 직접 작성
```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>카셰어링 주행요금 계산기 | 투루카·쏘카 구간별 요금 계산</title>
    <meta name="description"
      content="투루카·쏘카 주행요금을 구간별로 즉시 계산해 드립니다.
               거리와 km당 단가를 입력하면 구간별 내역과 합계를 바로 확인할 수 있어요." />

    <meta property="og:title" content="카셰어링 주행요금 계산기" />
    <meta property="og:description"
      content="투루카·쏘카 주행요금을 구간별로 즉시 계산해 드립니다." />
    <meta property="og:type" content="website" />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

### `public/robots.txt`
```
User-agent: *
Allow: /
Sitemap: https://{배포-도메인}/sitemap.xml
```

### `public/sitemap.xml`
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://{배포-도메인}/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 시맨틱 HTML 요건
- `App.tsx`에서 `<main>` 태그로 콘텐츠 감싸기
- 페이지 제목은 `<h1>` 태그 사용 (페이지당 1개)
- 계산기 섹션은 `<section>` 태그 사용

---

## 핵심 타입 (`src/types/index.ts`)

```ts
export type ServiceType = "turuka" | "socar"

export interface FeeSegment {
  label: string       // 예: "1 ~ 50km", "전 구간"
  distance: number    // 실제 적용된 km 수
  ratePerKm: number   // km당 단가 (0이면 무료)
  subtotal: number    // distance × ratePerKm
  isFree: boolean     // ratePerKm === 0
}

export interface FeeResult {
  segments: FeeSegment[]   // 적용된 구간만 포함 (거리 미달 구간 제외)
  total: number
}

// 쏘카 일반 차종 요금 입력값
export interface SocarTieredRates {
  isElectric: false
  upTo30: number      // 0~30km 구간 단가
  upTo100: number     // 30~100km 구간 단가
  over100: number     // 100km~ 구간 단가
}

// 쏘카 전기차 요금 입력값
export interface SocarElectricRates {
  isElectric: true
  ratePerKm: number   // 전 구간 동일 단가 (0이면 무료)
}

export type SocarRates = SocarTieredRates | SocarElectricRates
```

---

## 계산 로직 시그니처

### `src/lib/turuka.ts`
```ts
export const TURUKA_TIERS: Array<{
  label: string     // 예: "1 ~ 50km"
  from: number      // 구간 시작 km (inclusive)
  upTo: number      // 구간 끝 km (inclusive). 마지막 구간은 Infinity.
  rate: number      // 원/km
}>

// distanceKm: 양의 정수. 0이면 { segments: [], total: 0 } 반환.
export function calcTuruka(distanceKm: number): FeeResult
```

구현 규칙:
- 50km는 1~50 구간(260원)에 포함. 51km부터 다음 구간.
- 각 구간의 `distance` = `min(남은거리, 구간 최대치)`. 0이면 해당 행 생성 안 함.

### `src/lib/socar.ts`
```ts
// rates: 사용자가 입력한 단가값 (이미 검증된 양수 또는 0)
// distanceKm: 양의 정수. 0이면 { segments: [], total: 0 } 반환.
export function calcSocar(rates: SocarRates, distanceKm: number): FeeResult
```

구현 규칙:
- `isElectric: true` → 단일 행 `{ label: "전 구간", distance: distanceKm, ... }` 생성
- `isElectric: false` → 구간 경계 30km / 100km 기준 누적 합산
- `ratePerKm === 0`인 구간은 `isFree: true`, `subtotal: 0`

### `src/lib/format.ts`
```ts
// 0 → "0원", 20500 → "20,500원"
export function formatKRW(amount: number): string
```

---

## 테스트 전략 (`src/lib/__tests__/`)

### `turuka.test.ts` 필수 케이스
| 입력 | 예상 결과 |
|------|----------|
| 0km | segments=[], total=0 |
| 1km | 1구간, 260원 |
| 50km | 1구간, 13,000원 |
| 51km | 2구간, 13,250원 |
| 80km | 2구간, 20,500원 |
| 100km | 2구간, 25,500원 |
| 101km | 3구간, 25,730원 |
| 120km | 3구간, 30,100원 |

### `socar.test.ts` 필수 케이스
| 시나리오 | 입력 | 예상 결과 |
|---------|------|----------|
| 일반 1구간 | 20km, upTo30=210 | 4,200원 |
| 일반 경계 | 30km, upTo30=210 | 6,300원 |
| 일반 3구간 | 123km, 210/200/180 | 24,440원 |
| 전기차 | 80km, ratePerKm=150 | 12,000원 |
| 전기차 무료 | 80km, ratePerKm=0 | 0원, isFree=true |
| 0km | 0km | segments=[], total=0 |
