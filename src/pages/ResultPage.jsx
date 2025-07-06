import React from "react";
import { Link } from "react-router-dom";

const ResultPage = ({ score, totalQuestions }) => {
  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Quiz Results</h1>
      <p className="text-lg text-gray-400 mb-4">
        You scored <span className="text-yellow-400 font-bold">{score}</span> out of{" "}
        <span className="text-yellow-400 font-bold">{totalQuestions}</span>
      </p>
      <p className="text-md text-gray-500 mb-8">
        {score / totalQuestions >= 0.8
          ? "Great job! You passed the quiz."
          : "Don't worry, try again to improve your score!"}
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

export default ResultPage;
