import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [difficulty, setDifficulty] = useState("easy");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  const startQuiz = () => {
    navigate("/quizpage", { state: { difficulty, category } });
  };

  return (
    <div className="text-center py-12">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Quiz App</h1>
      <div className="space-y-4 mb-8">
        {/* Difficulty Dropdown */}
        <div>
          <label className="text-lg text-gray-400 mr-2">Select Difficulty:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="bg-gray-800 text-white py-2 px-4 rounded"
          >
            <option value="easy">Easy</option>
            <option value="intermediate">Intermediate</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="text-lg text-gray-400 mr-2">Select Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-gray-800 text-white py-2 px-4 rounded"
          >
            <option value="all">All</option>
            <option value="math">Math</option>
            <option value="english">English</option>
            <option value="history">History</option>
            <option value="science">Science</option>
            <option value="geography">Geography</option>
            <option value="technology">Technology</option>
          </select>
        </div>
      </div>
      <button
        onClick={startQuiz}
        className="bg-yellow-500 text-black py-2 px-4 rounded hover:bg-yellow-400 transition"
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Home;
