import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AdminLogin from './pages/admin/AdminLogin';
import Dashboard from './pages/AdminDashboard';
import { AuthProvider } from './context/AuthContext';
import ChatWidget from './components/ChatWidget';

// Placeholder for other pages
const ProjectsPage = () => <div className="pt-20 text-center">All Projects Page (Coming Soon)</div>;
const ContactPage = () => <div className="pt-20 text-center">Contact Page (Coming Soon)</div>;


import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import CustomCursor from './components/CustomCursor';
import NotFound from './pages/NotFound';
import SEO from './components/SEO';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <HelmetProvider>
      <AuthProvider>
        <div className="min-h-screen font-sans bg-white dark:bg-dark text-gray-900 dark:text-white transition-colors duration-300 cursor-none">
          <SEO />
          <CustomCursor />
          <Toaster position="top-right" />
          
          {!isAdminRoute && (
            <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          )}
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {!isAdminRoute && <ChatWidget />}
        </div>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
