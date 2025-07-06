import React from "react";
import { Link } from "react-router-dom";

const Score = ({ score, totalQuestions }) => {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Quiz Completed</h1>
      <p className="text-lg text-gray-400 mb-8">
        Your Score: <span className="text-yellow-400 font-bold">{score}</span> /{" "}
        <span className="text-yellow-400 font-bold">{totalQuestions}</span>
      </p>
      <div className="space-x-4">
        <Link
          to="/quizpage"
          className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400 transition"
        >
          Retake Quiz
        </Link>
        <Link
          to="/"
          className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default Score;
