# 아이디어 금고 대시보드

Notion 아이디어 데이터베이스를 실시간으로 시각화하는 대시보드입니다.

## 배포 방법 (Netlify)

### 1단계 — GitHub에 업로드
1. GitHub 계정 만들기 (없으면)
2. 새 repository 생성
3. 이 폴더 전체를 업로드

### 2단계 — Netlify 연결
1. https://netlify.com 접속 → 로그인
2. "Add new site" → "Import an existing project"
3. GitHub repository 선택

### 3단계 — 환경변수 설정 (중요!)
Netlify 대시보드 → Site settings → Environment variables → Add variable

| 변수명 | 값 |
|---|---|
| NOTION_KEY | secret_xxx... (Notion Integration 키) |
| NOTION_DB_ID | Notion DB ID (URL에서 복사) |

### 4단계 — Notion DB에 Integration 연결
1. Notion 아이디어 금고 페이지 열기
2. 우측 상단 ··· → Connections → 본인 Integration 추가

### 5단계 — Notion에 embed 삽입
1. Notion 페이지에서 `/embed` 입력
2. 배포된 Netlify URL 붙여넣기
3. 완료!

## 구매자 설정 안내
구매자도 위 1~5단계를 동일하게 진행하면 됩니다.
각자 본인의 Notion API 키와 DB ID를 입력해야 본인 데이터가 표시됩니다.
