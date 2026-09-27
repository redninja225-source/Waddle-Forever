import { ipcRenderer } from 'electron';

(window as any).api = {
  selectMode: (mode: 'main' | 'timeline') => ipcRenderer.send('select-startup-mode', mode)
};
