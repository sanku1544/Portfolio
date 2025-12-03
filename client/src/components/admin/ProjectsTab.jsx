import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import ImageUpload from './ImageUpload';
import api from '../../api/axios';

const ProjectsTab = () => {
  const { user } = useContext(AuthContext);
  const [projects, setProjects] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  
  const initialFormState = {
    title: '',
    description: '',
    image: '',
    techStack: '',
    liveLink: '',
    githubLink: ''
  };
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
      try {
        const res = await api.get('/portfolio/projects');
      setProjects(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await api.delete(`/portfolio/projects/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchProjects();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setCurrentProject(project);
    setFormData({
      ...project,
      techStack: project.techStack.join(', ')
    });
  };

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentProject(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      techStack: formData.techStack.split(',').map(item => item.trim())
    };

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      if (currentProject) {
        await axios.put(`http://localhost:5000/api/portfolio/projects/${currentProject._id}`, dataToSend, config);
      } else {
        await axios.post('http://localhost:5000/api/portfolio/projects', dataToSend, config);
      }
      setIsEditing(false);
      fetchProjects();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">Projects</h2>
        {!isEditing && (
          <button onClick={handleAddNew} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            <FaPlus /> Add Project
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Project Title</label>
              <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Description</label>
              <textarea required rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
            </div>
            
            <div className="md:col-span-2">
              <ImageUpload 
                label="Project Image" 
                currentImage={formData.image} 
                onUpload={(url) => setFormData(prev => ({ ...prev, image: url }))} 
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Tech Stack (comma separated)</label>
              <input type="text" placeholder="React, Node.js, MongoDB" value={formData.techStack} onChange={e => setFormData({...formData, techStack: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">Live Demo Link</label>
              <input type="text" value={formData.liveLink} onChange={e => setFormData({...formData, liveLink: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">GitHub Link</label>
              <input type="text" value={formData.githubLink} onChange={e => setFormData({...formData, githubLink: e.target.value})} className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
            </div>
          </div>
          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Save Project</button>
            <button type="button" onClick={() => setIsEditing(false)} className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancel</button>
          </div>
        </form>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {projects.map(project => (
            <div key={project._id} className="flex justify-between items-center p-4 border rounded dark:border-gray-700">
              <div className="flex items-center gap-4">
                <img src={project.image} alt={project.title} className="w-16 h-16 object-cover rounded" />
                <div>
                  <h3 className="font-bold dark:text-white">{project.title}</h3>
                  <p className="text-sm text-gray-500">{project.techStack.join(', ')}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(project)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700 rounded"><FaEdit /></button>
                <button onClick={() => handleDelete(project._id)} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700 rounded"><FaTrash /></button>
              </div>
            </div>
          ))}
          {projects.length === 0 && <p className="text-center text-gray-500">No projects found.</p>}
        </div>
      )}
    </div>
  );
};

export default ProjectsTab;
