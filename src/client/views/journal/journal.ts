import path from 'path';
import { BrowserWindow } from 'electron';
import { getPopupCreator } from '@client/popups';
import { SettingsManager } from '@server/settings';
import { WorldServer } from '@server/socket-server/world-server';

export const createJournal = getPopupCreator('journal', [], (mainWindow: BrowserWindow, settings: SettingsManager, server: WorldServer, _wins, windowData) => {
  const journal = new BrowserWindow({
    show: false,
    title: 'Era Journal',
    width: 980,
    height: 720,
    webPreferences: {
      preload: path.join(__dirname, 'journal-preload.js')
    }
  });

  journal.setMenu(null);
  void journal.loadFile(path.join(__dirname, 'journal.html'));

  journal.webContents.on('did-finish-load', async () => {
    const penguinId = typeof windowData === 'number' ? windowData : server.getAllPlayersInfo()[0]?.id;
    const data = await server.getJournalData(penguinId);
    journal.webContents.send('journal-data', data);
    journal.show();
  });

  return journal;
});
