# UI 디자인 가이드

## 디자인 원칙
1. **도구처럼 보여야 한다** — 마케팅 랜딩이 아니라 매일 쓰는 계산기. 입력과 결과에만 집중.
2. **숫자가 명확해야 한다** — 구간별 요금 내역과 합계가 한눈에 들어오도록 정렬과 대비 확보.
3. **즉각적인 피드백** — 입력값 변경 즉시 결과 업데이트. 별도 "계산" 버튼 없음.
4. **주행요금만 계산한다는 걸 명확히** — 사용자가 총 이용료로 오해하지 않도록 헤더에서 명시.

---

## AI 슬롭 안티패턴 — 하지 마라
| 금지 사항 | 이유 |
|-----------|------|
| `backdrop-filter: blur()` | glass morphism은 AI 템플릿의 가장 흔한 징후 |
| gradient-text | AI가 만든 SaaS 랜딩의 1번 특징 |
| box-shadow 글로우 애니메이션 | 네온 글로우 = AI 슬롭 |
| 보라/인디고 브랜드 색상 | "AI = 보라색" 클리셰 |
| 모든 카드에 동일한 `rounded-2xl` | 균일한 둥근 모서리는 템플릿 느낌 |
| 배경 gradient orb (`blur-3xl` 원형) | 모든 AI 랜딩 페이지의 장식 |

---

## 색상

### 배경
| 용도 | 값 |
|------|------|
| 페이지 | `#0a0a0a` |
| 카드 | `#141414` |
| 구분선 | `#1f1f1f` |

### 텍스트
| 용도 | 값 |
|------|------|
| 주 텍스트 | `#ffffff` |
| 본문 | `text-neutral-300` |
| 보조 | `text-neutral-400` |
| 비활성 / 안내 | `text-neutral-500` |
| 부연 / 주의 | `text-neutral-600` |

### 포인트 & 시맨틱
| 용도 | 값 |
|------|------|
| 합계 금액 강조 | `#3b82f6` (blue-500) |
| 무료 구간 표시 | `#22c55e` (green-500) |
| 탄소중립포인트 배너 | `bg-green-950`, `border-green-900`, `text-green-400` |
| 에러 | `#ef4444` (red-500) |

---

## 숫자 포맷 규칙
- 모든 숫자는 `tabular-nums` 클래스 적용 — 자릿수가 바뀌어도 레이아웃 안 흔들림.
- 금액(원)은 항상 천단위 콤마. 예: `20,500원`, `0원` → `formatKRW()` 사용.
- km는 콤마 없이 정수. 예: `50km`, `123km`.

---

## 페이지 헤더 영역

탭 위에 고정 표시한다.

```
카셰어링 주행요금 계산기
투루카·쏘카의 주행요금을 구간별로 계산해 드립니다.
주행요금 외 시간요금·보험료는 포함되지 않습니다.
```

```
<h1> 제목:    text-lg font-semibold text-white
     부제목:  text-sm text-neutral-500 mt-1 leading-relaxed (2줄)
     하단 여백: mb-6
```

"주행요금 외 시간요금·보험료는 포함되지 않습니다"는 **필수 문구**다. 생략하지 마라.

---

## 컴포넌트

### 서비스 탭 (투루카 / 쏘카)
```
탭 컨테이너: bg-[#141414] border border-neutral-800 rounded-lg p-1 inline-flex
활성 탭:    bg-white text-black rounded-md px-5 py-1.5 text-sm font-medium transition-colors
비활성 탭:  text-neutral-400 hover:text-neutral-200 px-5 py-1.5 text-sm cursor-pointer transition-colors
aria:       role="tab", aria-selected="true/false"
```

### 카드
```
rounded-lg bg-[#141414] border border-neutral-800 p-6
```

### 입력 필드 — 거리 입력 (km suffix)
```html
<label for="distance" class="block text-sm text-neutral-300 mb-1.5">주행거리</label>
<div class="relative">
  <input id="distance" type="number" min="1" inputmode="numeric"
    placeholder="예: 80"
    class="w-full rounded-lg bg-neutral-900 border border-neutral-800
      px-4 py-3 pr-12 text-white text-sm placeholder:text-neutral-600
      focus:outline-none focus:border-neutral-600 transition-colors
      [appearance:textfield]
      [&::-webkit-outer-spin-button]:appearance-none
      [&::-webkit-inner-spin-button]:appearance-none" />
  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none">km</span>
</div>
```
- `inputmode="numeric"`: 모바일 숫자 키패드 표시 필수
- `placeholder="예: 80"`: 입력 방법 힌트
- 스피너 제거 필수

