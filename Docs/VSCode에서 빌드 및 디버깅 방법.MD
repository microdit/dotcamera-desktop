# VSCode에서 빌드 및 디버깅 방법

@>-- microdit
**날짜**: 2026-04-15
**버전**: v1.5

---

## 1. 프로젝트 열기

VSCode에서 다음 폴더를 엽니다:
```
/Volumes/DataDisk/dev/macOS/_OpenCode/AtomOppa-DotCamera
```

---

## 2. 실행 (개발 모드)

### 방법 1: 터미널에서 실행

```bash
cd "/Volumes/DataDisk/dev/macOS/_OpenCode/AtomOppa-DotCamera"
npm start
```

### 방법 2: VSCode 작업으로 실행

1. `Cmd+Shift+P` → "Tasks: Run Task" 입력
2. "Start Electron" 선택

### 방법 3: 디버그로 실행 (브레이크포인트 사용)

1. 왼쪽 사이드바 → `실행 및 디버그` 아이콘 (또는 `Cmd+Shift+D`)
2. "Electron: Start Development" 선택
3. `F5` 키로 실행

---

## 3. 디버깅 (브레이크포인트)

### 브레이크포인트 설정

코드 편집기에서:
- 설정하고 싶은 줄 번호 왼쪽 여백을 클릭
- 또는 코드에 커서를 두고 `F9` 키 입력

### 주요 디버그 위치

| 파일 | 줄 | 용도 |
|------|-----|------|
| electron_main.js | 9-21 | camera 권한 체크 |
| electron_main.js | 38-55 | 윈도우 생성 |
| dotcamera.html | 115-160 | getUserMedia 호출 |
| dotcamera.html | 162-190 | 필터 알고리즘 |

### 디버그 패널 사용

- `왼쪽 사이드바` → `실행 및 디버그`
- `Calls`: 함수 호출 스택
- `Breakpoints`: 설정된 브레이크포인트
- `Variables`: 변수 값 확인
- `Watch`: 표현식 감시

---

## 4. 빌드 (DMG 생성)

### 방법 1: 터미널에서 빌드

```bash
npm run build
```

### 방법 2: VSCode 작업으로 빌드

1. `Cmd+Shift+P` → "Tasks: Run Task" 입력
2. "Build DMG" 선택

### 빌드 결과물

```
dist/DotCamera-1.0.7.dmg
```

---

## 5. 단축키 모음

| 단축키 | 기능 |
|-------|------|
| `F5` | 디버그 시작/계속 |
| `F6` | 디버그 중지 |
| `F9` | 브레이크포인트 설정/해제 |
| `F10` |步 over |
| `F11` | 단계 들어감 |
| `F12` | 단계 나가감 |
| `Cmd+Shift+D` | 디버그视图 열기 |
| `Cmd+Shift+P` | 명령 팔레트 |

---

## 6. 트러블슈팅

### 앱이 실행되지 않을 때

1. `node_modules` 재설치
   ```bash
   rm -rf node_modules
   npm install
   ```

2. development tools 수동 열기
   ```bash
   npm start &
   # Electron 창에서 우클릭 → "요소 검사"
   ```

### 빌드 오류

1. 빌드 로그 확인
   ```bash
   npm run build 2>&1
   ```

2. dist 폴더 정리
   ```bash
   rm -rf dist
   npm run build
   ```

---

## 7. 설정 파일

### .vscode/launch.json

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Electron: Start Development",
      "type": "node",
      "request": "launch",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "args": ["."]
    }
  ]
}
```

### .vscode/tasks.json

```json
{
  "version": "2.0.0",
  "tasks": [
    { "label": "Start Electron", "command": "npm start" },
    { "label": "Build DMG", "command": "npm run build" },
    { "label": "Install Dependencies", "command": "npm install" }
  ]
}
```

---

*작성일: 2026-04-15*
*작업지시서 버전: v1.5*