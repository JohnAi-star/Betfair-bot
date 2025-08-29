import React from 'react';
import { 
  BanknotesIcon, 
  ArrowTrendingUpIcon, 
  ShieldCheckIcon, 
  UserIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { AccountInfo } from '../mock/mockData';

interface AccountDisplayProps {
  accountInfo: AccountInfo;
  loading: boolean;
}

const LoadingSkeleton = () => (
  <div className="card p-6 animate-fade-in">
    <div className="flex items-center justify-between mb-6">
      <div className="loading-shimmer h-6 w-32 rounded"></div>
      <div className="loading-shimmer h-5 w-20 rounded"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="space-y-3">
          <div className="loading-shimmer h-4 w-16 rounded"></div>
          <div className="loading-shimmer h-8 w-24 rounded"></div>
        </div>
      ))}
    </div>
  </div>
);

const AccountDisplay: React.FC<AccountDisplayProps> = ({ accountInfo, loading }) => {
  if (loading) {
    return <LoadingSkeleton />;
  }

  const formatCurrency: (amount: number) => string = (amount: number) => {
    return new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return {
          color: 'bg-success-100 text-success-800 border-success-200',
          icon: ShieldCheckIcon,
          text: 'Active'
        };
      case 'SUSPENDED':
        return {
          color: 'bg-warning-100 text-warning-800 border-warning-200',
          icon: ShieldCheckIcon,
          text: 'Suspended'
        };
      case 'CLOSED':
        return {
          color: 'bg-error-100 text-error-800 border-error-200',
          icon: ShieldCheckIcon,
          text: 'Closed'
        };
      default:
        return {
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: ShieldCheckIcon,
          text: status
        };
    }
  };

  const available = accountInfo.balance - accountInfo.exposure;
  const statusConfig = getStatusConfig(accountInfo.status);
  const StatusIcon = statusConfig.icon;

  const stats = [
    {
      name: 'Account Balance',
      value: formatCurrency(accountInfo.balance),
      icon: BanknotesIcon,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      change: '+2.4%',
      changeType: 'positive'
    },
    {
      name: 'Current Exposure',
      value: formatCurrency(accountInfo.exposure),
      icon: ArrowTrendingUpIcon,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      change: '-0.8%',
      changeType: 'negative'
    },
    {
      name: 'Available Funds',
      value: formatCurrency(available),
      icon: ShieldCheckIcon,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      change: '+1.2%',
      changeType: 'positive'
    },
    {
      name: 'Account Status',
      value: statusConfig.text,
      icon: StatusIcon,
      color: statusConfig.color.includes('success') ? 'text-success-600' : 
             statusConfig.color.includes('warning') ? 'text-warning-600' : 'text-error-600',
      bgColor: statusConfig.color.includes('success') ? 'bg-success-50' : 
               statusConfig.color.includes('warning') ? 'bg-warning-50' : 'bg-error-50',
    }
  ];

  return (
    <motion.div 
      className="card card-hover p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center">
            <UserIcon className="w-5 h-5 text-primary-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Account Overview</h3>
            <p className="text-sm text-gray-500">Real-time account information</p>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-400 font-mono">Account ID</div>
          <div className="text-sm font-mono text-gray-700">{accountInfo.accountId}</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.name}
            className="relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-8 h-8 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                {stat.change && (
                  <div className={`flex items-center space-x-1 text-xs font-medium ${
                    stat.changeType === 'positive' ? 'text-success-600' : 'text-error-600'
                  }`}>
                    {stat.changeType === 'positive' ? (
                      <ArrowUpIcon className="w-3 h-3" />
                    ) : (
                      <ArrowDownIcon className="w-3 h-3" />
                    )}
                    <span>{stat.change}</span>
                  </div>
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-xs text-gray-500 font-medium">{stat.name}</p>
                <p className="text-xl font-bold text-gray-900 font-mono">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium text-gray-700">Quick Actions</h4>
          <div className="flex space-x-2">
            <motion.button
              className="btn-secondary text-xs"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Refresh Data
            </motion.button>
            <motion.button
              className="btn-primary text-xs"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Details
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AccountDisplay;