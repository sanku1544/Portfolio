import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import GeneralTab from '../components/admin/GeneralTab';
import ProjectsTab from '../components/admin/ProjectsTab';
import ExperienceTab from '../components/admin/ExperienceTab';
import SkillsTab from '../components/admin/SkillsTab';
import MessagesTab from '../components/admin/MessagesTab';
import CertificationsTab from '../components/admin/CertificationsTab';
import { motion } from 'framer-motion';

import axios from 'axios';
import { FaEye, FaProjectDiagram, FaEnvelope } from 'react-icons/fa';

const AdminDashboard = () => {
  const { user, loading, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({ views: 0, projects: 0, messages: 0 });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/admin');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (user && activeTab === 'overview') {
      fetchStats();
    }
  }, [user, activeTab]);

  const fetchStats = async () => {
    try {
      const [generalRes, projectsRes, messagesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/portfolio/general'),
        axios.get('http://localhost:5000/api/portfolio/projects'),
        axios.get('http://localhost:5000/api/portfolio/messages', {
          headers: { Authorization: `Bearer ${user.token}` }
        })
      ]);
      
      setStats({
        views: generalRes.data.views || 0,
        projects: projectsRes.data.length || 0,
        messages: messagesRes.data.length || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

  const OverviewTab = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Views', value: stats.views, icon: <FaEye />, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
          { label: 'Projects', value: stats.projects, icon: <FaProjectDiagram />, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
          { label: 'Messages', value: stats.messages, icon: <FaEnvelope />, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' }
        ].map((item, index) => (
          <motion.div 
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center justify-between"
          >
            <div>
              <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase">{item.label}</h3>
              <p className="text-4xl font-bold dark:text-white mt-2">{item.value}</p>
            </div>
            <div className={`p-4 rounded-full ${item.bg} ${item.color} text-2xl`}>
              {item.icon}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 border border-gray-100 dark:border-gray-700">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Recent Activity</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back, Admin! You have {stats.messages} messages and {stats.projects} projects in your portfolio.
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 px-6 md:px-20 bg-gray-100 dark:bg-gray-900 pb-20">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold dark:text-white">Dashboard</h1>
        <button 
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30"
        >
          Logout
        </button>
      </div>
      
      <div className="flex gap-4 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'general', label: 'General Info' },
          { id: 'projects', label: 'Projects' },
          { id: 'certifications', label: 'Certifications' },
          { id: 'experience', label: 'Experience' },
          { id: 'skills', label: 'Skills' },
          { id: 'messages', label: 'Messages' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap ${
              activeTab === tab.id 
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30' 
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="transition-all duration-300 ease-in-out">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'general' && <GeneralTab />}
        {activeTab === 'projects' && <ProjectsTab />}
        {activeTab === 'certifications' && <CertificationsTab />}
        {activeTab === 'experience' && <ExperienceTab />}
        {activeTab === 'skills' && <SkillsTab />}
        {activeTab === 'messages' && <MessagesTab />}
      </div>
    </div>
  );
};

export default AdminDashboard;
