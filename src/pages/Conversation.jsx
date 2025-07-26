import React, { useState, useRef, useEffect } from 'react';
import DictionaryPopup from '../components/DictionaryPopup';
import Sidebar from '../components/Sidebar';
import DialogueContent from '../components/DialogueContent';
import { topics } from '../utils/convoData';

const Conversation = () => {
  const [currentTopic, setCurrentTopic] = useState('greenChemistry');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState('');
  const [popupPosition, setPopupPosition] = useState(null);

  const formatDialogue = (text) =>
    text.split('\n').map((line) => {
      const [character, content] = line.split(': ');
      return { character: character || '', text: content || character };
    });

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (/^[a-zA-Z]+$/.test(selectedText)) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedWord(selectedText);
      setPopupPosition({ x: rect.left + rect.width / 2, y: rect.bottom });
    }
  };

  const closePopup = () => {
    setSelectedWord('');
    setPopupPosition(null);
    window.getSelection().removeAllRanges();
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (selectedWord && !e.target.closest('.dictionary-popup')) {
        closePopup();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [selectedWord]);

  const formattedDialogue = formatDialogue(topics[currentTopic]);

  return (
    <div className="flex h-screen pb-5 pt-20">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '✕ Close' : '☰ Menu'}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <Sidebar
        topics={topics}
        currentTopic={currentTopic}
        setCurrentTopic={setCurrentTopic}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* Content */}
      <DialogueContent dialogue={formattedDialogue} onTextSelect={handleTextSelection} />

      {/* Dictionary */}
      {selectedWord && popupPosition && (
        <div className="dictionary-popup">
          <DictionaryPopup word={selectedWord} position={popupPosition} onClose={closePopup} />
        </div>
      )}
    </div>
  );
};

export default Conversation;
