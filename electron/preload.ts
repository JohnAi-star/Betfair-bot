import { contextBridge, ipcRenderer } from 'electron';

// Define the API interface first
interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  api: {
    getAccountInfo: () => Promise<any>;
    getConnectionStatus: () => Promise<any>;
  };
  onMainProcessMessage: (callback: (message: string) => void) => void;
}

// Create the API object
const electronAPI: ElectronAPI = {
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  api: {
    getAccountInfo: () => ipcRenderer.invoke('api:get-account-info'),
    getConnectionStatus: () => ipcRenderer.invoke('api:get-connection-status'),
  },
  onMainProcessMessage: (callback: (message: string) => void) => {
    ipcRenderer.on('main-process-message', (_event, message) => callback(message));
  },
};

// Expose to renderer
contextBridge.exposeInMainWorld('electronAPI', electronAPI);

// Export the type
export type { ElectronAPI };