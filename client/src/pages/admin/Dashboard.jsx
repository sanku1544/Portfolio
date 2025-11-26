import React from 'react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        <button 
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/admin';
          }}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Logout
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {['Total Views', 'Projects', 'Messages'].map((item, index) => (
          <motion.div 
            key={item}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm"
          >
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">{item}</h3>
            <p className="text-3xl font-bold dark:text-white mt-2">{Math.floor(Math.random() * 100)}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Recent Activity</h2>
        <p className="text-gray-500 dark:text-gray-400">No recent activity.</p>
      </div>
    </div>
  );
};

export default Dashboard;
