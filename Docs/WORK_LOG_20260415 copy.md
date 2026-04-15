# 작업 로그 - WORK_LOG_20260415

@>-- microdit
**날짜**: 2026-04-15
**버전**: v1.5

---

## 1. 작업 개요

| 구분 | 내용 |
|------|------|
| **프로젝트명** | DotCamera |
| **작업 유형** | 버그 수정 (카메라 권한) |
| **현재 버전** | v1.0.7 |
| **작업지시서 버전** | v1.5 |

---

## 2. 오늘의 작업 내용

### 2.1上午 작업 (09:00 - 12:00)

- [x] 프로젝트 구조 파악
- [x] 오류 분석 (INVALID_ENUM, NotReadableError)
- [x] swissgl.js 수정 (depth 텍스처 필터 설정)
- [x] 자체 검수

### 2.2下午 작업 (13:00 - 18:00)

- [x] package.json 빌드 설정 수정 (extendInfo 위치)
- [x] entitlements.mac.plist 수정 (cs.allow-jit 추가)
- [x] electron_main.js 수정 (systemPreferences 권한 요청)
- [x] 빌드 완료 및 테스트
- [x] 보고서 작성

---

## 3. 변경된 파일 목록

| 파일명 | 상태 | 비고 |
|------|------|------|
| electron_main.js | 수정됨 | systemPreferences 추가 |
| dotcamera.html | 수정됨 | 재시도 로직 추가 |
| swissgl.js | 수정됨 | depth 텍스처 처리 |
| package.json | 수정됨 | extendInfo 위치 수정 |
| build/entitlements.mac.plist | 생성됨 | JIT 권한 추가 |
| dist/*.dmg | 생성됨 | v1.0.7 |

---

## 4. 발견된 문제점 및 해결

| 구분 | 상세 | 해결책 |
|------|------|--------|
| **INVALID_ENUM** | depth 텍스처 필터 오류 | 조건부 설정 건너뛰기 |
| **NotReadableError** | 카메라 미활성화 | systemPreferences.askForMediaAccess |
| **extendInfo 오류** | 위치 잘못 | mac 내부로 이동 |
| **entitlements** | JIT 비활성화 | cs.allow-jit로 변경 |

---

## 5. 최종 상태

- [x] 웹캠 영상 정상 표시
- [x] 도트 필터 정상 작동
- [x] DMG 설치 후 카메라 권한 요청
- [x] macOS 설정에 DotCamera 표시

---

*updated: 2026-04-15 (v1.5)*