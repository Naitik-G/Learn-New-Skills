// src/components/QuizResult.jsx
import React from "react";
import { Link } from "react-router-dom";

const QuizResult = ({ score, totalQuestions, onRetakeQuiz }) => {
  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= 70; // Define a passing score

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md text-center transform transition-all duration-500 ease-in-out scale-100 hover:scale-105">
        <h2 className="text-4xl font-extrabold mb-6 text-purple-400">
          Quiz Completed!
        </h2>
        <div className="text-3xl mb-4 font-semibold">
          Your Score: <span className="text-green-400">{score}</span> /{" "}
          <span className="text-blue-400">{totalQuestions}</span>
        </div>
        <div className="text-2xl mb-6 font-medium">
          Percentage: <span className="text-yellow-400">{percentage.toFixed(0)}%</span>
        </div>

        <p className={`text-xl mb-8 ${passed ? "text-green-300" : "text-red-300"}`}>
          {passed
            ? "Congratulations! You aced the quiz!"
            : "Keep practicing! You'll get there!"}
        </p>

        <div className="flex flex-col space-y-4">
          <button
            onClick={onRetakeQuiz}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75"
          >
            Retake Quiz
          </button>
          <Link
            to="/"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;