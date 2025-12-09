import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, User, Bot, Loader2, ExternalLink, ArrowDownCircle } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi! I'm Sanket's AI Assistant. 👋 Ask me anything about his skills, projects, or experience!", 
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const quickReplies = ["Skills", "Projects", "Contact"];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async (text = input) => {
    if (!text.trim()) return;

    const userMessage = { 
      id: Date.now(), 
      text: text, 
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking and response
    setTimeout(() => {
      const botResponse = generateResponse(text);
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        text: botResponse.text, 
        action: botResponse.action,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query) => {
    const q = query.toLowerCase();
    
    if (q.includes('skill') || q.includes('stack') || q.includes('tech')) 
      return {
        text: "Sanket is proficient in the MERN stack (MongoDB, Express, React, Node.js). He also works with Tailwind CSS, Framer Motion, Java, and Git.",
        action: { type: 'scroll', target: '#skills', label: 'View Skills' }
      };
    
    if (q.includes('project') || q.includes('work') || q.includes('built')) 
      return {
        text: "He has built several impressive projects, including a Job Portal, AI Surprise Generator, and this Portfolio! Check out the Projects section for more details.",
        action: { type: 'scroll', target: '#projects', label: 'View Projects' }
      };
    
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('reach')) 
      return {
        text: "You can reach him via the Contact form below or email directly at sanketnikam1966@gmail.com. He's always open to new opportunities!",
        action: { type: 'scroll', target: '#contact', label: 'Go to Contact' }
      };
    
    if (q.includes('experience') || q.includes('job') || q.includes('history')) 
      return {
        text: "Sanket has experience building scalable web applications and working with modern frontend technologies. Check out the Experience section for his professional timeline.",
        action: { type: 'scroll', target: '#experience', label: 'View Experience' }
      };



    if (q.includes('github') || q.includes('git'))
      return {
        text: "Check out his code and contributions on GitHub!",
        action: { type: 'link', url: 'https://github.com/sanku1544', label: 'Visit GitHub' }
      };

    if (q.includes('linkedin'))
      return {
        text: "Connect with him on LinkedIn for professional updates.",
        action: { type: 'link', url: 'https://linkedin.com/in/sanket-nikam', label: 'Visit LinkedIn' } // Replace with actual LinkedIn
      };
    
    if (q.includes('hello') || q.includes('hi') || q.includes('hey')) 
      return { text: "Hello! 👋 How can I help you today? Feel free to ask about my projects or skills." };
    
    if (q.includes('about') || q.includes('who')) 
      return { 
        text: "Sanket is a passionate Full Stack Developer based in Pune, India. He loves coding, solving complex problems, and building delightful digital experiences.",
        action: { type: 'scroll', target: '#about', label: 'Read More' }
      };

    return { text: "That's an interesting question! I'm still learning, but you can ask me about Sanket's skills, projects, or contact info." };
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl shadow-2xl w-[350px] sm:w-96 mb-4 overflow-hidden border border-white/20 dark:border-gray-700 flex flex-col max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex justify-between items-center text-white shadow-md shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-full backdrop-blur-sm">
                  <Bot size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-lg">AI Assistant</h3>
                  <div className="flex items-center gap-1.5 opacity-90">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span className="text-xs">Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="hover:bg-white/20 p-2 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px]">
              {messages.map((msg) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id} 
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex flex-col max-w-[85%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div 
                      className={`p-3.5 rounded-2xl text-sm shadow-sm ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none' 
                          : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none border border-gray-100 dark:border-gray-600'
                      }`}
                    >
                      {msg.text}
                    </div>
                    
                    {/* Action Button */}
                    {msg.action && (
                      <div className="mt-2">
                        {msg.action.type === 'link' ? (
                          <a 
                            href={msg.action.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl text-xs font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                          >
                            {msg.action.label} <ExternalLink size={12} />
                          </a>
                        ) : (
                          <HashLink 
                            smooth 
                            to={msg.action.target}
                            className="flex items-center gap-2 px-4 py-2 bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-xl text-xs font-medium hover:bg-purple-100 dark:hover:bg-purple-900/50 transition-colors"
                          >
                            {msg.action.label} <ArrowDownCircle size={12} />
                          </HashLink>
                        )}
                      </div>
                    )}

                    <span className="text-[10px] text-gray-400 mt-1 px-1">
                      {msg.timestamp}
                    </span>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white dark:bg-gray-700 p-4 rounded-2xl rounded-bl-none shadow-sm border border-gray-100 dark:border-gray-600">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2 bg-gray-50/50 dark:bg-gray-900/30 flex gap-2 overflow-x-auto scrollbar-hide shrink-0">
              {quickReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleSend(reply)}
                  className="whitespace-nowrap shrink-0 px-3 py-1.5 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-700 rounded-full text-xs font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors shadow-sm"
                >
                  {reply}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white/50 dark:bg-gray-800/50 border-t border-gray-200 dark:border-gray-700 flex gap-2 backdrop-blur-sm shrink-0">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask something..."
                className="flex-1 px-4 py-2.5 rounded-full bg-white dark:bg-gray-700 dark:text-white border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm transition-all shadow-sm"
              />
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className="p-2.5 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
              >
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-xl hover:shadow-blue-500/40 transition-all flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} />}
      </motion.button>
    </div>
  );
};

export default ChatWidget;
