import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // Import these hooks

const Sections = () => {
  const navigate = useNavigate(); // Initialize navigate
  const location = useLocation(); // Initialize location
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    // No need to set currentPath here if using navigate for routing
  }, []);

  // Use the navigate function directly
  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Content */}
      <div className={`pt-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Pass navigate and location as props to Home */}
        <Home navigate={navigate} location={location} /> 
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button 
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
          onClick={() => handleNavigation('/prounctiationtraniner')} // Corrected path
        >
          <span className="text-2xl group-hover:rotate-12 transition-transform duration-300">🚀</span>
        </button>
      </div>
    </div>
  );
};

// Home Component with updated navigation links
const Home = ({ navigate, location }) => { // Receive navigate and location as props
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleFeatureClick = (path) => {
    navigate(path); // Use navigate from props
  };

  const features = [
    {
      icon: '🗣️',
      title: 'Pronunciation Practice',
      description: 'Improve your English pronunciation with AI-powered feedback',
      color: 'from-blue-500 to-cyan-500',
      path: '/prounctiationtraniner'
    },
    {
      icon: '💬',
      title: 'Interactive Conversations',
      description: 'Practice real-world conversations with guided scenarios',
      color: 'from-purple-500 to-pink-500',
      path: '/conversation'
    },
    {
      icon: '📚',
      title: 'Learning Topics',
      description: 'Explore various topics to expand your vocabulary',
      color: 'from-green-500 to-teal-500',
      path: '/topics'
    },
    {
      icon: '🎯',
      title: 'Progress Tracking',
      description: 'Monitor your improvement with detailed analytics',
      color: 'from-orange-500 to-red-500',
      path: '/progress'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <div className="mb-8">
              <div className="inline-block p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🎓</span>
                </div>
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Master English
                </span>
                <br />
                <span className="text-white">Speaking Skills</span>
              </h1>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Transform your English speaking abilities with AI-powered practice, interactive conversations, and personalized feedback
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={() => handleFeatureClick('/prounctiationtraniner')} // Corrected path
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                🚀 Start Learning Now
              </button>
              <button 
                onClick={() => handleFeatureClick('/progress')}
                className="border border-gray-600 text-gray-300 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-all duration-300"
              >
                📊 View Progress
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400 mb-2">1000+</div>
                <div className="text-gray-400">Practice Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400 mb-2">50+</div>
                <div className="text-gray-400">Learning Topics</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-pink-400 mb-2">95%</div>
                <div className="text-gray-400">Accuracy Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Experience the future of language learning with cutting-edge technology and personalized instruction
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              onClick={() => handleFeatureClick(feature.path)}
              className="group relative bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 hover:bg-gray-700/50 transition-all duration-300 hover:scale-105 border border-gray-700 hover:border-gray-600 cursor-pointer"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${feature.color} rounded-t-xl`}></div>
              <div className="text-center">
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Goal Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-lg rounded-2xl p-8 border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4">
                🎯 Today's Learning Goal
              </h3>
              <p className="text-gray-300 mb-6">
                Practice for 15 minutes daily to see significant improvement in your English speaking skills
              </p>
              <div className="bg-gray-700 rounded-lg p-4 mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Daily Progress</span>
                  <span className="text-sm text-blue-400">8/15 minutes</span>
                </div>
                <div className="w-full bg-gray-600 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300" style={{width: '53%'}}></div>
                </div>
              </div>
              <button 
                onClick={() => handleFeatureClick('/prounctiationtraniner')} // Corrected path
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all duration-300"
              >
                Continue Learning
              </button>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">⏰</div>
              <div className="text-2xl font-bold text-white mb-2">
                {currentTime.toLocaleTimeString()}
              </div>
              <div className="text-gray-400">
                Perfect time to practice!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sections;