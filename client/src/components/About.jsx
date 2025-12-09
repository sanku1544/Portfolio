import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';

const About = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/portfolio/general');
        setData(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // Convert Cloudinary URL to downloadable PDF format
  const getDownloadableResumeUrl = (url) => {
    if (!url) return '#';
    
    // If it's a Cloudinary URL, modify it for PDF download
    if (url.includes('cloudinary.com')) {
      // For PDFs, Cloudinary stores them as 'image' type but we need to change to 'raw'
      // Change from: /image/upload/ to /raw/upload/
      let downloadUrl = url.replace('/image/upload/', '/raw/upload/');
      
      // If it's already /raw/upload/, just return it
      if (url.includes('/raw/upload/')) {
        downloadUrl = url;
      }
      
      return downloadUrl;
    }
    
    return url;
  };

  return (
    <section id="about" className="py-20 px-6 md:px-20 bg-white dark:bg-dark">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">About Me</h2>
        
        <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-center">
          <div className="md:w-1/2 w-full">
            <img 
              src={data?.aboutImage || "https://via.placeholder.com/500"} 
              alt="About" 
              className="rounded-2xl shadow-2xl w-full object-cover h-64 sm:h-80 md:h-[400px]"
            />
          </div>
          
          <div className="md:w-1/2 space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              {data?.aboutDescription || "I am a passionate Full Stack Developer with a knack for building beautiful and functional web applications. I love learning new technologies and solving complex problems."}
            </p>
            
            <div className="flex flex-wrap gap-3">
              {['MongoDB', 'React', 'Java', 'Tailwind', 'Git'].map((tech) => (
                <span key={tech} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm font-medium text-blue-600 dark:text-blue-400">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              {data?.resumeUrl && (
                <a 
                  href={getDownloadableResumeUrl(data.resumeUrl)} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  Download Resume
                </a>
              )}
             
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
