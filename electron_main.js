const { app, BrowserWindow, session, systemPreferences } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('enable-features', 'ScreenCaptureKit,Screenshooter');
app.commandLine.appendSwitch('enable-media-stream');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('disable-http-cache');

const checkAndRequestCameraPermission = async () => {
  const status = systemPreferences.getMediaAccessStatus('camera');
  console.log('[Main] Camera permission status:', status);
  
  if (status !== 'granted') {
    try {
      const result = await systemPreferences.askForMediaAccess('camera');
      console.log('[Main] Camera permission requested:', result);
    } catch (e) {
      console.error('[Main] Camera permission error:', e.message);
    }
  }
};

const allowMediaDevices = () => {
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    console.log('[Main] Permission Request:', permission);
    if (permission === 'media' || permission === 'camera' || permission === 'microphone') {
      callback(true);
    } else {
      callback(false);
    }
  });
  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    console.log('[Main] Permission Check:', permission);
    return true;
  });
};

async function createWindow() {
  allowMediaDevices();
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'DotCamera v1.0.5',
    backgroundColor: '#000000', // 검은 화면 방지를 위한 배경색 지정
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false, // 로컬 파일 접근 허용
      sandbox: false,
      backgroundThrottling: false
    }
  });

  // 개발자 도구 강제 열기 (가장 먼저)
  win.webContents.openDevTools({ mode: 'right' });

  const htmlPath = path.join(__dirname, 'dotcamera.html');
  win.loadFile(htmlPath).then(() => {
    console.log('[Main] File loaded successfully:', htmlPath);
  }).catch(err => {
    console.error('[Main] Failed to load file:', err);
  });

  // 렌더러 프로세스 종료 감지 로그 (핵심 디버깅)
  win.webContents.on('render-process-gone', (event, details) => {
    console.error(`[Main] Renderer process gone! Reason: ${details.reason}, ExitCode: ${details.exitCode}`);
  });

  win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`[Main] Failed to load: ${errorCode} - ${errorDescription}`);
  });

  console.log('[Main] App starting...');
}

app.whenReady().then(async () => {
  await checkAndRequestCameraPermission();
  createWindow();
  
  app.on('activate', async () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      await checkAndRequestCameraPermission();
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
