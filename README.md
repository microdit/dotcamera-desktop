# AtomOppa-DotCamera

웹캠 영상을 도트 패턴 필터로 실시간 변환하여 보여주는 macOS 데스크톱 애플리케이션

## 주요 기능

- 🎥 웹캠 실시간 영상 캡처
- ✨ 도트 패턴 필터 적용 (SwissGL/WebGL2)
- ⚡ 실시간 렌더링 (60fps)
- 🖥️ Electron 기반 데스크톱 앱

## screenshot

![DotCamera Preview](images/preview.png)

## 사용 방법

### 사전 요구사항

- macOS 10.15 이상
- Node.js 16 이상

### 설치

1. Releases 페이지에서 최신 버전을 다운로드
2. `DotCamera-x.x.x.dmg` 파일을 열기
3. `Applications` 폴더로 이동

### 개발 모드로 실행

```bash
npm install
npm start
```

### 빌드

```bash
./build.sh
```

## 프로젝트 구조

```
AtomOppa-DotCamera/
├── electron_main.js        # Electron 메인 프로세스
├── dotcamera.html        # 렌더러 (UI + 필터)
├── swissgl.js           # WebGL2 라이브러리
├── package.json        # 빌드 설정
├── build.sh           # 빌드 스크립트
├── build/           # entitlements
│   └── entitlements.mac.plist
├── dist/            # 빌드 결과물
└── Docs/           # 문서
```

## 빌드 설정

| 항목 | 내용 |
|------|------|
| 빌드 도구 | electron-builder |
| 플랫폼 | macOS (dmg) |
| 앱 ID | com.atom.dotcamera |

## 기술 스택

- **프론트엔드**: HTML5, JavaScript, SwissGL (WebGL2)
- **백엔드**: Electron 41.x
- **빌드도구**: electron-builder

## 자주 발생하는 문제

### 웹캠이 인식되지 않는 경우

시스템 설정 → 카메라에서 DotCamera 앱을 허용해 주세요.

### 화면이 검은색으로 표시되는 경우

```bash
# 빌드 정리 후 재설치
rm -rf node_modules dist
npm install
./build.sh
```

## 라이선스

MIT License

## 관련 링크

- GitHub: https://github.com/microdit/dotcamera-desktop
- 이슈: https://github.com/microdit/dotcamera-desktop/issues