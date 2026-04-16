# Architecture Decision Records

## 철학
MVP 속도 최우선. 외부 의존성 최소화. 순수 계산기이므로 서버·DB 불필요. 작동하는 최소 구현을 선택하되, 요금 계산 정확도는 타협하지 않는다.

---

### ADR-001: Vite + React 선택
**결정**: Vite + React 18 + TypeScript strict + Tailwind CSS v3  
**이유**: 순수 클라이언트 계산기에 Next.js는 오버스펙. Vite는 빌드가 빠르고 설정이 단순하며 SPA에 최적화되어 있음. SEO는 `index.html`의 정적 메타태그 + `public/sitemap.xml` + `public/robots.txt`로 처리 가능. 단일 페이지 앱이므로 SSR·SSG 불필요.  
**트레이드오프**: Next.js의 메타태그 API(`metadata`)나 `sitemap.ts` 자동 생성 기능을 사용할 수 없어 SEO 파일을 직접 작성해야 함. 단, 단일 페이지 앱이므로 sitemap은 URL 1개뿐이라 관리 부담 없음.

---

### ADR-002: Vitest 테스트 프레임워크 선택
**결정**: Vitest + @testing-library/react  
**이유**: Vite 환경과 네이티브 통합. 별도 트랜스파일 설정 없이 바로 사용 가능. Jest 호환 API 제공으로 마이그레이션 부담 없음. ESM 네이티브 지원.  
**트레이드오프**: Jest보다 생태계가 작으나, 계산 로직 단위 테스트 수준에서는 차이 없음.  
**적용**: `npm test` = `vitest run`, `npm run test:watch` = `vitest`, `npm run test:coverage` = `vitest run --coverage`

---

### ADR-003: 쏘카 요금을 사용자 직접 입력 방식으로 처리
**결정**: 쏘카 차종 드롭다운·하드코딩 대신, 사용자가 쏘카 앱에서 단가를 확인하고 직접 입력한다.  
**이유**:
- 쏘카 공개 API 없음. 차종·쏘카존·시기에 따라 단가가 달라져 외부에서 조회 불가.
- 차종 데이터를 하드코딩하면 요금 변경 시 재배포 필요, 차종 목록 유지 부담 발생.
- 사용자 직접 입력 방식은 모든 차종·모든 쏘카존에 대응 가능하며 항상 최신 요금이 반영됨.

**트레이드오프**: 사용자가 쏘카 앱을 열어 단가를 확인하고 입력해야 하는 추가 단계가 생김. 단, 어차피 예약 전 요금을 확인하는 과정이므로 허용 범위 내.

---

### ADR-004: 투루카 요금 하드코딩
**결정**: 투루카 구간 요금을 `src/lib/turuka.ts`의 `TURUKA_TIERS` 상수로 하드코딩  
**이유**: 투루카 요금은 전국 동일하고 공개된 고정값(260/250/230원). 사용자가 매번 입력할 필요 없음.  
**트레이드오프**: 요금 변경 시 코드 수정 + 재배포 필요. 변경 빈도가 낮으므로 수용 가능.

---

### ADR-005: 쏘카 요금을 판별 유니온 타입으로 모델링
**결정**: `SocarRates = SocarTieredRates | SocarElectricRates` 판별 유니온 사용  
**이유**: 전기차는 단일 `ratePerKm`, 일반 차종은 3개 구간 단가로 계산 방식이 근본적으로 다름. `isElectric` 필드로 TypeScript type narrowing 적용 → 컴파일 타임에 분기 오류 감지 가능.  
**트레이드오프**: 타입 정의가 다소 복잡해지나, 안전성 우선.

---

### ADR-006: 계산 로직을 순수 함수로 분리
**결정**: 계산 로직을 `src/lib/turuka.ts`, `src/lib/socar.ts`의 순수 함수로만 작성  
**이유**: UI와 비즈니스 로직 분리. 순수 함수는 단위 테스트 작성이 쉬움. 요금 계산 정확도가 앱의 핵심 가치.  
**트레이드오프**: 없음.

---

### ADR-007: 전역 상태 관리 라이브러리 미사용
**결정**: 상태는 각 컴포넌트의 `useState`로만 관리  
**이유**: 서비스 간 공유 상태 없음. 단순 흐름이므로 Redux·Zustand 불필요.  
**트레이드오프**: 없음.

---

### ADR-008: SEO — 정적 파일 방식
**결정**: 메타태그는 `index.html`에 직접 작성, sitemap·robots는 `public/` 폴더에 정적 파일로 관리  
**이유**: Vite SPA는 SSR이 없으므로 Next.js의 `metadata` API를 사용할 수 없음. 단일 페이지 앱이고 URL이 1개이므로 정적 파일로 충분히 SEO 처리 가능. 별도 라이브러리(react-helmet 등) 불필요.  
**트레이드오프**: 메타태그 변경 시 `index.html`을 직접 수정해야 함. 페이지가 늘어나면 react-helmet-async 도입 검토.

---

### ADR-009: Vercel 배포
**결정**: Vercel 무료 플랜에 배포  
**이유**: Vite 빌드 결과(`dist/`)를 정적 파일로 호스팅. Vercel은 빌드·배포·HTTPS를 자동 처리하며 Vite와 즉시 연동됨.  
**트레이드오프**: Vercel 의존성. `dist/` 폴더 자체는 어떤 정적 호스팅 서비스에도 올릴 수 있음 (Netlify, GitHub Pages 등).
