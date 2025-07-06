import React from "react";

const Question = ({ questionText, options, onAnswer }) => {
  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4">{questionText}</h2>
      <div className="space-y-2">
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition w-full max-w-sm"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Question;
