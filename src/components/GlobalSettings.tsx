import React from 'react';
import {
  CogIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowPathIcon,
  ShieldExclamationIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { GlobalSettings as GlobalSettingsType } from '../mock/mockData';

interface GlobalSettingsProps {
  settings: GlobalSettingsType;
  onSettingsChange: (settings: Partial<GlobalSettingsType>) => void;
}

const ToggleSwitch: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}> = ({ checked, onChange, disabled = false }) => (
  <motion.label
    className={`relative inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    whileTap={{ scale: 0.95 }}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
      disabled={disabled}
      className="sr-only peer"
    />
    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
  </motion.label>
);

const GlobalSettings: React.FC<GlobalSettingsProps> = ({ settings, onSettingsChange }) => {
  const settingSections = [
    {
      title: 'General Settings',
      icon: CogIcon,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
      items: [
        {
          id: 'autoRefresh',
          label: 'Auto Refresh Data',
          description: 'Automatically update market data',
          icon: ArrowPathIcon,
          type: 'toggle' as const,
          value: settings.autoRefresh,
          onChange: (value: boolean) => onSettingsChange({ autoRefresh: value })
        },
        {
          id: 'refreshInterval',
          label: 'Refresh Interval',
          description: 'How often to update data',
          type: 'select' as const,
          value: settings.refreshInterval,
          options: [
            { value: 1, label: '1 second' },
            { value: 3, label: '3 seconds' },
            { value: 5, label: '5 seconds' },
            { value: 10, label: '10 seconds' },
            { value: 30, label: '30 seconds' },
          ],
          disabled: !settings.autoRefresh,
          onChange: (value: number) => onSettingsChange({ refreshInterval: value })
        },
        {
          id: 'soundAlerts',
          label: 'Sound Alerts',
          description: 'Play sounds for important events',
          icon: settings.soundAlerts ? SpeakerWaveIcon : SpeakerXMarkIcon,
          type: 'toggle' as const,
          value: settings.soundAlerts,
          onChange: (value: boolean) => onSettingsChange({ soundAlerts: value })
        }
      ]
    },
    {
      title: 'Risk Management',
      icon: ShieldExclamationIcon,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
      items: [
        {
          id: 'maxStake',
          label: 'Maximum Stake',
          description: 'Maximum amount per bet',
          type: 'number' as const,
          value: settings.riskManagement.maxStake,
          unit: '£',
          onChange: (value: number) => onSettingsChange({
            riskManagement: { ...settings.riskManagement, maxStake: value }
          })
        },
        {
          id: 'stopLoss',
          label: 'Stop Loss Limit',
          description: 'Maximum loss before stopping',
          type: 'number' as const,
          value: settings.riskManagement.stopLoss,
          unit: '£',
          onChange: (value: number) => onSettingsChange({
            riskManagement: { ...settings.riskManagement, stopLoss: value }
          })
        },
        {
          id: 'maxExposure',
          label: 'Maximum Exposure',
          description: 'Total exposure limit',
          type: 'number' as const,
          value: settings.riskManagement.maxExposure,
          unit: '£',
          onChange: (value: number) => onSettingsChange({
            riskManagement: { ...settings.riskManagement, maxExposure: value }
          })
        }
      ]
    },
    {
      title: 'Notifications',
      icon: BellIcon,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
      items: Object.entries(settings.notifications).map(([key, value]) => ({
        id: key,
        label: key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'),
        description: `Notify when ${key.toLowerCase()} occur`,
        type: 'toggle' as const,
        value: value,
        onChange: (newValue: boolean) => onSettingsChange({
          notifications: { ...settings.notifications, [key]: newValue }
        })
      }))
    }
  ];

  return (
    <div className="space-y-6">
      {settingSections.map((section, sectionIndex) => (
        <motion.div
          key={section.title}
          className="card card-hover p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: sectionIndex * 0.1 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 ${section.bgColor} rounded-lg flex items-center justify-center`}>
                <section.icon className={`w-5 h-5 ${section.color}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
                <p className="text-sm text-gray-500">Configure {section.title.toLowerCase()}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {section.items.map((item, itemIndex) => (
              <motion.div
                key={item.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (sectionIndex * 0.1) + (itemIndex * 0.05) }}
              >
                <div className="flex items-center space-x-3 flex-1">
                  {'icon' in item && item.icon && (
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <item.icon className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">{item.label}</span>
                      {'disabled' in item && item.disabled && (
                        <span className="text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                          Disabled
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{item.description}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {item.type === 'toggle' && (
                    <ToggleSwitch
                      checked={item.value as boolean}
                      onChange={item.onChange as (value: boolean) => void}
                      disabled={'disabled' in item ? item.disabled : false}
                    />
                  )}

                  {item.type === 'select' && (
                    <select
                      value={item.value as number}
                      onChange={(e) => (item.onChange as (value: number) => void)(parseInt(e.target.value))}
                      disabled={item.disabled}
                      className="input-field w-32 text-sm"
                    >
                      {item.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}

                  {item.type === 'number' && (
                    <div className="flex items-center space-x-1">
                      {item.unit && <span className="text-sm text-gray-500">{item.unit}</span>}
                      <input
                        type="number"
                        value={item.value as number}
                        onChange={(e) => (item.onChange as (value: number) => void)(parseFloat(e.target.value) || 0)}
                        className="input-field w-24 text-sm text-right"
                        min="0"
                        step="0.01"
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default GlobalSettings;