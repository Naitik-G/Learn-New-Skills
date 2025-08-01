import React, { useState, useEffect } from "react";
import DictionaryPopup from "../components/DictionaryPopup";
import Sidebar from "../components/Sidebar";
import DialogueContent from "../components/DialogueContent";
import { topics } from "../utils/convoData";

const Conversation = () => {
  const [currentTopic, setCurrentTopic] = useState("greenChemistry");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState("");
  const [popupPosition, setPopupPosition] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device on load and resize
  useEffect(() => {
    const checkMobile = () => {
      const mobile =
        window.innerWidth <= 768 ||
        /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(mobile);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const formatDialogue = (text) =>
    text.split("\n").map((line) => {
      const [character, content] = line.split(": ");
      return { character: character || "", text: content || character };
    });

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString().trim();
    if (/^[a-zA-Z]+$/.test(selectedText) && selectedText.length > 1) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      setSelectedWord(selectedText);
      setPopupPosition({
        x: rect.left + rect.width / 2,
        y: rect.bottom + window.scrollY,
      });
    } else {
      closePopup();
    }
  };

  const closePopup = () => {
    setSelectedWord("");
    setPopupPosition(null);
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }
  };

  // Handle outside clicks to close popup
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (selectedWord && !e.target.closest(".dictionary-popup")) {
        closePopup();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("touchstart", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [selectedWord]);

  const formattedDialogue = formatDialogue(topics[currentTopic]);

  return (
    <div className="flex h-screen pb-5 pt-20">
      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-10 left-1/2 transform -translate-x-1/2 z-50 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 touch-manipulation"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? "✕ Close" : "☰"}
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
        onTouchEnd={handleTextSelection}
      >
        <DialogueContent dialogue={formattedDialogue} />
      </div>

      {/* Dictionary Popup */}
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

      {/* Mobile Tip Overlay */}
      {isMobile && (
        <div className="fixed bottom-4 left-4 right-4 z-40 pointer-events-none">
          <div className="bg-blue-600 text-white text-sm p-3 rounded-lg shadow-lg opacity-80">
            💡 Tip: Select any word for a definition!
          </div>
        </div>
      )}
    </div>
  );
};

export default Conversation;
