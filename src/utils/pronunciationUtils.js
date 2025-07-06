// src/utils/pronunciationUtils.js

/**
 * Calculates the similarity percentage between two strings based on common words.
 * @param {string} str1 - The first string.
 * @param {string} str2 - The second string.
 * @returns {number} - The similarity percentage (0-100).
 */
export const calculateSimilarity = (str1, str2) => {
  const s1 = str1.toLowerCase().replace(/[^\w\s]/g, "");
  const s2 = str2.toLowerCase().replace(/[^\w\s]/g, "");
  const words1 = s1.split(" ").filter(Boolean); // Filter out empty strings from split
  const words2 = s2.split(" ").filter(Boolean);

  if (words1.length === 0 && words2.length === 0) return 100;
  if (words1.length === 0 || words2.length === 0) return 0;

  let matches = 0;
  const longerLength = Math.max(words1.length, words2.length);

  // Simple word-by-word match count
  for (let i = 0; i < Math.min(words1.length, words2.length); i++) {
    if (words1[i] === words2[i]) {
      matches++;
    }
  }

  // Consider a more robust comparison like Levenshtein distance for individual words
  // if you want to allow for slight variations, but for simple matching, this is fine.

  return (matches / longerLength) * 100;
};

/**
 * Compares user's transcript to the target sentence, providing per-word correctness.
 * Since web SpeechRecognition doesn't offer per-word confidence, this simulates it.
 * In a real app, integrate with a pronunciation assessment API for true accuracy.
 *
 * @param {string} userTranscript - The transcript from speech recognition.
 * @param {string} targetSentence - The original sentence to be pronounced.
 * @param {number} accuracyThreshold - The similarity percentage required for a word to be marked correct (e.g., 80).
 * @returns {Array<Object>} - An array of word objects with original text, and a 'correct' boolean.
 */
export const getWordFeedback = (userTranscript, targetSentence, accuracyThreshold = 80) => {
  const targetWords = targetSentence.toLowerCase().replace(/[^\w\s]/g, "").split(" ").filter(Boolean);
  const userWords = userTranscript.toLowerCase().replace(/[^\w\s]/g, "").split(" ").filter(Boolean);

  const feedback = targetWords.map((targetWord, index) => {
    const userWord = userWords[index];
    let isCorrect = false;
    let confidence = 0; // Simulate confidence for demonstration

    if (userWord) {
      // Basic match
      if (targetWord === userWord) {
        isCorrect = true;
        confidence = 100;
      } else {
        // Simulate partial correctness or phonetic similarity here
        // For a true implementation, this would involve phonetic analysis or a robust string similarity.
        const wordSimilarity = calculateSimilarity(targetWord, userWord);
        if (wordSimilarity >= accuracyThreshold) {
          isCorrect = true;
          confidence = wordSimilarity;
        } else {
          isCorrect = false;
          confidence = wordSimilarity;
        }
      }
    }

    return {
      word: targetWord,
      correct: isCorrect,
      userWord: userWord || "", // What the user actually said for this word's position
      confidence: confidence,
    };
  });

  // Handle extra words spoken by the user
  if (userWords.length > targetWords.length) {
    for (let i = targetWords.length; i < userWords.length; i++) {
      feedback.push({
        word: userWords[i],
        correct: false, // Mark extra words as incorrect relative to the target
        userWord: userWords[i],
        confidence: 0,
        extra: true, // Flag to indicate it's an extra word
      });
    }
  }

  return feedback;
};

// Helper function to map the getWordFeedback output to the existing highlightedWords format
export const mapWordFeedbackToHighlightedWords = (wordFeedback) => {
  return wordFeedback.map((item, index) => ({
    index: index,
    correct: item.correct,
  }));
};