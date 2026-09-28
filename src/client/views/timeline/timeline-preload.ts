import { ipcRenderer } from 'electron';
import { addDispatchEventListeners } from '@common/utils';

addDispatchEventListeners([
  'get-timeline',
  'timeline-locked',
  'timeline-unlock-result',
  'timeline-unlock-all-result',
  'timeline-reset-result'
], ipcRenderer);

(window as any).api = {
  update: (obj: any) => ipcRenderer.send('update-version', obj),
  unlock: (obj: any) => ipcRenderer.send('unlock-timeline', obj),
  unlockAll: (obj: { playerId: number | undefined; password: string }) => ipcRenderer.send('unlock-all-timeline', obj),
  resetProgress: (obj: any) => ipcRenderer.send('reset-progress', obj)
};
