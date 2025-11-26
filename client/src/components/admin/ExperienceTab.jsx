import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';

const ExperienceTab = () => {
  const { user } = useContext(AuthContext);
  const [experiences, setExperiences] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExp, setCurrentExp] = useState(null);
  
  const initialFormState = {
    role: '',
    company: '',
    duration: '',
    description: '',
    technologies: '',
    order: 0
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/portfolio/experience');
      setExperiences(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      try {
        await axios.delete(`http://localhost:5000/api/portfolio/experience/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchExperiences();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (exp) => {
    setIsEditing(true);
    setCurrentExp(exp);
    setFormData({
      ...exp,
      technologies: exp.technologies.join(', ')
    });
  };

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentExp(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      technologies: formData.technologies.split(',').map(item => item.trim())
    };

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      if (currentExp) {
        await axios.put(`http://localhost:5000/api/portfolio/experience/${currentExp._id}`, dataToSend, config);
      } else {
        await axios.post('http://localhost:5000/api/portfolio/experience', dataToSend, config);
      }
      setIsEditing(false);
      fetchExperiences();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">Experience</h2>
        {!isEditing && (
          <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            <FaPlus /> Add Experience
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Role / Job Title</label>
              <input type="text" required value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Company</label>
              <input type="text" required value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Duration</label>
              <input type="text" required placeholder="e.g. Jan 2023 - Present" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Order (Sort Priority)</label>
              <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
              <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Technologies (comma separated)</label>
              <input type="text" value={formData.technologies} onChange={e => setFormData({...formData, technologies: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Experience</button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {experiences.map(exp => (
            <div key={exp._id} className="p-4 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg dark:text-white">{exp.role}</h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{exp.duration}</p>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{exp.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologies.map((tech, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-white dark:bg-gray-600 rounded border dark:border-gray-500">{tech}</span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(exp)} className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-600 rounded"><FaEdit /></button>
                  <button onClick={() => handleDelete(exp._id)} className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-gray-600 rounded"><FaTrash /></button>
                </div>
              </div>
            </div>
          ))}
          {experiences.length === 0 && <p className="text-center text-gray-500">No experience records found.</p>}
        </div>
      )}
    </div>
  );
};

export default ExperienceTab;
