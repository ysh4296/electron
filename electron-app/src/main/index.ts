import { app, shell, BrowserWindow, ipcMain, globalShortcut } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';

let mainWindow: BrowserWindow | null = null;

function createWindow(): void {
  // Create the browser window.
  // automaticaly sets window width & height to maximum available size
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    // show: false,
    autoHideMenuBar: true,
    alwaysOnTop: true,
    transparent: true,
    // ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: true,
    },
    focusable: false,
    skipTaskbar: true
  });

  mainWindow.on('ready-to-show', () => {
    mainWindow?.setFullScreen(true);
    mainWindow?.show();
  });

  mainWindow?.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL']);
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron');

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });

  // IPC test
  ipcMain.on('ping', () => console.log('pong'));

  ipcMain.on('app-quit', () => {
    // 안전하게 종료
    try {
      app.quit();
    } catch {
      try {
        app.exit(0);
      } catch {
        /* ignore */
      }
    }
  });

  createWindow();

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.on('set-clickable', (_event, isClickable) => {
    if (!mainWindow) return

    // 기본적으로 클릭 통과 유지
    mainWindow.setIgnoreMouseEvents(!isClickable)
  });

  // F1 키로 설정창 토글 신호를 렌더러로 보냄
  globalShortcut.register('F1', () => {
    if (mainWindow) {
      mainWindow.webContents.send('toggle-settings');
    }
  });


  // 🔹 ESC 키로 앱 종료
  globalShortcut.register('Escape', () => {
    try {
      app.quit()
    } catch {
      try {
        app.exit(0)
      } catch {
        /* ignore */
      }
    }
  })

  app.on('will-quit', () => {
    globalShortcut.unregisterAll();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
