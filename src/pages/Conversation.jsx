import React, { useState } from 'react';
import { topics } from '../utils/convoData.js';

const Conversation = () => {
  const [currentTopic, setCurrentTopic] = useState('greenChemistry');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const formatDialogue = (dialogue) => {
    return dialogue.split('\n').map((line, index) => {
      const [character, text] = line.split(': ');
      return { character: character || '', text: text || character };
    });
  };

  const formattedDialogue = formatDialogue(topics[currentTopic]);

  return (
    <div className="flex h-screen pb-5 pt-20">
       <button
        className="md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition-colors"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '✕ Close' : '☰ Menu'}
      </button>

      {/* Blur Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static z-40 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:translate-x-0 w-64 md:w-1/4  p-4 border-r h-full`}
      >
        <h2 className="text-xl font-semibold mb-4">Topics</h2>
        <ul>
          {Object.keys(topics).map((topicKey) => (
            <li key={topicKey} className="mb-2">
              <button
                onClick={() => {
                  setCurrentTopic(topicKey);
                  setIsSidebarOpen(false);
                }}
                className={` w-full text-left px-4 py-2 rounded ${
                  currentTopic === topicKey ? 'bg-blue-500 text-white' : 'bg-gray-700'
                }`}
              >
                {topicKey.replace(/([A-Z])/g, ' $1').trim()}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 max-w-4xl mx-auto shadow rounded-lg md:ml-0">
        {formattedDialogue.map((line, index) => (
          <p key={index} className="mb-2">
            <strong>{line.character && `${line.character}: `}</strong>{line.text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Conversation;
