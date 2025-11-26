import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import ImageUpload from './ImageUpload';

const GeneralTab = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    location: '',
    aboutDescription: '',
    heroImage: '',
    aboutImage: '',
    githubUrl: '',
    linkedinUrl: '',
    instagramUrl: '',
    email: '',
    phone: '',
    resumeUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetchGeneralInfo();
  }, []);

  const fetchGeneralInfo = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/portfolio/general');
      if (res.data) setFormData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };
      await axios.put('http://localhost:5000/api/portfolio/general', formData, config);
      setMsg('Profile updated successfully!');
      setTimeout(() => setMsg(''), 3000);
    } catch (error) {
      console.error(error);
      setMsg('Error updating profile');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-6 dark:text-white">General Information</h2>
      {msg && <p className={`mb-4 ${msg.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>{msg}</p>}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Full Name</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Role / Title</label>
            <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="City, Country" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">About Description</label>
            <textarea name="aboutDescription" rows="4" value={formData.aboutDescription} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
          </div>
          
          <ImageUpload 
            label="Hero Image" 
            currentImage={formData.heroImage} 
            onUpload={(url) => setFormData(prev => ({ ...prev, heroImage: url }))} 
          />
          
          <ImageUpload 
            label="About Image" 
            currentImage={formData.aboutImage} 
            onUpload={(url) => setFormData(prev => ({ ...prev, aboutImage: url }))} 
          />

          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">GitHub URL</label>
            <input type="text" name="githubUrl" value={formData.githubUrl} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">LinkedIn URL</label>
            <input type="text" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Instagram URL</label>
            <input type="text" name="instagramUrl" value={formData.instagramUrl} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <ImageUpload 
            label="Resume (PDF)" 
            currentImage={formData.resumeUrl} 
            onUpload={(url) => setFormData(prev => ({ ...prev, resumeUrl: url }))} 
          />
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Contact Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Phone</label>
            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
        </div>
        <button type="submit" disabled={loading} className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default GeneralTab;
