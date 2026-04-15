const { app, BrowserWindow, session, systemPreferences, globalShortcut, ipcMain } = require('electron');
const path = require('path');

app.commandLine.appendSwitch('enable-features', 'ScreenCaptureKit,Screenshooter');
app.commandLine.appendSwitch('enable-media-stream');
app.commandLine.appendSwitch('ignore-gpu-blacklist');
app.commandLine.appendSwitch('disable-http-cache');

let mainWindow = null;
let scaleFactor = 1.0;

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
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    title: 'AtomOppa',
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#000000',
    movable: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      webSecurity: false,
      sandbox: false,
      backgroundThrottling: false
    }
  });

  // DevTools initially hidden
  // mainWindow.webContents.openDevTools({ mode: 'detach' });

  const htmlPath = path.join(__dirname, 'dotcamera.html');
  mainWindow.loadFile(htmlPath).then(() => {
    console.log('[Main] File loaded successfully:', htmlPath);
  }).catch(err => {
    console.error('[Main] Failed to load file:', err);
  });

  mainWindow.webContents.on('render-process-gone', (event, details) => {
    console.error(`[Main] Renderer process gone! Reason: ${details.reason}, ExitCode: ${details.exitCode}`);
  });

  mainWindow.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
    console.error(`[Main] Failed to load: ${errorCode} - ${errorDescription}`);
  });

  // IPC handlers for context menu
  ipcMain.on('window-minimize', () => mainWindow.minimize());
  ipcMain.on('window-maximize', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    } else {
      mainWindow.maximize();
    }
  });
  ipcMain.on('window-close', () => mainWindow.close());

  console.log('[Main] App starting...');
}

function registerShortcuts() {
  globalShortcut.register('CommandOrControl+1', () => {
    if (mainWindow) {
      mainWindow.setFrame(true);
      console.log('[Main] Shortcut: Title bar shown (Cmd+1)');
    }
  });

  globalShortcut.register('CommandOrControl+2', () => {
    if (mainWindow) {
      mainWindow.setFrame(false);
      console.log('[Main] Shortcut: Title bar hidden (Cmd+2)');
    }
  });

  globalShortcut.register('CommandOrControl+5', () => {
    if (mainWindow) {
      const [width, height] = mainWindow.getSize();
      scaleFactor = Math.min(scaleFactor + 0.2, 3.0);
      const newWidth = Math.floor(1280 * scaleFactor);
      const newHeight = Math.floor(800 * scaleFactor);
      mainWindow.setSize(newWidth, newHeight);
      mainWindow.center();
      console.log(`[Main] Shortcut: Window size +20% (${newWidth}x${newHeight})`);
    }
  });

  globalShortcut.register('CommandOrControl+4', () => {
    if (mainWindow) {
      const [width, height] = mainWindow.getSize();
      scaleFactor = Math.max(scaleFactor - 0.2, 0.4);
      const newWidth = Math.floor(1280 * scaleFactor);
      const newHeight = Math.floor(800 * scaleFactor);
      mainWindow.setSize(newWidth, newHeight);
      mainWindow.center();
      console.log(`[Main] Shortcut: Window size -20% (${newWidth}x${newHeight})`);
    }
  });

  console.log('[Main] Shortcuts registered: Cmd+1 (show), Cmd+2 (hide), Cmd+5 (size+), Cmd+4 (size-)');
}

app.whenReady().then(async () => {
  await checkAndRequestCameraPermission();
  createWindow();
  registerShortcuts();
  
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

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});