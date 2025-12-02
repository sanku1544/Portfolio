import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";

const Education = () => {
  const [education, setEducation] = useState([]);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await api.get("/portfolio/education");
        setEducation(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchEducation();
  }, []);

  return (
    <section id="education" className="py-20 px-6 md:px-20 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Education
        </h2>

        <div className="space-y-8">
          {education.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-dark p-6 rounded-xl shadow-lg border-l-4 border-green-500"
            >
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {edu.degree}
                  </h3>
                  <p className="text-green-600 font-medium">
                    {edu.institution}
                  </p>
                </div>
                <span className="text-gray-500 text-sm mt-2 md:mt-0">
                  {edu.year}
                </span>
              </div>

              {edu.grade && (
                <p className="text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Grade: {edu.grade}
                </p>
              )}

              {edu.description && (
                <p className="text-gray-600 dark:text-gray-300">
                  {edu.description}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
