import { useState, useEffect } from 'react';
import { 
  AccountInfo, 
  ConnectionStatus, 
  GlobalSettings,
  generateMockAccountInfo,
  generateMockConnectionStatus,
  defaultGlobalSettings,
  mockDataProvider
} from '../mock/mockData';

export const useAccountInfo = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo>(generateMockAccountInfo());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    setLoading(false);

    // Set up real-time updates
    const handleUpdate = (data: AccountInfo) => {
      setAccountInfo(data);
    };

    mockDataProvider.onAccountInfoUpdate(handleUpdate);
    mockDataProvider.start();

    return () => {
      mockDataProvider.removeAccountInfoListener(handleUpdate);
    };
  }, []);

  return { accountInfo, loading };
};

export const useConnectionStatus = () => {
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>(generateMockConnectionStatus());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    setLoading(false);

    // Set up real-time updates
    const handleUpdate = (data: ConnectionStatus) => {
      setConnectionStatus(data);
    };

    mockDataProvider.onConnectionStatusUpdate(handleUpdate);
    mockDataProvider.start();

    return () => {
      mockDataProvider.removeConnectionStatusListener(handleUpdate);
    };
  }, []);

  return { connectionStatus, loading };
};

export const useGlobalSettings = () => {
  const [settings, setSettings] = useState<GlobalSettings>(defaultGlobalSettings);

  const updateSettings = (newSettings: Partial<GlobalSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
      riskManagement: {
        ...prev.riskManagement,
        ...(newSettings.riskManagement || {})
      },
      notifications: {
        ...prev.notifications,
        ...(newSettings.notifications || {})
      }
    }));
  };

  return { settings, updateSettings };
};