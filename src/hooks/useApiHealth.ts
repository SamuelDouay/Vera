import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import type { HealthStatus } from '../types/api';

interface UseApiHealthReturn {
    health: HealthStatus
    checkHealth: () => Promise<void>;
}

export const useApiHealth = (): UseApiHealthReturn => {
    const [health, setHealth] = useState<HealthStatus>({ status: 'UP', timestamp: '' });

    const checkHealth = async (): Promise<void> => {
        const healthData = await apiService.healthCheck();
        setHealth(healthData);
    };

    useEffect(() => {
        checkHealth();
        // Check health every 30 seconds
        const interval = setInterval(checkHealth, 30000);
        return () => clearInterval(interval);
    }, []);

    return { health, checkHealth };
};