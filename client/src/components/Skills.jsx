import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { FaCode, FaServer, FaTools, FaLayerGroup } from 'react-icons/fa';

const Skills = () => {
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await api.get('/portfolio/skills');
        setSkills(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSkills();
  }, []);

  const categories = [
    { name: 'Frontend', icon: <FaCode />, color: 'text-blue-500' },
    { name: 'Backend', icon: <FaServer />, color: 'text-green-500' },
    { name: 'Tools', icon: <FaTools />, color: 'text-yellow-500' },
    { name: 'Other', icon: <FaLayerGroup />, color: 'text-purple-500' }
  ];

  return (
    <section id="skills" className="py-20 px-6 md:px-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Technical Skills</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((cat, catIndex) => {
            const catSkills = skills.filter(s => s.category === cat.name);
            if (catSkills.length === 0) return null;

            return (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: catIndex * 0.1 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg"
              >
                <div className={`text-3xl mb-4 ${cat.color}`}>{cat.icon}</div>
                <h3 className="text-xl font-bold mb-6 dark:text-white">{cat.name}</h3>
                
                <div className="space-y-4">
                  {catSkills.map(skill => (
                    <div key={skill._id}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium dark:text-gray-300">{skill.name}</span>
                        <span className="text-sm text-gray-500">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className={`h-2 rounded-full ${
                            cat.name === 'Frontend' ? 'bg-blue-500' :
                            cat.name === 'Backend' ? 'bg-green-500' :
                            cat.name === 'Tools' ? 'bg-yellow-500' : 'bg-purple-500'
                          }`}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
