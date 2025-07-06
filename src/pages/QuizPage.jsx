import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Quiz from "../components/Quiz";
import quizData from "../utils/quizData";

const QuizPage = () => {
  const { state } = useLocation();
  const { difficulty, category } = state || { difficulty: "easy", category: "all" };

  // Filter quiz data based on selected difficulty and category
  const filteredQuizData = quizData.filter((question) => {
    const matchesDifficulty = question.difficulty === difficulty;
    const matchesCategory = category === "all" || question.category === category;
    return matchesDifficulty && matchesCategory;
  });

  // Randomly select up to 10 questions
  const selectedQuizData = filteredQuizData
    .sort(() => 0.5 - Math.random()) // Shuffle questions
    .slice(0, 10); // Take the first 10 questions

  const [quizFinished, setQuizFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);

  const handleQuizFinish = (score) => {
    setFinalScore(score);
    setQuizFinished(true);
  };

  if (quizFinished) {
    return (
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold mb-6">Quiz Completed</h1>
        <p className="text-lg text-gray-400 mb-8">
          Your Score: <span className="text-yellow-400 font-bold">{finalScore}</span> /{" "}
          <span className="text-yellow-400 font-bold">{selectedQuizData.length}</span>
        </p>
      </div>
    );
  }

  return <Quiz quizData={selectedQuizData} onFinish={handleQuizFinish} />;
};

export default QuizPage;
