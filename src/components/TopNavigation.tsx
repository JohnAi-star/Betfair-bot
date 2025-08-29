import React from 'react';
import { 
  BellIcon, 
  UserCircleIcon,
  MagnifyingGlassIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface TopNavigationProps {
  connectionStatus: {
    connected: boolean;
    latency: number;
  };
}

const TopNavigation: React.FC<TopNavigationProps> = ({ connectionStatus }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search markets, events..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Connection Status */}
          <motion.div 
            className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-gray-50"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus.connected 
                ? 'bg-success-500 animate-pulse-soft' 
                : 'bg-error-500'
            }`}></div>
            <span className={`text-xs font-medium ${
              connectionStatus.connected ? 'text-success-700' : 'text-error-700'
            }`}>
              {connectionStatus.connected ? 'Connected' : 'Disconnected'}
            </span>
            {connectionStatus.connected && (
              <span className="text-2xs text-gray-500 font-mono">
                {connectionStatus.latency}ms
              </span>
            )}
          </motion.div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <motion.button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <BellIcon className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Cog6ToothIcon className="w-5 h-5" />
            </motion.button>
            
            <motion.button
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <UserCircleIcon className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNavigation;