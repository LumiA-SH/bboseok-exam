# 글로그를 제출합니다.

2026 뽀석함 과거시험 제출작 · LumiA

React CRA / JavaScript / CSS / HashRouter. 서버와 DB 없이 localStorage로 진행 기록을 저장하는 인터랙티브 글로그입니다. 공개 게시물에는 아래 스포일러를 넣지 마세요.

## 작업 위치와 실행

기존 프로젝트 `E:\Workspace\bboseok-exam\bboseok-exam`에서 직접 작업합니다. 임시 작업과 백업도 E 드라이브를 사용합니다. 구조 변경 전 원본은 `E:\Workspace\bboseok-exam\refactor-backup-20261126`에 보관했습니다.

```bash
npm install --cache E:/Workspace/bboseok-exam/.npm-cache
npm start
npm test -- --watchAll=false --runInBand
npm run build
```

Node.js 20 또는 22를 사용합니다. `npm run deploy`는 GitHub Pages 배포 명령입니다. 원격 저장소 설정이 필요하며 이번 작업에서는 배포하지 않았습니다. `homepage: "."`와 HashRouter를 유지하므로 하위 경로 배포와 해시 주소 새로고침을 지원합니다.

## 구조

```text
src/
  App.js                         Router, Provider, ExamRoutes 조립
  index.js                       React 진입점과 스타일 로드
  context/ExamContext.js         공유 상태 제공 및 저장
  hooks/useExam.js               Context 접근
  routes/ExamRoutes.js           기존 URL, 방문 기록, 탭 제목
  routes/Guard.js                진행 단계 접근 제한
  components/common/            Layout, Button, Next, Hint, ProgressBar
  components/exam/              PuzzleInput
  components/achievement/       AchievementList
  pages/                        페이지별 JSX, 임시 상태, 상호작용
  data/                         achievements, dialogues, puzzles, endings
  utils/game.js                 상태 갱신, 업적, 정답 정규화, 성적 계산
  utils/storage.js              v1 저장 데이터 읽기, 검증, 저장
  styles/variables.css          공통 폰트 변수
  styles/base.css               기본 문서 레이아웃과 공통 색상 변수
  styles/themes.css             행정 시스템 및 야간 테마 변수
  styles/components/            컨트롤, 업적 스타일
  styles/pages/                 시스템, 엔딩, 성적표 스타일
  styles/responsive.css         모바일 및 모션 감소 설정
  styles/common.css             CSS 진입점
```

기존 직인과 화면별 대사 출력은 해당 페이지에서 관리합니다. 사용하지 않는 Modal, AchievementToast 등은 형식적으로 추가하지 않았습니다. 업적은 기존대로 성적표에서 공개합니다.

## 페이지와 기존 기능

| URL | 파일 | 기능 |
| --- | --- | --- |
| `/` | Introduction | 제출문, 직인 반복 클릭, 복구 후 추가 공문 |
| `/question` | Definition | 글의 정의 선택, 제작자 신뢰 선택 |
| `/error` | ErrorPage | 조회 오류, 재시도·도움말 대사, 담당자 링크 |
| `/office` | Administrator | 복복복 격려, 보상 입력, 숨은 문서 링크 |
| `/recovery` | Recovery | 가짜 로딩, 99% 막대, 탭 제목 단서 |
| `/returned` | Returned | 첫 문서 재방문 안내 |
| `/night` | Night | 조명 전환, 숨은 분류 입력 |
| `/conclusion` | Conclusion | 합격증 안내 |
| `/end/1`, `/end/2`, `/end/3` | FakeEnding | 가짜 엔딩 3종 및 이의 제기 |
| `/final` | TrueEnding | 진짜 제출문, **아 졸잼ㅋ** |
| `/report` | ReportCard | 성적표, PNG 저장, 업적 목록, 초기화 |
| `/archive` | Archive | 기록보관소, 차, 추가 공문 복사 |
| `/author` | Author | 제작자 업무일지 |
| `/certificate` | Certificate | 쓸데없는 확인서 |
| 그 외 | NotFound | 잘못된 주소 전용 화면 |

17개 등록 URL, 24종 업적, 기존 접근 단계와 숨은 경로, 콘텐츠 및 디자인을 유지했습니다. `public/index.html`의 기록보관소 HTML 주석도 유지했습니다. 새 라이브러리는 추가하지 않았습니다.

## 상태와 확장

- 공유 상태: 진행 단계, 방문 URL, 신뢰·정의 선택, 상호작용 횟수, 단서, 업적, 완료 여부와 시간.
- 임시 상태: 입력 중인 퍼즐 답, 열린 힌트·이의 제기, 현재 조명, 가짜 로딩 단계, 성적표 이름 및 발급 상태는 해당 페이지에서 관리합니다.
- `bboseok-exam-v1` 키를 유지합니다. 기존 데이터는 기본값과 병합하고 중복·미등록 업적, 잘못된 횟수·진행도·타임스탬프는 정리합니다. JSON 오류나 저장 차단 때문에 플레이가 중단되지 않습니다.
- 가짜 엔딩 도달 기록은 기존 `fake1`, `fake2`, `fake3` 업적으로 유지합니다. 진짜 엔딩은 `completed`, `finishedAt`, `final`로 기록합니다.
- 반복 대사를 확장할 때 `data/dialogues.js`의 횟수별 항목을 수정합니다. 정답은 `data/puzzles.js`, 업적은 `data/achievements.js`, 가짜 엔딩은 `data/endings.js`에서 관리합니다.
- 새 페이지는 `pages`에 추가하고 `ExamRoutes`에 등록합니다. 페이지의 입력·이벤트는 App.js에 넣지 않습니다. 여러 페이지에서 실제로 공유하는 UI만 컴포넌트로 분리합니다.
- 초기화는 이 작품의 저장 상태만 초기값으로 바꿉니다. 다른 사이트나 앱의 localStorage는 지우지 않습니다.

