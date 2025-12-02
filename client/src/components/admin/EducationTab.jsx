import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";

const EducationTab = () => {
  const { user } = useContext(AuthContext);
  const [education, setEducation] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentEdu, setCurrentEdu] = useState(null);

  const initialFormState = {
    institution: "",
    degree: "",
    year: "",
    grade: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchEducation();
  }, []);

  const fetchEducation = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/portfolio/education");
      setEducation(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this education record?")) {
      try {
        await axios.delete(`http://localhost:5000/api/portfolio/education/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        fetchEducation();
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleEdit = (edu) => {
    setIsEditing(true);
    setCurrentEdu(edu);
    setFormData({ ...edu });
  };

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentEdu(null);
    setFormData(initialFormState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { headers: { Authorization: `Bearer ${user.token}` } };

    try {
      if (currentEdu) {
        await axios.put(
          `http://localhost:5000/api/portfolio/education/${currentEdu._id}`,
          formData,
          config
        );
      } else {
        await axios.post("http://localhost:5000/api/portfolio/education", formData, config);
      }
      setIsEditing(false);
      fetchEducation();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold dark:text-white">Education</h2>
        {!isEditing && (
          <button
            onClick={handleAddNew}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            <FaPlus /> Add Education
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Institution
              </label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Degree
              </label>
              <input
                type="text"
                required
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Year
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 2020 - 2023"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Grade / Percentage (Optional)
              </label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1 dark:text-gray-300">
                Description (Optional)
              </label>
              <textarea
                rows="3"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              ></textarea>
            </div>
          </div>

          <div className="flex gap-4">
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Save Education
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          {education.map((edu) => (
            <div
              key={edu._id}
              className="p-4 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg dark:text-white">{edu.degree}</h3>
                  <p className="text-green-600 dark:text-green-400 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                    {edu.year}
                  </p>
                  {edu.grade && (
                    <p className="text-gray-700 dark:text-gray-300 font-medium">
                      Grade: {edu.grade}
                    </p>
                  )}
                  {edu.description && (
                    <p className="text-gray-600 dark:text-gray-300 mt-2">{edu.description}</p>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(edu)}
                    className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-gray-600 rounded"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
                    className="p-2 text-red-600 hover:bg-red-100 dark:hover:bg-gray-600 rounded"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {education.length === 0 && (
            <p className="text-center text-gray-500">No education records found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default EducationTab;
