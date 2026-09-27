import path from 'path';
import { BrowserWindow, ipcMain } from 'electron';

export type StartupGameMode = 'main' | 'timeline';

export type StartupSplash = {
  splash: BrowserWindow;
  choice: Promise<StartupGameMode>;
};

export function createStartupSplash(): StartupSplash {
  const splash = new BrowserWindow({
    width: 1024,
    height: 720,
    show: false,
    resizable: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    title: 'Waddle Forever',
    webPreferences: {
      preload: path.join(__dirname, 'splash-preload.js')
    }
  });

  void splash.loadFile(path.join(__dirname, 'splash.html'));
  splash.webContents.once('did-finish-load', () => splash.show());

  const choice = new Promise<StartupGameMode>((resolve) => {
    const selectMode = (_event: Electron.IpcMainEvent, mode: StartupGameMode) => {
      cleanup();
      resolve(mode === 'main' ? 'main' : 'timeline');
    };

    const cleanup = () => {
      ipcMain.removeListener('select-startup-mode', selectMode);
    };

    ipcMain.once('select-startup-mode', selectMode);
    splash.once('closed', () => {
      cleanup();
      resolve('timeline');
    });
  });

  return { splash, choice };
}
