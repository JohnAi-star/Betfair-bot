import React from 'react';
import { 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  ClockIcon,
  CurrencyPoundIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

const DashboardStats: React.FC = () => {
  const stats = [
    {
      name: 'Today\'s P&L',
      value: '+£127.50',
      change: '+12.4%',
      changeType: 'positive' as const,
      icon: ArrowTrendingUpIcon,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200'
    },
    {
      name: 'Active Positions',
      value: '3',
      change: '+2 from yesterday',
      changeType: 'neutral' as const,
      icon: ClockIcon,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      borderColor: 'border-primary-200'
    },
    {
      name: 'Win Rate',
      value: '68.2%',
      change: '+2.1%',
      changeType: 'positive' as const,
      icon: ArrowTrendingUpIcon,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      borderColor: 'border-success-200'
    },
    {
      name: 'Total Volume',
      value: '£2,450',
      change: '-5.2%',
      changeType: 'negative' as const,
      icon: CurrencyPoundIcon,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      borderColor: 'border-warning-200'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.name}
          className={`card card-hover p-6 border ${stat.borderColor}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          whileHover={{ y: -2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-10 h-10 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className={`flex items-center space-x-1 text-xs font-medium ${
              stat.changeType === 'positive' ? 'text-success-600' :
              stat.changeType === 'negative' ? 'text-error-600' : 'text-gray-500'
            }`}>
              {stat.changeType === 'positive' && <ArrowTrendingUpIcon className="w-3 h-3" />}
              {stat.changeType === 'negative' && <ArrowTrendingDownIcon className="w-3 h-3" />}
              <span>{stat.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-600">{stat.name}</p>
            <p className="text-2xl font-bold text-gray-900 font-mono">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;