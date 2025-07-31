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
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [longPressTimeout, setLongPressTimeout] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formatDialogue = (text) =>
    text.split('\n').map((line) => {
      const [character, content] = line.split(': ');
      return { character: character || '', text: content || character };
    });

  // Enhanced text selection for desktop
  const handleTextSelection = () => {
    if (isMobile) return; // Skip for mobile, use touch events instead
    
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    
    if (/^[a-zA-Z]+$/.test(selectedText) && selectedText.length > 1) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedWord(selectedText);
      setPopupPosition({ 
        x: rect.left + rect.width / 2, 
        y: rect.bottom + window.scrollY 
      });
    }
  };

  // Mobile touch handlers
  const handleTouchStart = (e) => {
    if (!isMobile) return;
    
    setTouchStartTime(Date.now());
    
    // Clear any existing timeout
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
    }
    
    // Set up long press detection
    const timeout = setTimeout(() => {
      handleLongPress(e);
    }, 500); // 500ms for long press
    
    setLongPressTimeout(timeout);
  };

  const handleTouchEnd = (e) => {
    if (!isMobile) return;
    
    // Clear long press timeout
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
    
    const touchDuration = Date.now() - touchStartTime;
    
    // If it was a quick tap (not a long press), check for word selection
    if (touchDuration < 500) {
      handleMobileTap(e);
    }
  };

  const handleTouchMove = (e) => {
    if (!isMobile) return;
    
    // Cancel long press if user moves finger
    if (longPressTimeout) {
      clearTimeout(longPressTimeout);
      setLongPressTimeout(null);
    }
  };

  const handleLongPress = (e) => {
    // Enable text selection temporarily
    document.body.style.userSelect = 'text';
    document.body.style.webkitUserSelect = 'text';
    
    // Force text selection UI on mobile
    setTimeout(() => {
      const target = e.target;
      if (target && target.nodeType === Node.TEXT_NODE) {
        const range = document.createRange();
        range.selectNodeContents(target);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    }, 50);
  };

  const handleMobileTap = (e) => {
    const target = e.target;
    if (!target) return;
    
    // Get the tapped word
    const text = target.textContent || target.innerText;
    if (!text) return;
    
    // Find word at tap position
    const rect = target.getBoundingClientRect();
    const x = e.changedTouches[0].clientX;
    const y = e.changedTouches[0].clientY;
    
    // Simple word extraction (you might want to make this more sophisticated)
    const words = text.split(/\s+/);
    const wordIndex = Math.floor((words.length * (x - rect.left)) / rect.width);
    const word = words[Math.max(0, Math.min(wordIndex, words.length - 1))];
    
    if (word && /^[a-zA-Z]+$/.test(word.replace(/[.,!?;:]$/, '')) && word.length > 1) {
      const cleanWord = word.replace(/[.,!?;:]$/, '');
      setSelectedWord(cleanWord);
      setPopupPosition({ 
        x: x, 
        y: y 
      });
    }
  };

  // Enhanced word detection for mobile double-tap
  const handleDoubleClick = (e) => {
    if (!isMobile) return;
    
    e.preventDefault();
    const target = e.target;
    const text = target.textContent || target.innerText;
    
    if (text) {
      // Create a range around the clicked word
      const selection = window.getSelection();
      const range = document.createRange();
      
      // Find word boundaries
      const textNode = target.firstChild || target;
      if (textNode.nodeType === Node.TEXT_NODE) {
        const clickX = e.clientX;
        const rect = target.getBoundingClientRect();
        const textLength = text.length;
        const charIndex = Math.floor((textLength * (clickX - rect.left)) / rect.width);
        
        // Find word start and end
        let wordStart = charIndex;
        let wordEnd = charIndex;
        
        while (wordStart > 0 && /[a-zA-Z]/.test(text[wordStart - 1])) {
          wordStart--;
        }
        while (wordEnd < textLength && /[a-zA-Z]/.test(text[wordEnd])) {
          wordEnd++;
        }
        
        const word = text.substring(wordStart, wordEnd);
        
        if (word && word.length > 1) {
          setSelectedWord(word);
          setPopupPosition({ 
            x: clickX, 
            y: e.clientY 
          });
        }
      }
    }
  };

  const closePopup = () => {
    setSelectedWord('');
    setPopupPosition(null);
    window.getSelection().removeAllRanges();
    
    // Reset text selection styles
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (selectedWord && !e.target.closest('.dictionary-popup')) {
        closePopup();
      }
    };
    
    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('touchstart', handleOutsideClick);
    
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('touchstart', handleOutsideClick);
    };
  }, [selectedWord]);

  const formattedDialogue = formatDialogue(topics[currentTopic]);

  return (
    <div className="flex h-screen pb-5 pt-20">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 touch-manipulation"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '✕ Close' : '☰'}
      </button>

      {/* Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-30 md:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
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
      <div 
        className="flex-1 overflow-auto"
        onMouseUp={handleTextSelection}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        onDoubleClick={handleDoubleClick}
        style={{
          WebkitTouchCallout: isMobile ? 'none' : 'default',
          WebkitUserSelect: isMobile ? 'none' : 'text',
          userSelect: isMobile ? 'none' : 'text'
        }}
      >
        <DialogueContent 
          dialogue={formattedDialogue} 
          onTextSelect={handleTextSelection}
          isMobile={isMobile}
        />
      </div>

      {/* Dictionary */}
      {selectedWord && popupPosition && (
        <div className="dictionary-popup">
          <DictionaryPopup 
            word={selectedWord} 
            position={popupPosition} 
            onClose={closePopup}
            isMobile={isMobile}
          />
        </div>
      )}

      {/* Mobile instruction overlay (shows briefly on first load) */}
      {isMobile && (
        <div className="fixed bottom-4 left-4 right-4 z-40 pointer-events-none">
          <div className="bg-blue-600 text-white text-sm p-3 rounded-lg shadow-lg opacity-80">
            💡 Tip: Double-tap any word for definition, or long-press to select text
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;