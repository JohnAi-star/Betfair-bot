import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/Sidebar';
import TopNavigation from './components/TopNavigation';
import Header from './components/Header';
import AccountDisplay from './components/AccountDisplay';
import GlobalSettings from './components/GlobalSettings';
import TradingPlaceholder from './components/TradingPlaceholder';
import DashboardStats from './components/DashboardStats';
import { useAccountInfo, useConnectionStatus, useGlobalSettings } from './hooks/useMockData';

function App() {
  const [activeSection, setActiveSection] = useState('dashboard');
  const { accountInfo, loading: accountLoading } = useAccountInfo();
  const { connectionStatus, loading: connectionLoading } = useConnectionStatus();
  const { settings, updateSettings } = useGlobalSettings();

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Header connectionStatus={connectionStatus} />
            <DashboardStats />
            <AccountDisplay accountInfo={accountInfo} loading={accountLoading} />
          </motion.div>
        );
      
      case 'trading':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <TradingPlaceholder />
          </motion.div>
        );
      
      case 'account':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <AccountDisplay accountInfo={accountInfo} loading={accountLoading} />
          </motion.div>
        );
      
      case 'settings':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <GlobalSettings settings={settings} onSettingsChange={updateSettings} />
          </motion.div>
        );
      
      case 'activity':
      case 'alerts':
        return (
          <motion.div 
            className="card p-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚧</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {activeSection === 'activity' ? 'Activity Log' : 'Alert Center'}
            </h3>
            <p className="text-gray-600 max-w-md mx-auto">
              This section will be implemented in Phase 2 with comprehensive 
              {activeSection === 'activity' ? ' trading history and logs' : ' notification management'}.
            </p>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <TopNavigation connectionStatus={connectionStatus} />
        
        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSection}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
    </div>
  );
}

export default App;