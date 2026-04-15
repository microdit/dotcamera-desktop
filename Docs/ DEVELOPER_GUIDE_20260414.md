# SwissGL 개발자 가이드

**날짜**: 2026-04-14
**프로젝트**: SwissGL
**버전**: 1.0 (DotCamera v1.0.6)

---

## 1. 개발 환경 설정

### 1.1 필수 요구사항
| 구분 | 최소사양 |
|------|----------|
| **OS** | macOS, Windows, Linux |
| **브라우저** | WebGL2 지원 브라우저 (Chrome 56+, Firefox 52+, Safari 15+) |
| **Node.js** | 18+ (선택사항) |
| **Python** | 3.7+ (로컬 서버용) |

### 1.2 프로젝트 클론
```bash
git clone https://github.com/google/swissgl.git
cd swissgl
```

### 1.3 의존성 설치
```bash
# 선택적 - 로컬 서버용
npm install
# 또는
pip install http.server
```

---

## 2. 프로젝트 구조

```
swissgl/
├── swissgl.js          # 메인 라이브러리
├── swissgl.mjs         # ES Module
├── index.html          # 메인 페이지
├── electron_main.js    # Electron 메인 프로세스
├── dotcamera.html      # DotCamera 메인 UI
├── demo/               # 데모 코드
│   ├── main.js         # 데모 메인
│   ├── ParticleLife.js
│   ├── *.js
│   └── style.css
├── docs/               # 문서
│   ├── API.md
│   ├── CHANGELOG.md
│   ├── *_guide*.md
│   └── WORK_LOG_*.md
└── package.json
```

---

## 3. 개발 가이드라인

### 3.1 새로운 데모 추가
1. `demo/` 폴더에 새 JS 파일 생성
2. `main.js`에 데모 등록
3. 데모 이미지 캡처 및 저장

### 3.2 코드 스타일
```javascript
// 좋은 예
const glsl = SwissGL(canvas);
glsl({
    t: time,
    VP: 'XY * 0.5, 0, 1',
    FP: 'UV, 0.5, 1'
});

// 나쁜 예 - 불필요한 공백
const glsl = SwissGL( canvas );
glsl( { t: time, VP: 'XY * 0.5, 0, 1', FP: 'UV, 0.5, 1' } );
```

### 3.3 셰이더 작성 규칙
- **Vertex Shader**: `VOut`에 위치 할당
- **Fragment Shader**: `FOut`에 색상 할당
- 유니oform은 `params` 객체에 추가

### 3.4 디버깅
```javascript
// 브라우저 콘솔
glsl({ ... });
// shader 오류 확인
console.log(glsl.lastError);
```

---

## 4. Electron 개발 가이드

### 4.1 메인 프로세스 설정 (electron_main.js)
Electron 앱에서 카메라 및 로컬 리소스 접근을 위해 다음과 같은 설정이 필요합니다:

- **권한 핸들러**: `session.defaultSession.setPermissionCheckHandler` 및 `setPermissionRequestHandler`를 통해 'camera', 'microphone', 'media' 허용.
- **WebPreferences**:
  - `nodeIntegration: true`
  - `contextIsolation: false`
- **디버깅**: 개발 단계에서는 `mainWindow.webContents.openDevTools()`를 사용하여 시작 시 개발자 도구를 엽니다.

### 4.2 렌더러 이슈 해결 (dotcamera.html)
- **에러 트래킹**: `window.onerror`를 사용하여 런타임 에러를 화면에 직접 표시하는 오버레이 구현.
- **비디오 상태 체크**: `video.readyState`가 `HAVE_ENOUGH_DATA` (4)가 될 때까지 대기하여 검은 화면 방지.

---

## 5. 빌드 및 배포

### 5.1 로컬 테스트
```bash
# Electron 실행
npm start

# Python 서버 (고정 포트 3000)
python3 -m http.server 3000
```

### 5.2 패키징 (Production Build)
```bash
# macOS DMG 빌드
npm run build
# 결과물: dist/DotCamera-1.0.6.dmg
```

---

## 6. 일반적인 문제

### 6.1 흰 화면 (White Screen)
**원인**: 스크립트 에러 또는 리소스 로드 실패.
**해결**: `dotcamera.html`의 에러 오버레이를 확인하고, `electron_main.js`의 `nodeIntegration` 설정을 점검하십시오.

### 6.2 카메라 미활성화
**원인**: Electron 보안 정책으로 인한 권한 거부.
**해결**: `electron_main.js`에 명시적인 권한 핸들러가 포함되어 있는지 확인하십시오.

---

## 7. 기여 방법
(이하 생략)

---

*updated: 2026-04-14 @>-- microdit*
