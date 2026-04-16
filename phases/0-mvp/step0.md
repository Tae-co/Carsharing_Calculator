# Step 0: project-setup

## 읽어야 할 파일

먼저 아래 파일들을 읽고 프로젝트의 아키텍처와 설계 의도를 파악하라:

- `CLAUDE.md`
- `docs/ARCHITECTURE.md`
- `docs/ADR.md`

## 작업

현재 디렉토리(`/`)에는 `CLAUDE.md`, `docs/`, `scripts/`, `phases/`만 존재한다.
이 디렉토리 안에 Vite + React 18 + TypeScript SPA 프로젝트를 스캐폴딩하라.

### 1. Vite 프로젝트 생성

루트 디렉토리에서 아래 명령을 실행하라. 이미 파일이 있으므로 `--` 옵션으로 현재 디렉토리에 생성한다:

```bash
npm create vite@latest . -- --template react-ts
```

대화형 프롬프트가 나오면 현재 디렉토리 덮어쓰기를 허용한다(`y` 또는 엔터).

### 2. 의존성 설치

```bash
npm install
npm install -D tailwindcss@3 postcss autoprefixer
npm install -D vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom @vitejs/plugin-react
npx tailwindcss init -p
```

### 3. Tailwind 설정 (`tailwind.config.js`)

`tailwind.config.js`를 아래처럼 수정하라:

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 4. `src/index.css` — Tailwind 지시어 추가

파일 최상단에 아래 세 줄을 추가하라 (기존 내용은 전부 교체):

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 5. `vite.config.ts` — 테스트 설정 추가

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test-setup.ts'],
  },
})
```

### 6. `src/test-setup.ts` 생성

```ts
import '@testing-library/jest-dom'
```

### 7. `package.json` scripts 업데이트

`scripts` 섹션에 아래를 추가/수정하라:

```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage"
```

### 8. `tsconfig.json` — strict mode 확인

`compilerOptions`에 아래가 있는지 확인하고 없으면 추가하라:

```json
"strict": true
```

### 9. 디렉토리 구조 생성

아래 디렉토리와 빈 파일(`.gitkeep` 또는 임시 파일)을 생성하라:

```
src/components/
src/lib/__tests__/
src/types/
public/
```

### 10. `index.html` — SEO 메타태그

`index.html`을 아래처럼 교체하라:

```html
<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <title>카셰어링 주행요금 계산기 | 투루카·쏘카 구간별 요금 계산</title>
    <meta name="description"
      content="투루카·쏘카 주행요금을 구간별로 즉시 계산해 드립니다. 거리와 km당 단가를 입력하면 구간별 내역과 합계를 바로 확인할 수 있어요." />

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

### 11. `public/robots.txt` 생성

```
User-agent: *
Allow: /
```

### 12. `public/sitemap.xml` 생성

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://carsharing-fee.vercel.app/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>
```

### 13. `scripts/check.sh` — React 섹션 활성화

`scripts/check.sh`를 아래처럼 교체하라:

```bash
#!/usr/bin/env bash
set -e

npm run lint 2>&1
npm run build 2>&1
npm test 2>&1
```

### 14. `src/App.tsx` 임시 내용으로 교체

나중 step에서 완성되므로 지금은 컴파일만 통과하는 최소 구조로 교체하라:

```tsx
function App() {
  return <div>카셰어링 주행요금 계산기</div>
}

export default App
```

### 15. `.gitignore` 확인

`node_modules`, `dist`, `.env`가 포함되어 있는지 확인하라.

## Acceptance Criteria

```bash
npm run build   # TypeScript 컴파일 에러 없음, dist/ 생성됨
npm run lint    # ESLint 오류 없음 (경고는 허용)
npm test        # 테스트 파일 없어도 "No test files found" 또는 0 passed로 정상 종료
```

## 검증 절차

1. 위 AC 커맨드를 순서대로 실행한다.
2. 아키텍처 체크리스트:
   - `src/components/`, `src/lib/__tests__/`, `src/types/` 디렉토리가 존재하는가?
   - `index.html`에 `<title>카셰어링 주행요금 계산기 | 투루카·쏘카 구간별 요금 계산</title>`이 있는가?
   - `public/robots.txt`, `public/sitemap.xml`이 존재하는가?
3. 결과에 따라 `phases/0-mvp/index.json`의 step 0을 업데이트한다:
   - 성공 → `"status": "completed"`, `"summary": "Vite+React+TypeScript+Tailwind+Vitest 프로젝트 셋업 완료, SEO 파일 생성"`
   - 실패 → `"status": "error"`, `"error_message": "구체적 에러"`

## 금지사항

- Next.js, Create React App 등 다른 프레임워크를 사용하지 마라. 반드시 Vite를 사용한다.
- Tailwind CSS v4를 설치하지 마라. 반드시 v3(`tailwindcss@3`)를 사용한다. v4는 설정 방식이 다르다.
- `src/lib/`, `src/components/`, `src/types/` 안에 실제 구현 파일을 만들지 마라. 이 step은 인프라 설정만 담당한다.
- 기존 `CLAUDE.md`, `docs/`, `scripts/`, `phases/` 디렉토리를 삭제하거나 이동하지 마라.
