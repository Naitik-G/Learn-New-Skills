import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigationItems = [
    {
      id: 'home',
      title: 'Home',
      icon: '🏠',
      path: '/'
    },
    {
      id: 'convo',
      title: 'Conversations',
      icon: '💬',
      path: '/conversation'
    },
    {
      id: 'speech',
      title: 'Pronunciation',
      icon: '🎤',
      path: '/prounctiationtraniner'
    },
    {
      id: 'quiz',
      title: 'Quiz',
      icon: '🎤',
      path: '/quizpage'
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation('/')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">LNS</span>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Learn New Skills
            </h1>
          </div>
          
          {/* Navigation Items */}
          <div className="flex space-x-1">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.path)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="hidden sm:inline text-sm font-medium">{item.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;