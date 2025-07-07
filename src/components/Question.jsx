// src/components/Question.jsx (No changes needed, but keeping it for completeness if you decide to keep it separate)
import React from "react";

const Question = ({ questionText, options, onAnswer, selectedOption, correctAnswer }) => {
  return (
    <div className="text-center">
      <h3 className="text-3xl font-bold mb-8 text-white leading-relaxed">
        {questionText}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`
              bg-gray-700 text-white py-4 px-6 rounded-lg text-lg
              hover:bg-gray-600 transition duration-300 ease-in-out
              transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75
              ${selectedOption === option
                ? (option === correctAnswer ? "bg-green-500" : "bg-red-500")
                : ""
              }
            `}
            disabled={selectedOption !== null} // Disable buttons once an option is selected
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;