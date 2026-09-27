import { BrowserWindow, dialog, Menu, MenuItemConstructorOptions } from "electron";
import { enableOrDisableDiscordRPC, enableOrDisableDiscordRPCLocationTracking } from "./discord";
import { Store } from "./store";
import { loadMain, toggleFullScreen } from "./window";
import { createSettingsWindow } from "./views/settings/settings";
import { GlobalSettings } from "@common/utils";
import { createTimelinePicker } from "./views/timeline/timeline";
import { createJournal } from "./views/journal/journal";
import { createModsWindow } from "./views/mods/mods";
import { SettingsManager } from "@server/settings";
import { createMultiplayerSettings } from "./views/multiplayer/multiplayer";
import { createCommands } from "./views/commands/commands";
import { createTrainer } from "./views/trainer/trainer";
import { Popups } from "./popups";
import { WorldServer } from "@server/socket-server/world-server";

const startMenu = (
  store: Store,
  mainWindow: BrowserWindow,
  globalSettings: GlobalSettings,
  serverSettings: SettingsManager,
  popups: Popups,
  gameServer: WorldServer
) => {
  let wasdMovement = false;
  const lastClick = { x: 640, y: 360 };
  mainWindow.webContents.on('before-input-event', (event, input) => {
    if (input.type === 'mouseDown') {
      const mouse = input as typeof input & { x?: number, y?: number };
      lastClick.x = mouse.x ?? lastClick.x;
      lastClick.y = mouse.y ?? lastClick.y;
      return;
    }
    if (!wasdMovement || input.type !== 'keyDown') {
      return;
    }

    const key = input.key.toLowerCase();
    const delta = key === 'w' ? [0, -120] : key === 's' ? [0, 120] : key === 'a' ? [-120, 0] : key === 'd' ? [120, 0] : null;
    if (delta === null) {
      return;
    }
    event.preventDefault();
    const bounds = mainWindow.getContentBounds();
    lastClick.x = Math.min(Math.max(lastClick.x + delta[0], 0), bounds.width);
    lastClick.y = Math.min(Math.max(lastClick.y + delta[1], 0), bounds.height);
    mainWindow.webContents.sendInputEvent({ type: 'mouseDown', x: lastClick.x, y: lastClick.y, button: 'left', clickCount: 1 });
    mainWindow.webContents.sendInputEvent({ type: 'mouseUp', x: lastClick.x, y: lastClick.y, button: 'left', clickCount: 1 });
  });

  if (gameServer !== null) {
    gameServer.addHubRequestListener(async (penguinId) => {
      const result = await dialog.showMessageBox(mainWindow, {
        title: 'Guide Gary',
        message: 'Guide Gary wants to teleport you to the Time Command Center. Do you want to go?',
        buttons: ['Teleport', 'Cancel'],
        defaultId: 0,
        cancelId: 1
      });
      if (result.response === 0) {
        gameServer.travelToHubById(penguinId);
      }
    });
    gameServer.addTimelineRequestListener((penguinId) => {
      void createTimelinePicker(mainWindow, popups, serverSettings, gameServer, penguinId);
    });
    gameServer.addJournalRequestListener((penguinId) => {
      void createJournal(mainWindow, popups, serverSettings, gameServer, penguinId);
    });
    gameServer.addTimelineAdvanceListener(() => {
      if (!mainWindow.isDestroyed()) {
        mainWindow.webContents.reloadIgnoringCache();
      }
    });
  }

  const app: MenuItemConstructorOptions = { 
    id: '0', 
    role: 'appMenu'
  };
  
  const options: MenuItemConstructorOptions = {
    id: '1',
    label: 'Options',
    submenu: [
      ...(gameServer === null ? [] : [
        {
          label: 'Open Settings',
          accelerator: 'CommandOrControl+,',
          click: () => createSettingsWindow(mainWindow, popups, serverSettings, gameServer)
        },
        {
          label: 'Open Mods',
          accelerator: 'CommandOrControl+M',
          click: () => createModsWindow(mainWindow, popups, serverSettings, gameServer)
        },
        {
          label: 'Open Trainer',
          accelerator: 'CommandOrControl+T',
          click: () => createTrainer(mainWindow, popups, serverSettings, gameServer)
        },
        {
          label: 'Open Era Journal',
          accelerator: 'CommandOrControl+J',
          click: () => createJournal(mainWindow, popups, serverSettings, gameServer)
        },
        {
          label: 'Open Commands',
          accelerator: 'CommandOrControl+D',
          click: () => createCommands(mainWindow, popups, serverSettings, gameServer)
        }
      ]),
      {
        label: 'Open Multiplayer Settings',
        click: () => createMultiplayerSettings(globalSettings,serverSettings, mainWindow)
      },
      {
        label: 'WASD Movement',
        type: 'checkbox',
        checked: false,
        accelerator: 'F6',
        click: (item) => {
          wasdMovement = item.checked;
        }
      },
      {
        type: 'separator'
      },
      {
        label: 'Open Dev Tools',
        accelerator: 'CommandOrControl+Shift+I',
        click: () => mainWindow.webContents.openDevTools()
      },
      {
        label: 'Clear Cache',
        click: () => mainWindow.webContents.session.clearCache()
      },
      {
        label: 'Reload',
        accelerator: 'F5',
        click: () => loadMain(mainWindow, globalSettings, serverSettings)
      },
      {
        label: 'Reload Clear Cache',
        accelerator: 'CommandOrControl+R',
        click: () => mainWindow.webContents.reloadIgnoringCache()
      },
      {
        type: 'separator'
      },
      {
        label: 'Toggle Discord Rich Presence',
        click: () => enableOrDisableDiscordRPC(store, mainWindow)
      },
      {
        label: 'Toggle room tracking through Discord Rich Presence',
        click: () => enableOrDisableDiscordRPCLocationTracking(store, mainWindow)
      }
    ]
  };

  const timeline: MenuItemConstructorOptions | null = gameServer === null ? null : {
    id: '3',
    label: 'Timeline',
    click: () => createTimelinePicker(mainWindow, popups, serverSettings, gameServer)
  };

  // only adding the submenu if Mac, because empty submenu leads to it not working on other OSes, and it's a necessary Mac feature
  if (timeline !== null && process.platform === 'darwin') {
    timeline.submenu = [{ 
      label: 'Timeline Picker', 
      click: () => createTimelinePicker(mainWindow, popups, serverSettings, gameServer)
    }];
  }

  // on Mac, stuff like copying/pasting does not work without this
  const edit: MenuItemConstructorOptions = {
    id: '4',
    role: 'editMenu'
  }

  const view: MenuItemConstructorOptions = {
    id: '4',
    label: 'View',
    submenu: [
      { role: 'zoomIn', accelerator: 'CommandOrControl+Plus' },
      { role: 'zoomOut', accelerator: 'CommandOrControl+-' },
      { role: 'resetZoom' },
      { type: 'separator' },
      {
        label: 'Toggle Full Screen',
        accelerator: process.platform === 'darwin' ? 'Ctrl+Command+F' : 'F11',
        click: () => toggleFullScreen(store, mainWindow)
      },
    ]
  }

  const menuTemplate = process.platform === 'darwin' ? 
    [app, options, ...(timeline === null ? [] : [timeline]), edit, view] : 
    [options, ...(timeline === null ? [] : [timeline]), view];

  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
};

export default startMenu;