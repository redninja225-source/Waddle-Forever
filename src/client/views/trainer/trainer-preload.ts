import { ipcRenderer } from 'electron';
import { addDispatchEventListeners } from '@common/utils';

addDispatchEventListeners(['trainer-data'], ipcRenderer);

(window as any).api = {
  fetchTrainerData: () => ipcRenderer.send('trainer-get-data'),
  openCommands: () => ipcRenderer.send('trainer-open-commands'),
  runCommand: (obj: { id: number, command: string }) => ipcRenderer.send('trainer-run-command', obj)
};
