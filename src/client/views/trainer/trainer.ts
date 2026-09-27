import { BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getPopupCreator } from "@client/popups";
import { createCommands } from "../commands/commands";

export const createTrainer = getPopupCreator('trainer', [
  'trainer-get-data',
  'trainer-run-command',
  'trainer-open-commands'
], (mainWindow, settings, server, wins) => {
  const trainerWindow = new BrowserWindow({
    width: 640,
    height: 720,
    minWidth: 560,
    minHeight: 620,
    title: "Penguin Trainer",
    webPreferences: {
      preload: path.join(__dirname, 'trainer-preload.js')
    },
    parent: mainWindow
  });

  trainerWindow.setMenu(null);
  trainerWindow.loadFile(path.join(__dirname, 'trainer.html'));

  const sendTrainerData = () => {
    trainerWindow.webContents.send('trainer-data', server.getTrainerData());
  };

  trainerWindow.webContents.on('did-finish-load', sendTrainerData);

  ipcMain.on('trainer-get-data', sendTrainerData);

  ipcMain.on('trainer-run-command', (_, arg) => {
    const { id, command } = arg;
    if (typeof id !== 'number' || typeof command !== 'string') {
      return;
    }

    const commandMatch = command.match(/(\w+)(.*)/);
    if (commandMatch !== null) {
      const name = commandMatch[1];
      const argString = commandMatch[2].trim();
      server.runCommand(id, name, argString === '' ? [] : argString.split(/\s+/));
    }
  });

  ipcMain.on('trainer-open-commands', () => {
    createCommands(mainWindow, wins, settings, server);
  });

  return trainerWindow;
});
