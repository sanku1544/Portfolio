import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import api from '../../api/axios';

const SkillsTab = () => {
  const { user } = useContext(AuthContext);
  const [skills, setSkills] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSkill, setCurrentSkill] = useState(null);
  
  const initialFormState = {
    name: '',
    category: 'Frontend',
    proficiency: 50
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/portfolio/skills');
      setSkills(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this skill?')) {
      try {
        await api.delete(`/portfolio/skills/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchSkills();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (skill) => {
    setIsEditing(true);
    setCurrentSkill(skill);
    setFormData(skill);
  };

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentSkill(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      if (currentSkill) {
        await api.put(`/portfolio/skills/${currentSkill._id}`, formData, config);
      } else {
        await api.post('/portfolio/skills', formData, config);
      }
      setIsEditing(false);
      fetchSkills();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">Skills</h2>
        {!isEditing && (
          <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            <FaPlus /> Add Skill
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Skill Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Category</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Tools">Tools</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 dark:text-gray-300">Proficiency ({formData.proficiency}%)</label>
            <input type="range" min="0" max="100" value={formData.proficiency} onChange={e => setFormData({...formData, proficiency: e.target.value})} className="w-full" />
          </div>
          
          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Skill</button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map(skill => (
            <div key={skill._id} className="flex justify-between items-center p-4 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
              <div>
                <h3 className="font-bold dark:text-white">{skill.name}</h3>
                <p className="text-sm text-gray-500">{skill.category} • {skill.proficiency}%</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(skill)} className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-600 rounded"><FaEdit /></button>
                <button onClick={() => handleDelete(skill._id)} className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-gray-600 rounded"><FaTrash /></button>
              </div>
            </div>
          ))}
          {skills.length === 0 && <p className="text-center text-gray-500 col-span-full">No skills found.</p>}
        </div>
      )}
    </div>
  );
};

export default SkillsTab;
