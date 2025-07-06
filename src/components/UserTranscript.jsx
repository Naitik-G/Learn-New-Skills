// src/components/UserTranscript.js
import React from "react";

// This component now takes detailed word feedback to show what the user said
// in relation to the target sentence.
const UserTranscript = ({ wordFeedback }) => {
  if (!wordFeedback || wordFeedback.length === 0) {
    return (
      <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 mb-4 text-center">
        <p className="text-gray-400 italic">Your transcript will appear here...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-700 border border-gray-600 rounded-xl p-4 mb-4">
      <p className="text-sm font-semibold text-gray-300 mb-2">Your Attempt:</p>
      <div className="text-lg text-gray-100 flex flex-wrap gap-x-2">
        {wordFeedback.map((item, idx) => (
          <span
            key={idx}
            className={`font-mono ${
              item.correct
                ? "text-green-300" // Matched correctly
                : item.extra
                ? "text-purple-300 line-through" // Extra word, not in target
                : "text-red-300" // Mismatched word
            }`}
          >
            {item.userWord || (item.correct ? item.word : "...")}{" "} {/* Display user word, or target word if correct, or "..." for missing */}
          </span>
        ))}
      </div>
    </div>
  );
};

export default UserTranscript;