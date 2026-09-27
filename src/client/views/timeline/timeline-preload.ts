import { ipcRenderer } from 'electron';
import { addDispatchEventListeners } from '@common/utils';

addDispatchEventListeners([
  'get-timeline',
  'timeline-locked',
  'timeline-unlock-result',
  'timeline-reset-result'
], ipcRenderer);

(window as any).api = {
  update: (obj: any) => ipcRenderer.send('update-version', obj),
  unlock: (obj: any) => ipcRenderer.send('unlock-timeline', obj),
  resetProgress: (obj: any) => ipcRenderer.send('reset-progress', obj)
};
