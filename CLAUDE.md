# 프로젝트: 카셰어링 주행요금 계산기

## 기술 스택
- Vite + React 18
- TypeScript (strict mode)
- Tailwind CSS v3
- Vitest + @testing-library/react (테스트)

## 아키텍처 규칙
- CRITICAL: 계산 로직은 반드시 `src/lib/`의 순수 함수에만 위치한다. 컴포넌트 내부에 계산 로직을 작성하지 마라.
- CRITICAL: `src/lib/turuka.ts`와 `src/lib/socar.ts`에는 반드시 대응하는 테스트 파일이 존재해야 한다. 테스트 없는 계산 로직 커밋 금지.
- CRITICAL: 쏘카 차종 데이터를 하드코딩하지 마라. 쏘카 요금은 사용자가 직접 입력하는 방식이다.
- 외부 API·네트워크 호출 금지. 모든 계산은 클라이언트에서 정적으로 완결한다.
- 컴포넌트는 `src/components/`, 타입은 `src/types/index.ts`, 계산 로직은 `src/lib/`에 분리한다.
- 타입 전용 import는 `import type`을 사용한다.

## 개발 프로세스
- CRITICAL: `src/lib/`의 새 함수를 구현하기 전에 반드시 해당 테스트 파일을 먼저 작성한다 (TDD). 테스트가 먼저 실패해야 구현을 시작할 수 있다.
- 커밋 메시지는 conventional commits 형식을 따를 것 (feat:, fix:, docs:, refactor:, test:)

## 명령어
```
npm run dev      # Vite 개발 서버 (http://localhost:5173)
npm run build    # 프로덕션 빌드 (dist/)
npm run preview  # 빌드 결과 로컬 프리뷰
npm run lint     # ESLint 검사
npm test         # Vitest 단위 테스트 (1회 실행)
npm run test:watch    # Vitest watch 모드
npm run test:coverage # 커버리지 포함 테스트
```
