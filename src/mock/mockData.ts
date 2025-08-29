export interface AccountInfo {
  accountId: string;
  balance: number;
  exposure: number;
  currency: string;
  status: 'ACTIVE' | 'SUSPENDED' | 'CLOSED';
}

export interface ConnectionStatus {
  connected: boolean;
  lastUpdate: string;
  latency: number;
}

export interface GlobalSettings {
  autoRefresh: boolean;
  refreshInterval: number;
  soundAlerts: boolean;
  theme: 'dark' | 'neon-dark';
  riskManagement: {
    maxStake: number;
    stopLoss: number;
    maxExposure: number;
  };
  notifications: {
    wins: boolean;
    losses: boolean;
    systemAlerts: boolean;
  };
}

// Mock data generators
export const generateMockAccountInfo = (): AccountInfo => ({
  accountId: 'NDL-' + Math.random().toString(36).substring(7).toUpperCase(),
  balance: parseFloat((Math.random() * 5000 + 1000).toFixed(2)),
  exposure: parseFloat((Math.random() * 200).toFixed(2)),
  currency: 'GBP',
  status: Math.random() > 0.1 ? 'ACTIVE' : 'SUSPENDED',
});

export const generateMockConnectionStatus = (): ConnectionStatus => ({
  connected: Math.random() > 0.15, // 85% uptime
  lastUpdate: new Date().toISOString(),
  latency: Math.floor(Math.random() * 150) + 25,
});

export const defaultGlobalSettings: GlobalSettings = {
  autoRefresh: true,
  refreshInterval: 5,
  soundAlerts: true,
  theme: 'neon-dark',
  riskManagement: {
    maxStake: 100.0,
    stopLoss: 50.0,
    maxExposure: 500.0,
  },
  notifications: {
    wins: true,
    losses: true,
    systemAlerts: true,
  },
};

// Simulate real-time data updates
export class MockDataProvider {
  private accountInfoCallbacks: ((data: AccountInfo) => void)[] = [];
  private connectionStatusCallbacks: ((data: ConnectionStatus) => void)[] = [];
  private intervalId: NodeJS.Timeout | null = null;

  start() {
    if (this.intervalId) return;
    
    this.intervalId = setInterval(() => {
      // Update account info every 10 seconds
      if (Math.random() > 0.7) {
        const accountInfo = generateMockAccountInfo();
        this.accountInfoCallbacks.forEach(callback => callback(accountInfo));
      }
      
      // Update connection status every 3 seconds
      if (Math.random() > 0.5) {
        const connectionStatus = generateMockConnectionStatus();
        this.connectionStatusCallbacks.forEach(callback => callback(connectionStatus));
      }
    }, 3000);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  onAccountInfoUpdate(callback: (data: AccountInfo) => void) {
    this.accountInfoCallbacks.push(callback);
  }

  onConnectionStatusUpdate(callback: (data: ConnectionStatus) => void) {
    this.connectionStatusCallbacks.push(callback);
  }

  removeAccountInfoListener(callback: (data: AccountInfo) => void) {
    const index = this.accountInfoCallbacks.indexOf(callback);
    if (index > -1) {
      this.accountInfoCallbacks.splice(index, 1);
    }
  }

  removeConnectionStatusListener(callback: (data: ConnectionStatus) => void) {
    const index = this.connectionStatusCallbacks.indexOf(callback);
    if (index > -1) {
      this.connectionStatusCallbacks.splice(index, 1);
    }
  }
}

export const mockDataProvider = new MockDataProvider();