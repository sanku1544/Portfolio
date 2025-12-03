import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ darkMode, setDarkMode }) => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  const menuVariants = {
    closed: { opacity: 0, x: "100%" },
    open: { opacity: 1, x: 0 }
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 w-full  p-4 flex justify-between items-center bg-white/80 dark:bg-dark/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800"
    >
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent z-50">
        Sanket Nikam
      </Link>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
        <Link to="/projects" className="hover:text-blue-500 transition-colors">Projects</Link>
        <Link to="/contact" className="hover:text-blue-500 transition-colors">Contact</Link>
        
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
        >
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600" />}
        </button>

        {user && (
          <button onClick={logout} className="text-red-500 text-sm font-medium">Logout</button>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden z-50 flex items-center gap-4">
        <button 
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-800"
        >
          {darkMode ? <FaSun className="text-yellow-500" /> : <FaMoon className="text-gray-600" />}
        </button>
        <button onClick={toggleMenu} className="text-2xl dark:text-white">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 bg-white dark:bg-dark flex flex-col items-center justify-center gap-8 md:hidden z-40"
          >
            <Link to="/" onClick={toggleMenu} className="text-2xl font-medium hover:text-blue-500">Home</Link>
            <Link to="/projects" onClick={toggleMenu} className="text-2xl font-medium hover:text-blue-500">Projects</Link>
            <Link to="/contact" onClick={toggleMenu} className="text-2xl font-medium hover:text-blue-500">Contact</Link>
            {user && (
              <button onClick={() => { logout(); toggleMenu(); }} className="text-2xl font-medium text-red-500">Logout</button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
