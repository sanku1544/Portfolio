import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon, FaHome, FaBriefcase, FaEnvelope } from 'react-icons/fa';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { x: "100%", opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  const navLinks = [
    { name: 'Home', to: '/#top' },
    { name: 'Projects', to: '/#projects' },
    { name: 'Contact', to: '/#contact' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full p-4 flex justify-between items-center bg-white/90 dark:bg-dark/90 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800 shadow-sm"
    >
      <HashLink smooth to="/#top" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent z-50">
        Sanket Nikam
      </HashLink>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <HashLink 
            key={link.name}
            smooth 
            to={link.to} 
            className="font-medium hover:text-blue-500 transition-colors relative group"
          >
            {link.name}
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </HashLink>
        ))}
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600" />}
        </button>

        {user && (
          <button onClick={logout} className="text-red-500 text-sm font-medium hover:underline">Logout</button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-50 flex items-center gap-4">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
        >
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600" />}
        </button>
        <button onClick={toggleMenu} className="text-2xl dark:text-white p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 w-full bg-white dark:bg-dark border-b border-gray-200 dark:border-gray-800 shadow-xl md:hidden flex flex-col p-4 z-40"
          >
            {navLinks.map((link) => (
              <HashLink 
                key={link.name}
                smooth 
                to={link.to} 
                onClick={toggleMenu} 
                className="py-3 text-lg font-medium text-center hover:text-blue-500 transition-colors border-b border-gray-100 dark:border-gray-800 last:border-none"
              >
                {link.name}
              </HashLink>
            ))}
            
            {user && (
              <button 
                onClick={() => { logout(); toggleMenu(); }} 
                className="py-3 text-lg font-medium text-red-500 hover:text-red-600 transition-colors"
              >
                Logout
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
