import { app, BrowserWindow, ipcMain } from 'electron';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..');

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL'];
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron');
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist');

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST;

let win: BrowserWindow | null;

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    title: "Nags 'N' Dogs Lite Bot",
    icon: path.join(process.env.VITE_PUBLIC || '', 'icon.ico'), // Fixed line
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
    },
    titleBarStyle: 'default',
    show: false,
  });

  // Show window when ready to prevent visual flash
  win.once('ready-to-show', () => {
    win?.show();
  });

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'));
  }
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
    win = null;
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.whenReady().then(() => {
  createWindow();
});

// IPC handlers for future API integration
ipcMain.handle('get-app-version', () => {
  return app.getVersion();
});

// Mock API endpoints for Phase 1
ipcMain.handle('api:get-account-info', async () => {
  // TODO: Phase 2 - Replace with real Betfair API call
  return {
    accountId: 'mock-account-123',
    balance: 1234.56,
    exposure: 0.00,
    currency: 'GBP',
    status: 'ACTIVE'
  };
});

ipcMain.handle('api:get-connection-status', async () => {
  // TODO: Phase 2 - Replace with real API connection check
  return {
    connected: Math.random() > 0.2, // 80% chance of being connected
    lastUpdate: new Date().toISOString(),
    latency: Math.floor(Math.random() * 100) + 50
  };
});