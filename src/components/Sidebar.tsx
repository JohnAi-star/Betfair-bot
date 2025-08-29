import React from 'react';
import { 
  HomeIcon, 
  ChartBarIcon, 
  CogIcon, 
  BellIcon,
  UserIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navigation = [
  { name: 'Dashboard', id: 'dashboard', icon: HomeIcon },
  { name: 'Trading', id: 'trading', icon: ChartBarIcon },
  { name: 'Account', id: 'account', icon: UserIcon },
  { name: 'Settings', id: 'settings', icon: CogIcon },
  { name: 'Activity', id: 'activity', icon: DocumentTextIcon },
  { name: 'Alerts', id: 'alerts', icon: BellIcon },
];

const Sidebar: React.FC<SidebarProps> = ({ activeSection, onSectionChange }) => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
            <ChartBarIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Nags 'N' Dogs</h1>
            <p className="text-xs text-gray-500 font-medium">Lite Bot v1.0</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navigation.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary-50 text-primary-700 border border-primary-200'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-primary-600' : 'text-gray-400'}`} />
              <span>{item.name}</span>
              {item.id === 'trading' && (
                <span className="ml-auto bg-warning-100 text-warning-700 text-xs px-2 py-0.5 rounded-full">
                  Phase 2
                </span>
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Status Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <div className="w-2 h-2 bg-success-500 rounded-full animate-pulse-soft"></div>
            <span className="text-xs font-medium text-gray-700">Mock Data Mode</span>
          </div>
          <p className="text-2xs text-gray-500">
            Phase 1 - Development Environment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;