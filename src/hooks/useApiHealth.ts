import { useState, useEffect } from 'react';
import apiService from '../services/apiService';
import type { HealthStatus } from '../types/api';

interface UseApiHealthReturn {
    health: HealthStatus;
    loading: boolean;
    checkHealth: () => Promise<void>;
}

export const useApiHealth = (): UseApiHealthReturn => {
    const [health, setHealth] = useState<HealthStatus>({ status: 'UP', timestamp: '' });
    const [loading, setLoading] = useState<boolean>(false);

    const checkHealth = async (): Promise<void> => {
        setLoading(true);
        try {
            const healthData = await apiService.healthCheck();
            setHealth(healthData);
        } catch {
            setHealth({ status: 'DOWN', timestamp: new Date().toISOString() });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkHealth();
        // Check health every 30 seconds
        const interval = setInterval(checkHealth, 30000);
        return () => clearInterval(interval);
    }, []);

    return { health, loading, checkHealth };
};