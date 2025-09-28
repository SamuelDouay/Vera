import React from 'react';
import { useApiHealth } from '../hooks/useApiHealth';

const HealthStatus: React.FC = () => {
  const { health } = useApiHealth();

  const getStatusColor = (status: string): string => {
    console.log('Current health status:', status);
    switch (status) {
      case 'UP': return 'bg-green-500';
      case 'DOWN': return 'bg-red-500';
      default: return 'bg-yellow-500';
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <div className={`w-3 h-3 rounded-full ${getStatusColor(health.status)}`}></div>
      <span className="text-sm text-gray-600">
        API Status: { health.status}
      </span>
    </div>
  );
};

export default HealthStatus;