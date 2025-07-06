// src/App.js
import React, { useState, useEffect, useCallback } from "react";
import StatsBar from "../components/StatsBar";
import LevelSelection from "../components/LevelSelection";
import SentenceDisplay from "../components/SentenceDisplay";
import ControlButtons from "../components/ControlButtons";
import ToggleOptions from "../components/ToggleOptions";
import UserTranscript from "../components/UserTranscript"; // Will be updated to take wordFeedback
import Feedback from "../components/Feedback";
import ProgressBar from "../components/ProgressBar";
import Instructions from "../components/Instructions";

import useSpeechSynthesis from "../hooks/useSpeechSynthesis.js";
import useSpeechRecognition from "../hooks/useSpeechRcognition.js";
import { sentences } from "../utils/sentences.js";
import {
  calculateSimilarity,
  getWordFeedback,
  mapWordFeedbackToHighlightedWords,
} from "../utils/pronunciationUtils.js";

// Main Component
const PronunciationTrainer = () => {
  // State Management
  const [currentLevel, setCurrentLevel] = useState("beginner");
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [highlightedWords, setHighlightedWords] = useState([]); // Used by SentenceDisplay for word coloring
  const [userTranscript, setUserTranscript] = useState(""); // Raw transcript from speech recognition
  const [wordFeedback, setWordFeedback] = useState([]); // Detailed feedback for UserTranscript component
  const [feedback, setFeedback] = useState(""); // Overall feedback message
  const [progress, setProgress] = useState(0); // Progress bar percentage

  // Game Stats
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [streak, setStreak] = useState(0);

  // Display Options
  const [showPhonetics, setShowPhonetics] = useState(false);
  const [showHints, setShowHints] = useState(false);

  // Speech Hooks
  const { speak, speaking, stopSpeaking } = useSpeechSynthesis();
  const { listen, listening, stop } = useSpeechRecognition({
    onResult: (result) => {
      setUserTranscript(result);
      checkPronunciation(result);
    },
    onError: (error) => {
      setFeedback(`Speech recognition error: ${error}. Please try again.`);
      stopRecording(); // Ensure recording stops on error
    },
  });

  const currentSentence = sentences[currentLevel][currentSentenceIndex];
  const WORD_ACCURACY_THRESHOLD = 80; // Percentage similarity for a single word to be considered correct

  const nextSentence = useCallback(() => {
    setHighlightedWords([]);
    setUserTranscript("");
    setWordFeedback([]); // Clear detailed word feedback
    setFeedback("");
    setProgress(0);

    if (currentSentenceIndex < sentences[currentLevel].length - 1) {
      setCurrentSentenceIndex((prev) => prev + 1);
    } else {
      setFeedback(
        "🎯 Level completed! Great work! Resetting to first sentence."
      );
      // Optionally reset to the first sentence or move to next level
      setCurrentSentenceIndex(0);
    }
  }, [currentLevel, currentSentenceIndex]);

  const checkPronunciation = useCallback(
    (userPronunciation) => {
      // Get detailed word-by-word feedback
      const detailedFeedback = getWordFeedback(
        userPronunciation,
        currentSentence.text,
        WORD_ACCURACY_THRESHOLD
      );
      setWordFeedback(detailedFeedback);

      // Map detailed feedback to the simple correct/incorrect array for SentenceDisplay
      const simpleHighlighted =
        mapWordFeedbackToHighlightedWords(detailedFeedback);
      setHighlightedWords(simpleHighlighted);

      // Calculate overall similarity for scoring and progress bar
      const similarity = calculateSimilarity(
        userPronunciation,
        currentSentence.text
      );

      setAttempts((prev) => prev + 1);
      setProgress(similarity);

      // Determine overall feedback based on similarity and word correctness
      const correctlyPronouncedWords = detailedFeedback.filter(
        (item) => item.correct
      ).length;
      const totalTargetWords = currentSentence.text
        .split(" ")
        .filter(Boolean).length;
      const wordAccuracyPercentage =
        (correctlyPronouncedWords / totalTargetWords) * 100;

      if (wordAccuracyPercentage >= 90 && similarity >= 90) {
        // Very high accuracy
        setScore((prev) => prev + 10);
        setStreak((prev) => prev + 1);
        setFeedback("🎉 Excellent! Perfect pronunciation!");
        setTimeout(nextSentence, 2000);
      } else if (wordAccuracyPercentage >= 70 && similarity >= 70) {
        // Good accuracy
        setScore((prev) => prev + 5);
        setFeedback("👍 Good job! Most words were clear.");
      } else if (wordAccuracyPercentage >= 50 && similarity >= 50) {
        // Moderate accuracy
        setFeedback(
          "👌 You're getting there! Focus on the words marked in red."
        );
      } else {
        // Needs more practice
        setStreak(0);
        setFeedback(
          "🔄 Keep practicing! Listen carefully and try again. Pay attention to the underlined words."
        );
      }
    },
    [currentSentence, nextSentence]
  );

  const handleSpeak = () => {
    if (!speaking) {
      speak(currentSentence.text);
    } else {
      stopSpeaking();
    }
  };

  const startRecording = () => {
    setUserTranscript("");
    setHighlightedWords([]);
    setWordFeedback([]); // Clear previous word feedback
    setFeedback("");
    setProgress(0);
    listen();
  };

  const stopRecording = () => {
    stop();
  };

  // Reset state when level changes
  useEffect(() => {
    setCurrentSentenceIndex(0);
    setHighlightedWords([]);
    setUserTranscript("");
    setWordFeedback([]);
    setFeedback("");
    setProgress(0);
    setScore(0);
    setAttempts(0);
    setStreak(0);
  }, [currentLevel]);

  // Stop recording if component unmounts or if listening state becomes false unexpectedly
  useEffect(() => {
    if (!listening && userTranscript && !feedback) {
      // If not listening and a transcript was received but no feedback yet, means recognition finished
      // This useEffect could be tricky with the async nature of speech recognition.
      // It's usually better to rely on `onend` callback from the recognition API.
      // For our current mock/simple setup, we let `checkPronunciation` handle the flow.
    }
    return () => {
      stopRecording(); // Cleanup on unmount
    };
  }, [listening, userTranscript, feedback]);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 min-h-screen mt-20">
      <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8">
        {/* <Header /> */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-100 mb-2">
            🗣️ Pronunciation Trainer
          </h1>
          <p className="text-gray-400">
            Improve your English pronunciation with interactive practice
          </p>
        </div>
        <StatsBar
          score={score}
          streak={streak}
          attempts={attempts}
          progress={progress}
        />
        <LevelSelection
          currentLevel={currentLevel}
          setCurrentLevel={setCurrentLevel}
          setCurrentSentenceIndex={setCurrentSentenceIndex}
          setHighlightedWords={setHighlightedWords}
          setUserTranscript={setUserTranscript}
          setWordFeedback={setWordFeedback} // Pass this to reset
          setFeedback={setFeedback} // Pass this to reset
        />
        <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6">
          <div className="text-center mb-4">
            <span className="text-sm text-gray-400">
              Sentence {currentSentenceIndex + 1} of{" "}
              {sentences[currentLevel].length}
            </span>
          </div>

          <SentenceDisplay
            currentSentence={currentSentence}
            highlightedWords={highlightedWords} // This now comes from mapped wordFeedback
            showPhonetics={showPhonetics}
            showHints={showHints}
          />

          <ControlButtons
            handleSpeak={handleSpeak}
            listening={listening}
            startRecording={startRecording}
            stopRecording={stopRecording}
            nextSentence={nextSentence}
            isSpeaking={speaking}
          />

          <ToggleOptions
            showPhonetics={showPhonetics}
            setShowPhonetics={setShowPhonetics}
            showHints={showHints}
            setShowHints={setShowHints}
          />
        </div>
        <UserTranscript wordFeedback={wordFeedback} />{" "}
        {/* Pass the new wordFeedback prop */}
        <Feedback feedback={feedback} />
        <ProgressBar progress={progress} />
        <Instructions />
      </div>
    </div>
  );
};

export default PronunciationTrainer;
