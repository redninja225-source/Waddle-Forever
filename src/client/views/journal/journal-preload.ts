import { ipcRenderer } from 'electron';
import { addDispatchEventListeners } from '@common/utils';

addDispatchEventListeners(['journal-data'], ipcRenderer);