### 입력 필드 — 단가 입력 (원/km suffix, 쏘카)
```html
<label for="rate-upto30" class="block text-sm text-neutral-300 mb-1.5">0 ~ 30km 단가</label>
<div class="relative">
  <input id="rate-upto30" type="number" min="0" inputmode="numeric"
    placeholder="예: 210"
    class="... pr-16" />
  <span class="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-neutral-500 pointer-events-none">원/km</span>
</div>
```
- suffix가 "원/km"로 더 길어지므로 `pr-16` 사용
- `min="0"`: 무료 구간(0원) 허용
- `placeholder`는 구간 단가의 대략적 범위를 힌트로 줌

### 전기차 토글 (쏘카 전용)
```html
<label class="flex items-center gap-2.5 cursor-pointer">
  <input type="checkbox" class="sr-only" />
  <!-- 커스텀 토글 UI -->
  <div class="w-9 h-5 rounded-full bg-neutral-700 relative transition-colors
    peer-checked:bg-blue-500">
    <div class="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white
      transition-transform peer-checked:translate-x-4" />
  </div>
  <span class="text-sm text-neutral-300">전기차</span>
</label>
```
- 토글 ON: 단가 입력 필드를 3개 → 1개("전 구간 단가")로 전환
- 토글 전환 시 단가 입력값 초기화

### 쏘카 안내 문구 (단가 입력 도움말)
```html
<p class="text-xs text-neutral-600 mt-1">
  쏘카 앱 → 차량 선택 → 요금 안내 탭에서 확인하세요
</p>
```
단가 입력 필드 첫 번째 항목 아래에만 표시한다.

### 구간 요금 내역 테이블
```
테이블 헤더: text-xs text-neutral-500 uppercase tracking-wide pb-2
             컬럼: 구간 / 거리 / 단가 / 소계

데이터 행:
  구간 레이블: text-sm text-neutral-400
  적용 km:    text-sm text-neutral-300 tabular-nums text-right
  단가:       text-sm text-neutral-400 tabular-nums text-right
  소계:       text-sm text-white font-medium tabular-nums text-right

무료 구간 소계: text-sm font-medium text-green-500 text-right ("무료")
```
테이블 헤더 행 필수 — 각 컬럼의 의미를 사용자가 알 수 있어야 한다.

### 합계 표시
```
컨테이너: border-t border-neutral-800 pt-4 mt-2 flex justify-between items-baseline
레이블:   text-sm text-neutral-400  ("합계")
금액:     text-2xl font-semibold text-blue-400 tabular-nums
```

### 탄소중립포인트 배너 (전기차 전용)
```
컨테이너: mt-4 rounded-md bg-green-950 border border-green-900 px-4 py-3 flex items-start gap-2.5
아이콘:   SVG (잎 또는 번개), strokeWidth 1.5, text-green-500, w-4 h-4, mt-0.5, flex-shrink-0
텍스트:   text-sm text-green-400
문구:     "최대 {formatKRW(distanceKm * 100)} 포인트 적립 가능 (연간 최대 70,000원)"
```

### 결과 하단 주의 문구
```
text-xs text-neutral-600 mt-3
"* 주행요금만 포함. 시간요금·보험료·주차비는 별도입니다."
```
결과 내역이 표시될 때 항상 함께 표시한다.

### 빈 상태 힌트
```
컨테이너: py-6 text-center
문구:     text-sm text-neutral-600
```
| 상황 | 힌트 문구 |
|------|----------|
| 투루카 — 거리 미입력 | "주행거리를 입력하면 요금이 계산됩니다" |
| 쏘카 — 단가 미입력 | "쏘카 앱에서 단가를 확인 후 입력해주세요" |
| 쏘카 — 단가 입력 후 거리 미입력 | "주행거리를 입력하면 요금이 계산됩니다" |

빈 상태를 그냥 비워두지 마라.

---

## 레이아웃
- 전체 최대 너비: `max-w-md`
- 수평 중앙 정렬: `mx-auto`
- 상하 여백: `py-12 px-4`
- 섹션 간격: `space-y-5`
- 카드 내부 항목 간격: `space-y-4`
- 모바일: `max-w-md`가 모바일 폭과 유사 → 별도 breakpoint 불필요

---

