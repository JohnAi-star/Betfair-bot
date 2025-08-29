import React from 'react';
import { 
  ChartBarIcon, 
  CpuChipIcon, 
  RocketLaunchIcon,
  ClockIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const TradingPlaceholder: React.FC = () => {
  const features = [
    {
      icon: ChartBarIcon,
      title: 'Market Data Matrix',
      description: 'Real-time odds monitoring and analysis across multiple markets',
      status: 'planned'
    },
    {
      icon: CpuChipIcon,
      title: 'Trading Strategies',
      description: 'Automated betting strategies with customizable parameters',
      status: 'planned'
    },
    {
      icon: RocketLaunchIcon,
      title: 'Bet Placement Engine',
      description: 'High-speed automated bet placement and management',
      status: 'planned'
    },
    {
      icon: ClockIcon,
      title: 'Real-time Monitoring',
      description: 'Live tracking of positions, P&L, and market movements',
      status: 'planned'
    }
  ];

  return (
    <motion.div 
      className="card p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <motion.div
          className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-4"
          animate={{ 
            scale: [1, 1.05, 1],
            rotate: [0, 1, -1, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <RocketLaunchIcon className="w-10 h-10 text-primary-600" />
        </motion.div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Trading Automation Hub
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Advanced trading strategies and market analysis tools will be available in Phase 2. 
          The foundation is ready for seamless integration.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                <feature.icon className="w-6 h-6 text-primary-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{feature.title}</h4>
                  <span className="bg-warning-100 text-warning-700 text-xs px-2 py-1 rounded-full font-medium">
                    Phase 2
                  </span>
                </div>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Development Status */}
      <div className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 border border-primary-200">
        <div className="flex items-center space-x-3 mb-4">
          <ExclamationTriangleIcon className="w-6 h-6 text-primary-600" />
          <h4 className="text-lg font-semibold text-primary-900">Development Status</h4>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-800">Phase 1 - UI Foundation</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success-500 rounded-full"></div>
              <span className="text-xs font-medium text-success-700">Complete</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary-800">Phase 2 - Trading Integration</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-warning-500 rounded-full animate-pulse-soft"></div>
              <span className="text-xs font-medium text-warning-700">In Planning</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-primary-200">
            <p className="text-xs text-primary-700">
              All components are architected for seamless Phase 2 integration. 
              Mock data providers will be replaced with live Betfair API connections.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TradingPlaceholder;