## 제작자용 스포일러

정상 경로: 첫 문서 → 정의와 신뢰 선택 → 오류 화면 담당자 이름 클릭 → 복복복 입력 → 99% 막대 클릭 → 첫 문서 돌아가기 → 추가 공문의 야간 열람실 → 조명 끄기 → `개소리` 입력 → 합격증 → 가짜 엔딩 3회(하단 이의 제기 펼치기) → 진짜 글 → 성적표.

숨은 콘텐츠: 직인 20회, 신뢰 양쪽 선택, 재시도 5회, 도움말 3회, 복복복 10/20회, 오답 5회, 기록보관소, 잘못된 주소, 조명 재전환, 확인서, 업무일지, 새로고침 등. 업적은 중복 획득하지 않습니다. 첫 화면으로 돌아가도 누적 기록을 유지합니다.

모든 필수 퍼즐은 클릭·터치 및 입력으로 해결할 수 있습니다. 개발자 도구나 hover는 필수가 아닙니다.

## 수정 사항 및 검증 (2026-11-26)

App.js의 페이지 구현·데이터·이벤트를 분리했습니다. 기존 ESLint 설정 누락과 테스트 환경 설정 오류를 보완하고, effect에서 사용하는 공유 액션의 참조를 안정화하여 의존성 검사 무시 주석을 제거했습니다. 정의 선택의 저장·복원, 저장 데이터 정합성 검사, 진행률 접근성 속성을 보강했습니다.

| 항목 | 결과와 범위 |
| --- | --- |
| npm install | E 원본 프로젝트에서 성공, 설치 캐시는 E 지정 |
| npm start | E 원본 프로젝트에서 컴파일 성공 및 브라우저 표시 확인 |
| npm run build | E 원본 프로젝트에서 성공 |
| 자동 테스트 | 2개 테스트 파일, 5개 테스트 통과 |
| 정상 경로 | 실제 브라우저 390×844 화면에서 첫 문서부터 진짜 엔딩·성적표까지 진행 |
| 가짜 엔딩 | 3종 각각 이의 제기 후 추가 진행 확인 |
| 반복 클릭 | 브라우저 재시도·복복복, 테스트 직인·도움말·오답 임계값 확인 |
| 숨은 페이지 | 브라우저 기록보관소·차, 테스트 업무일지·확인서·404 확인 |
| 업적 중복 방지 | reducer 테스트 및 성적표 재방문 확인 |
| 새로고침 | 브라우저 정의·신뢰 선택 및 성적표 기록 유지 확인 |
| 이전 페이지 재방문 | 추가 공문 표시와 야간 열람실 진입 확인 |
| 뒤로/앞으로 | 브라우저 진짜 엔딩 ↔ 성적표 이동 확인 |
| 성적표 | 실제 생성·표시 확인 |
| PNG 다운로드 | Blob URL 방식으로 수정 후 실제 다운로드 성공. 데스크톱 1088×1258, 390px 모바일 화면 626×1230 PNG를 파일로 열어 한글·배경·테두리·긴 이름 줄바꿈과 잘림 없음 확인 |
| 기록 초기화 | 브라우저 확인 대화상자 승인 후 첫 문서 복귀 및 공문·완료 표시 제거, 자동 테스트 저장 상태 초기화 확인 |
| 모바일 | 390px 뷰포트에서 필수 경로 및 첫 문서·야간 화면 확인. 실제 iOS/Android 기기는 미검증 |
| 콘솔 | 확인한 브라우저에서 error 없음. React Router v7 전환 안내 warning 2종 존재 |
| GitHub Pages | 해시·상대 경로 및 빌드 확인. 실제 배포는 미실시 |

CRA 개발 서버의 기존 webpack middleware 사용 중단 경고가 출력됩니다. 프레임워크와 의존성 버전은 요청대로 유지했습니다. PNG 검증 파일은 E:\Workspace\bboseok-exam\png-verification에 보관했습니다. 실제 iOS/Android 기기 및 Safari의 다운로드 동작은 별도 확인이 필요합니다.

## PNG 저장 후속 수정 (2026-11-26)

- ReportCard: data URL 다운로드를 Blob URL로 변경하고 다운로드 링크를 문서에 연결한 뒤 클릭·제거합니다. URL은 60초 후 해제합니다.
- 글꼴 준비 후 이미지를 생성하며 PNG 생성 결과가 없는 경우 기존 오류 안내를 표시합니다.
- 검증 중 App.js의 return 다음 줄 JSX로 인한 빈 화면도 발견하여 return 괄호로 수정했습니다.
- 실제 다운로드 이벤트와 파일 디코딩, 데스크톱·모바일 크기 이미지 육안 확인 완료. 콘솔 error 없음. CRA 빌드와 기존 테스트 5개 통과.
