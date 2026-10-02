import path from 'path';
import fs from 'fs';
import { BrowserWindow, dialog, app } from 'electron';
import { autoUpdater } from 'electron-updater';
import electronIsDev from 'electron-is-dev';
import log from 'electron-log';

const UPDATE_PATH = path.join(process.cwd(), 'tempupdate');

export async function checkUpdates (mainWindow: BrowserWindow): Promise<void> {
  if (fs.existsSync(UPDATE_PATH)) {
    fs.rmdirSync(UPDATE_PATH, { recursive: true })
  }

  if (electronIsDev || !app.isPackaged) {
    return;
  }

  autoUpdater.logger = log;
  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('update-downloaded', (info) => {
    dialog.showMessageBox(mainWindow, {
      buttons: ['Restart Now', 'Later'],
      title: 'Update Ready',
      message: `Waddle Forever ${info.version} has been downloaded. It will be installed when you quit, or press Restart Now to apply it immediately.`,
      defaultId: 0,
      cancelId: 1
    }).then((result) => {
      if (result.response === 0) {
        autoUpdater.quitAndInstall();
      }
    });
  });

  autoUpdater.on('error', (err) => {
    log.error('Auto-update failed:', err);
  });

  try {
    await autoUpdater.checkForUpdates();
  } catch (err) {
    log.error('Update check failed:', err);
  }
}
