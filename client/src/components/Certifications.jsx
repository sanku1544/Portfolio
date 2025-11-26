import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { FiExternalLink, FiAward, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Certifications = () => {
  const [certs, setCerts] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    let isMounted = true;

    const fetchCerts = async () => {
      try {
        const response = await api.get('/portfolio/certifications');
        if (isMounted) {
          setCerts(response.data);
        }
      } catch (error) {
        console.error('Failed to load certifications', error);
      }
    };

    fetchCerts();
    return () => {
      isMounted = false;
    };
  }, []);

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
  };

  return (
    <section
      id="certifications"
      className="py-20 px-6 md:px-10 bg-white dark:bg-dark text-gray-900 dark:text-white transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Certifications
        </motion.h2>

        <div className="relative mt-8">
          <button
            onClick={() => scroll(-1)}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Scroll left"
          >
            <FiChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={() => scroll(1)}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            aria-label="Scroll right"
          >
            <FiChevronRight className="w-6 h-6" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide"
            style={{ scrollPadding: '0 1.5rem' }}
          >
            {certs.map((c, i) => (
              <motion.div
                key={c._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="flex-none w-80 snap-start bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-2xl transition-shadow"
              >
                <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-gray-900 rounded-t-2xl">
                  {c.image ? (
                    <img src={c.image} alt={c.name} className="h-full w-full object-contain" />
                  ) : (
                    <FiAward className="text-5xl text-blue-500" />
                  )}
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white">{c.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-300">{c.organization}</p>
                    </div>
                    <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                      {c.date}
                    </span>
                  </div>

                  {c.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-3 line-clamp-2">
                      {c.description}
                    </p>
                  )}

                  <div className="mt-4 flex justify-end">
                    {c.link ? (
                      <a
                        href={c.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600 dark:bg-blue-500 text-white text-sm hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors"
                      >
                        <FiExternalLink />
                        Verify
                      </a>
                    ) : (
                      <span className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 text-sm">
                        Private
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {certs.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 mt-8">
            No certifications to display.
          </p>
        )}
      </div>
    </section>
  );
};

export default Certifications;