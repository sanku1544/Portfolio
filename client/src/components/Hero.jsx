import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import api from '../api/axios';
import { FaGithub, FaLinkedin, FaInstagram, FaArrowDown } from 'react-icons/fa';

const Hero = () => {
  const [data, setData] = useState(null);
  const [githubRepos, setGithubRepos] = useState(null);
  const [projectsCount, setProjectsCount] = useState(null);

  const formatCount = (count) => {
    if (count === null) return 'Loading...';
    return count > 5 ? '5+' : count;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/portfolio/general');
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchGithubData = async () => {
      try {
        const res = await axios.get('https://api.github.com/users/sanku1544');
        setGithubRepos(res.data.public_repos);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
        setGithubRepos(0);
      }
    };

    const fetchProjectsCount = async () => {
      try {
        const res = await api.get('/portfolio/projects');
        setProjectsCount(res.data.length);
      } catch (error) {
        console.error('Error fetching projects count:', error);
        setProjectsCount(0);
      }
    };

    fetchData();
    fetchGithubData();
    fetchProjectsCount();
  }, []);

  // Floating shapes animation
  const floatingShapes = Array(5).fill(null).map((_, i) => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
    scale: Math.random() * 0.5 + 0.5,
    duration: Math.random() * 10 + 10
  }));

  return (
    <section id="top" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white dark:bg-dark transition-colors duration-300 pt-20 md:pt-0">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingShapes.map((shape, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-30 dark:opacity-10"
            style={{
              background: i % 2 === 0 ? '#3B82F6' : '#8B5CF6',
              width: `${shape.scale * 300}px`,
              height: `${shape.scale * 300}px`,
              top: `${shape.y}%`,
              left: `${shape.x}%`,
            }}
            animate={{
              x: [0, 50, -50, 0],
              y: [0, -50, 50, 0],
            }}
            transition={{
              duration: shape.duration,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-0">
        <div className="md:w-1/2 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-4 border border-blue-200 dark:border-blue-800">
              Available for Hire
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 leading-tight dark:text-white">
              Building <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Digital Experiences
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
              I'm {data?.name || 'Sanket Nikam'}, a {data?.role || 'Full Stack Developer'} crafting beautiful, high-performance web applications with modern technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#projects" 
                className="px-8 py-4 bg-blue-600 text-white rounded-full font-semibold shadow-lg shadow-blue-500/30 hover:bg-blue-700 transition-all"
              >
                View My Work
              </motion.a>
              <motion.a 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="#contact" 
                className="px-8 py-4 border border-gray-300 dark:border-gray-700 rounded-full font-semibold hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-white transition-all"
              >
                Contact me
              </motion.a>
            </div>

            <div className="mt-12 flex gap-6 justify-center md:justify-start text-2xl text-gray-500 dark:text-gray-400">
              <a href={data?.githubUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:-translate-y-1 transition-all"><FaGithub /></a>
              <a href={data?.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 hover:-translate-y-1 transition-all"><FaLinkedin /></a>
              {/* <a href={data?.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-pink-600 hover:-translate-y-1 transition-all"><FaInstagram /></a> */}
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex justify-center relative w-full"
        >
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[500px] md:h-[500px]">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full border-2 border-dashed border-blue-200 dark:border-gray-700"
            />
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-4 rounded-full border border-purple-200 dark:border-gray-800"
            />
            
            <div className="absolute inset-10 rounded-full overflow-hidden shadow-2xl border-4 border-white dark:border-gray-800 bg-white dark:bg-gray-900">
              <img 
                src={data?.heroImage || "https://res.cloudinary.com/dkv2hkjzr/image/upload/v1764158791/portfolio_krishna/cfoezwcj7kezej3k8ouw.jpg"} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
            </div>

            {/* Floating Cards - Visible on all screens */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-4 -right-2 sm:top-10 sm:-right-4 bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-20"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg text-blue-600">
                  <FaGithub className="text-lg sm:text-xl" />
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Public Repos</p>
                  <p className="text-sm sm:text-base font-bold dark:text-white">{formatCount(githubRepos)}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ repeat: Infinity, duration: 5, delay: 1 }}
              className="absolute -bottom-4 -left-2 sm:bottom-20 sm:-left-4 bg-white dark:bg-gray-800 p-2 sm:p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 z-20"
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1.5 sm:p-2 bg-green-100 dark:bg-green-900/50 rounded-lg text-green-600">
                  <span className="text-lg sm:text-xl">💻</span>
                </div>
                <div>
                  <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400">Projects</p>
                  <p className="text-sm sm:text-base font-bold dark:text-white">{formatCount(projectsCount)}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-400 dark:text-gray-600 hidden md:block"
      >
        <FaArrowDown />
      </motion.div>
    </section>
  );
};

export default Hero;
