import React from 'react';
import UsersList from './components/UsersList';
import HealthStatus from './components/HealthStatus';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">VERA Dashboard</h1>
          <HealthStatus />
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6">
        <UsersList />
      </main>
    </div>
  );
};

export default App;