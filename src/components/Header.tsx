import React from 'react';
import { ChartBarIcon, SignalIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface HeaderProps {
  connectionStatus: {
    connected: boolean;
    latency: number;
  };
}

const Header: React.FC<HeaderProps> = ({ connectionStatus }) => {
  return (
    <motion.div 
      className="bg-gradient-to-r from-primary-600 to-primary-700 text-white p-6"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <ChartBarIcon className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Trading Dashboard</h1>
            <p className="text-primary-100 text-sm">Real-time market monitoring & automation</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
            <SignalIcon className="w-4 h-4" />
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                connectionStatus.connected 
                  ? 'bg-success-400 animate-pulse-soft' 
                  : 'bg-error-400'
              }`}></div>
              <span className="text-sm font-medium">
                {connectionStatus.connected ? 'Live' : 'Offline'}
              </span>
              {connectionStatus.connected && (
                <span className="text-xs text-primary-200 font-mono">
                  {connectionStatus.latency}ms
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Header;