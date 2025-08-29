export interface ElectronAPI {
  getAppVersion: () => Promise<string>;
  api: {
    getAccountInfo: () => Promise<{
      accountId: string;
      balance: number;
      exposure: number;
      currency: string;
      status: string;
    }>;
    getConnectionStatus: () => Promise<{
      connected: boolean;
      lastUpdate: string;
      latency: number;
    }>;
  };
  onMainProcessMessage: (callback: (message: string) => void) => void;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}