import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { FaTrash, FaEnvelope } from 'react-icons/fa';
import api from '../../api/axios';

const MessagesTab = () => {
  const { user } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await api.get('/portfolio/messages', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setMessages(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axios.delete(`http://localhost:5000/api/portfolio/messages/${id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchMessages();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-bold mb-6 dark:text-white">Messages</h2>
      
      <div className="space-y-4">
        {messages.map(msg => (
          <div key={msg._id} className="p-4 border rounded dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" />
                <span className="font-bold dark:text-white">{msg.name}</span>
                <span className="text-sm text-gray-500">&lt;{msg.email}&gt;</span>
              </div>
              <span className="text-xs text-gray-400">{new Date(msg.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{msg.message}</p>
            <div className="mt-4 flex justify-end">
              <button onClick={() => handleDelete(msg._id)} className="text-red-500 hover:text-red-700 text-sm flex items-center gap-1">
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
        {messages.length === 0 && <p className="text-center text-gray-500">No messages found.</p>}
      </div>
    </div>
  );
};

export default MessagesTab;
