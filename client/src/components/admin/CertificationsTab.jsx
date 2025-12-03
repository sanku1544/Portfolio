import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ImageUpload from './ImageUpload';
import api from '../../api/axios';

const CertificationsTab = () => {
  const { user } = useContext(AuthContext);
  const [certs, setCerts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCert, setCurrentCert] = useState(null);

  const initialFormState = {
    name: '',
    organization: '',
    date: '',
    link: '',
    image: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchCerts();
  }, []);

  const fetchCerts = async () => {
    try {
      const res = await api.get('/portfolio/certifications');
      setCerts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this certification?')) {
      try {
        await axios.delete(`http://localhost:5000/api/portfolio/certifications/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchCerts();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (cert) => {
    setIsEditing(true);
    setCurrentCert(cert);
    setFormData({ ...cert });
  };

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentCert(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      if (currentCert) {
        await axios.put(`http://localhost:5000/api/portfolio/certifications/${currentCert._id}`, formData, config);
      } else {
        await axios.post('http://localhost:5000/api/portfolio/certifications', formData, config);
      }
      setIsEditing(false);
      fetchCerts();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">Certifications</h2>
        {!isEditing && (
          <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            <FaPlus /> Add Certification
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Certification Name</label>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Organization</label>
              <input type="text" required value={formData.organization} onChange={e => setFormData({...formData, organization: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Date</label>
              <input type="text" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} placeholder="e.g., Jun 2024" className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Certificate Link</label>
              <input type="text" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>

            <div className="md:col-span-2">
              <ImageUpload 
                label="Certificate Image" 
                currentImage={formData.image} 
                onUpload={(url) => setFormData(prev => ({ ...prev, image: url }))} 
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {certs.map(cert => (
            <div key={cert._id} className="flex justify-between items-center p-4 border rounded dark:border-gray-700">
              <div className="flex items-center gap-4">
                {cert.image && <img src={cert.image} alt={cert.name} className="w-16 h-16 object-cover rounded" />}
                <div>
                  <h3 className="font-bold dark:text-white">{cert.name}</h3>
                  <p className="text-sm text-gray-500">{cert.organization} • {cert.date}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(cert)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded"><FaEdit /></button>
                <button onClick={() => handleDelete(cert._id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded"><FaTrash /></button>
              </div>
            </div>
          ))}
          {certs.length === 0 && <p className="text-center text-gray-500">No certifications found.</p>}
        </div>
      )}
    </div>
  );
};

export default CertificationsTab;


