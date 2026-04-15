#!/bin/bash

# DotCamera 빌드 스크립트
# 버전 자동 증가 및 DMG 빌드

# 현재 디렉토리
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

# 현재 버전 읽기
CURRENT_VERSION=$(node -p "require('./package.json').version")

echo "=== DotCamera 빌드 스크립트 ==="
echo "현재 버전: $current_version"

# 버전 파싱
MAJOR=$(echo $CURRENT_VERSION | cut -d. -f1)
MINOR=$(echo $CURRENT_VERSION | cut -d. -f2)
PATCH=$(echo $CURRENT_VERSION | cut -d. -f3)

# 패치 버전 1 증가
PATCH=$((PATCH + 1))
NEW_VERSION="$MAJOR.$MINOR.$PATCH"

echo "새 버전: $NEW_VERSION"

# package.json 버전 업데이트
node -e "
const fs = require('fs');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
pkg.version = '$NEW_VERSION';
fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2) + '\n');
"

echo "package.json 업데이트 완료"

# 빌드 실행
echo "DMG 빌드 시작..."
npm run build

# 결과 확인
if [ -f "$SCRIPT_DIR/dist/DotCamera-$NEW_VERSION.dmg" ]; then
    echo "=== 빌드 성공 ==="
    echo "생성된 파일: dist/DotCamera-$NEW_VERSION.dmg"
    ls -lh "$SCRIPT_DIR/dist/DotCamera-$NEW_VERSION.dmg"
else
    echo "오류: 빌드된 파일을 찾을 수 없습니다."
    exit 1
fi

echo "=== 완료 ==="