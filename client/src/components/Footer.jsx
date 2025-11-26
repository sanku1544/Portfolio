import React, { useState, useEffect } from 'react';
import api from '../api/axios';
import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';

const Footer = () => {
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

  const locationText = data?.location || 'Pune, India';
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationText)}`;

  return (
    <footer className="bg-white dark:bg-dark border-t border-gray-200 dark:border-gray-800 py-16 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
            {data?.name || 'Sanket Nikam'}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            Crafting delightful digital experiences and scalable systems for web & mobile.
          </p>
          <div className="mt-6 flex gap-4 text-2xl text-gray-500 dark:text-gray-400">
            <a href={data?.githubUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors"><FaGithub /></a>
            <a href={data?.linkedinUrl} target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors"><FaLinkedin /></a>
            <a href={data?.instagramUrl} target="_blank" rel="noreferrer" className="hover:text-pink-600 transition-colors"><FaInstagram /></a>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-500 dark:text-gray-400">
            {[
              { label: 'Home', href: '#home' },
              { label: 'Projects', href: '#projects' },
              { label: 'Certifications', href: '#certifications' },
              { label: 'Contact', href: '#contact' },
            ].map((link) => (
              <li key={link.label}>
                <a href={link.href} className="hover:text-blue-600 transition-colors">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Contact</h3>
          <div className="space-y-3 text-gray-500 dark:text-gray-300">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-blue-500" />
              <a href={`mailto:${data?.email || 'hello@sanket.com'}`} className="hover:text-blue-600 transition-colors">
                {data?.email || 'hello@sanket.com'}
              </a>
            </p>
            <p className="flex items-center gap-3">
              <FaPhone className="text-blue-500" />
              <a href={`tel:${data?.phone || '+91-7720058578'}`} className="hover:text-blue-600 transition-colors">
                {data?.phone || '+91-7720058578'}
              </a>
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 dark:text-white">Location</h3>
          <p className="flex items-center gap-3 text-gray-500 dark:text-gray-300">
            <FaMapMarkerAlt className="text-blue-500" />
            {locationText}
          </p>
          <p className="mt-3 text-sm text-gray-400">
            Available for on-site collaboration in {locationText.split(',')[0]} and remote projects worldwide.
          </p>
          <a
            href={mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-5 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors"
          >
            View on Maps
          </a>
        </div>
      </div>
      
      <div className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-8">
        <p className="flex items-center justify-center gap-1">
          © {new Date().getFullYear()} Made with <FaHeart className="text-red-500" /> by {data?.name || 'Sanket Nikam'}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
