import React, { useState, useEffect, useMemo } from "react";
// No need for useLocation or useNavigate anymore as we are merging
import Quiz from "../components/Quiz";
import QuizResult from "../components/QuizResult";
import quizData from "../utils/quizData"; // Your quiz data source

const QuizPage = () => {
  // States for quiz selection (formerly from Home.jsx)
  const [selectedDifficulty, setSelectedDifficulty] = useState("easy");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all"); // Default to 'all' levels

  // State to control whether the quiz selection is shown or the quiz itself
  const [quizStarted, setQuizStarted] = useState(false);

  // States for quiz game (already present)
  const [quizFinished, setQuizFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState([]);

  // Memoize the filtered quiz data based on selected criteria
  const memoizedQuizData = useMemo(() => {
    // Only filter if quiz has started or if we are preparing for it
    if (!quizStarted && quizQuestions.length > 0) return quizQuestions; // Return existing if not starting fresh

    const filtered = quizData.filter((question) => {
      const matchesDifficulty =
        selectedDifficulty === "all" || question.difficulty === selectedDifficulty;
      const matchesCategory =
        selectedCategory === "all" || question.category === selectedCategory;
      const matchesLevel = selectedLevel === "all" || question.level === selectedLevel;
      return matchesDifficulty && matchesCategory && matchesLevel;
    });

    // Randomly select up to 10 questions
    return filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
  }, [selectedDifficulty, selectedCategory, selectedLevel, quizStarted]); // Depend on selection states and quizStarted

  // Effect to update quiz questions when selection changes or quiz starts
  useEffect(() => {
    if (quizStarted) {
      setQuizQuestions(memoizedQuizData);
      setQuizFinished(false); // Ensure quiz is not marked as finished
      setFinalScore(0); // Reset score
    } else {
      // Pre-filter questions when selection changes even before starting for potential feedback
      setQuizQuestions(memoizedQuizData);
    }
  }, [memoizedQuizData, quizStarted]);

  // Handler for when the quiz officially finishes
  const handleQuizFinish = (score) => {
    setFinalScore(score);
    setQuizFinished(true);
  };

  // Handler to retake the quiz with the *same* selected criteria
  const handleRetakeQuiz = () => {
    setQuizStarted(false); // Go back to selection screen to re-enable selections if desired
    setQuizFinished(false);
    setFinalScore(0);
    // The useEffect dependent on memoizedQuizData will re-filter and set new questions when quizStarted becomes true again
  };

  // Handler to initiate the quiz game from the selection screen
  const handleStartQuiz = () => {
    setQuizStarted(true);
  };

  // --- Conditional Rendering Logic ---

  // If the quiz is finished, show the results
  if (quizFinished) {
    return (
      <QuizResult
        score={finalScore}
        totalQuestions={quizQuestions.length}
        onRetakeQuiz={handleRetakeQuiz}
      />
    );
  }

  // If the quiz has not started yet (i.e., we are on the selection screen)
  if (!quizStarted) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl w-full max-w-md text-center transform transition-all duration-500 ease-in-out scale-100 hover:scale-105">
          <h1 className="text-5xl font-extrabold mb-8 text-blue-400">
            Select Your Quiz!
          </h1>
          <div className="space-y-6 mb-10">
            {/* Difficulty Dropdown */}
            <div className="flex items-center justify-between">
              <label htmlFor="difficulty-select" className="text-xl text-gray-300 font-medium">
                Select Difficulty:
              </label>
              <select
                id="difficulty-select"
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="bg-gray-700 text-white py-3 px-6 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 cursor-pointer"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            {/* Category Dropdown */}
            <div className="flex items-center justify-between">
              <label htmlFor="category-select" className="text-xl text-gray-300 font-medium">
                Select Category:
              </label>
              <select
                id="category-select"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-700 text-white py-3 px-6 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 cursor-pointer"
              >
                <option value="all">All</option>
                <option value="math">Math</option>
                <option value="english">English</option>
                <option value="history">History</option>
                <option value="science">Science</option>
                <option value="geography">Geography</option>
                <option value="technology">Technology</option>
                <option value="art">Art</option>
                <option value="literature">Literature</option>
              </select>
            </div>

            {/* Level Dropdown */}
            <div className="flex items-center justify-between">
              <label htmlFor="level-select" className="text-xl text-gray-300 font-medium">
                Select Level:
              </label>
              <select
                id="level-select"
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-gray-700 text-white py-3 px-6 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 cursor-pointer"
              >
                <option value="all">All</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          {/* Display message if no questions are found for current selection */}
          {memoizedQuizData.length === 0 && (
            <p className="text-red-400 text-lg mb-4">
              No questions found for the current selection. Please try different options.
            </p>
          )}
          <button
            onClick={handleStartQuiz}
            // Disable button if no questions are available for the current selection
            disabled={memoizedQuizData.length === 0}
            className={`w-full font-bold py-4 px-8 rounded-lg text-2xl transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-opacity-75 shadow-lg
              ${memoizedQuizData.length === 0
                ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                : "bg-yellow-500 hover:bg-yellow-600 text-gray-900 focus:ring-yellow-400"
              }`}
          >
            Start Quiz! ({memoizedQuizData.length} Questions)
          </button>
        </div>
      </div>
    );
  }

  // If quiz has started but no questions are available (should be caught by above check but for safety)
  if (quizQuestions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white p-4">
        <div className="bg-gray-800 p-8 rounded-lg shadow-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">No Quizzes Found!</h2>
          <p className="text-xl mb-6">
            It seems there are no questions available for your selection.
          </p>
          <button
            onClick={() => setQuizStarted(false)} // Go back to selection
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105"
          >
            Go Back to Selection
          </button>
        </div>
      </div>
    );
  }

  // If quiz has started and there are questions, show the Quiz component
  return <Quiz quizData={quizQuestions} onFinish={handleQuizFinish} />;
};

export default QuizPage;