## 타이포그래피
| 용도 | 스타일 |
|------|--------|
| 페이지 제목 (`<h1>`) | `text-lg font-semibold text-white` |
| 페이지 부제목 | `text-sm text-neutral-500 mt-1 leading-relaxed` |
| 테이블 헤더 | `text-xs font-medium text-neutral-500 uppercase tracking-wider` |
| 입력 레이블 | `text-sm text-neutral-300` |
| 본문 / 내역 행 | `text-sm text-neutral-300` |
| 합계 금액 | `text-2xl font-semibold text-blue-400 tabular-nums` |
| 도움말 / 주의 | `text-xs text-neutral-600` |

---

## 접근성 요건
- 모든 `<input>`에 대응하는 `<label for="...">` 필수
- 탭 전환: `role="tab"` + `aria-selected="true/false"`
- 결과 영역: `aria-live="polite"` — 거리·단가 입력 시 스크린리더가 결과 변경을 읽도록
- 색상만으로 정보 전달 금지 (무료 구간: 색상 + "무료" 텍스트 모두 사용)

---

## 화면 상태별 UI

### 상태 1: 투루카 — 초기
```
카셰어링 주행요금 계산기
투루카·쏘카의 주행요금을 구간별로 계산해 드립니다.
주행요금 외 시간요금·보험료는 포함되지 않습니다.

[탭] ● 투루카  |  쏘카

주행거리
[예: 80_____________] km

주행거리를 입력하면 요금이 계산됩니다
```

### 상태 2: 투루카 — 거리 입력 후 (80km)
```
[탭] ● 투루카  |  쏘카

주행거리
[  80  ] km

구간          거리      단가         소계
1 ~ 50km      50km     260원/km    13,000원
51 ~ 100km    30km     250원/km     7,500원
──────────────────────────────────────────
합계                               20,500원

* 주행요금만 포함. 시간요금·보험료·주차비는 별도입니다.
```

### 상태 3: 쏘카 — 초기 (단가 미입력)
```
[탭]  투루카  |  ● 쏘카

[ ] 전기차

0 ~ 30km 단가
[예: 210____________] 원/km
쏘카 앱 → 차량 선택 → 요금 안내 탭에서 확인하세요

30 ~ 100km 단가
[예: 190____________] 원/km

100km ~ 단가
[예: 170____________] 원/km

주행거리
[예: 80_____________] km

쏘카 앱에서 단가를 확인 후 입력해주세요
```

### 상태 4: 쏘카 — 일반 차종, 단가 + 거리 입력 후
```
[탭]  투루카  |  ● 쏘카

[ ] 전기차

0 ~ 30km 단가    [  210  ] 원/km
30 ~ 100km 단가  [  200  ] 원/km
100km ~ 단가     [  180  ] 원/km

주행거리
[  123  ] km

구간           거리      단가         소계
0 ~ 30km       30km     210원/km     6,300원
30 ~ 100km     70km     200원/km    14,000원
100km ~        23km     180원/km     4,140원
─────────────────────────────────────────────
합계                                24,440원

* 주행요금만 포함. 시간요금·보험료·주차비는 별도입니다.
```

### 상태 5: 쏘카 — 전기차 토글 ON, 단가 + 거리 입력 후
```
[탭]  투루카  |  ● 쏘카

[●] 전기차

전 구간 단가
[  150  ] 원/km

주행거리
[  80  ] km

구간       거리      단가         소계
전 구간    80km     150원/km    12,000원
────────────────────────────────────────
합계                             12,000원

[🌿 최대 8,000원 포인트 적립 가능 (연간 최대 70,000원)]

* 주행요금만 포함. 시간요금·보험료·주차비는 별도입니다.
```

### 상태 6: 쏘카 — 전기차 무료 (단가 0원)
```
전 구간 단가
[  0  ] 원/km

주행거리
[  80  ] km

구간       거리      단가       소계
전 구간    80km     0원/km     무료
──────────────────────────────
합계                            0원

[🌿 최대 8,000원 포인트 적립 가능 (연간 최대 70,000원)]

* 주행요금만 포함. 시간요금·보험료·주차비는 별도입니다.
```

---

## 애니메이션
- 결과 영역 등장: `opacity-0 → opacity-100`, `duration-150 ease-out`
- 전기차 토글 전환: 단가 필드 수 변경 시 layout shift 없도록 고정 높이 또는 `min-h` 적용
- 그 외 모든 애니메이션 금지

---

## 아이콘
- SVG 인라인, `strokeWidth 1.5`
- 아이콘을 둥근 배경 박스로 감싸지 않는다
- 사용처: 탄소중립 배너 아이콘 1곳만
