import React from 'react';

const Sidebar = ({ topics, currentTopic, setCurrentTopic, isSidebarOpen, setIsSidebarOpen }) => (
  <div
    className={`fixed md:static z-40 transform ${
      isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } transition-transform duration-300 ease-in-out md:translate-x-0 w-64 md:w-1/4 bg-gray-800 text-white p-4 border-r h-full`}
  >
    <h2 className="text-xl font-semibold mb-4">Topics</h2>
    <ul>
      {Object.keys(topics).map((key) => (
        <li key={key} className="mb-2">
          <button
            onClick={() => {
              setCurrentTopic(key);
              setIsSidebarOpen(false);
            }}
            className={`w-full text-left px-4 py-2 rounded ${
              currentTopic === key ? 'bg-blue-500 text-white' : 'bg-gray-700'
            }`}
          >
            {key.replace(/([A-Z])/g, ' $1').trim()}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default Sidebar;
