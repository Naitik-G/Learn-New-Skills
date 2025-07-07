// src/components/Quiz.jsx
import React, { useState, useEffect } from "react";
import Question from "./Question"; // Assuming you keep Question as a separate component

const Quiz = ({ quizData, onFinish }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showNextButton, setShowNextButton] = useState(false);

  // Reset state when quizData changes (e.g., retaking quiz)
  useEffect(() => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowNextButton(false);
  }, [quizData]);

  const handleAnswer = (option) => {
    if (selectedOption === null) { // Only allow answering if no option is selected yet
      setSelectedOption(option);
      if (option === quizData[currentQuestionIndex].correctAnswer) {
        setScore((prevScore) => prevScore + 1);
      }
      setShowNextButton(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setShowNextButton(false);
    if (currentQuestionIndex + 1 < quizData.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Pass the final score when all questions are answered
      onFinish(score + (selectedOption === quizData[currentQuestionIndex].correctAnswer ? 1 : 0));
    }
  };

  if (!quizData || quizData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center text-2xl">
          No questions available for the selected criteria. Please try different
          options.
        </div>
      </div>
    );
  }

  const currentQuestion = quizData[currentQuestionIndex];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-2xl transform transition-all duration-500 ease-in-out scale-100">
        <div className="text-xl text-gray-400 mb-6 text-right">
          Question {currentQuestionIndex + 1} / {quizData.length}
        </div>
        <Question
          questionText={currentQuestion.question}
          options={currentQuestion.options}
          onAnswer={handleAnswer}
          selectedOption={selectedOption}
          correctAnswer={currentQuestion.correctAnswer}
        />
        {showNextButton && (
          <div className="mt-10 text-center">
            <button
              onClick={handleNextQuestion}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg text-xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
            >
              {currentQuestionIndex + 1 === quizData.length
                ? "View Results"
                : "Next Question"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;