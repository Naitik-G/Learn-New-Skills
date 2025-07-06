// src/components/SentenceDisplay.js
import React from "react";

const SentenceDisplay = ({ currentSentence, highlightedWords, showPhonetics, showHints }) => {
  const words = currentSentence.text.split(" ");

  return (
    <div className="text-center mb-6">
      <p className="text-xl md:text-3xl font-semibold text-gray-100 mb-4 tracking-wide leading-relaxed">
        {words.map((word, index) => {
          const wordInfo = highlightedWords.find(item => item.index === index);
          const isCorrect = wordInfo ? wordInfo.correct : false;

          let className = "mx-0.5 inline-block"; // Base class for spacing
          if (highlightedWords.length > 0) { // Only apply highlighting if feedback exists
            className += isCorrect
              ? " text-green-400 font-bold"
              : " text-red-400 font-bold underline decoration-wavy decoration-red-400";
          } else {
            className += " text-gray-100"; // Default color when no feedback
          }

          return (
            <span key={index} className={className}>
              {word}
            </span>
          );
        })}
      </p>
      {showPhonetics && currentSentence.phonetic && (
        <p className="text-lg text-gray-400 font-mono mb-2">
          {currentSentence.phonetic}
        </p>
      )}
      {showHints && currentSentence.hint && (
        <p className="text-md text-gray-500 italic">Hint: {currentSentence.hint}</p>
      )}
    </div>
  );
};

export default SentenceDisplay;