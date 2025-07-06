const LevelSelection = ({ currentLevel, setCurrentLevel, setCurrentSentenceIndex, setHighlightedWords, setUserTranscript }) => (
  <div className="mb-6">
    <div className="flex justify-center space-x-2">
      {['beginner', 'intermediate', 'advanced'].map(level => (
        <button
          key={level}
          onClick={() => {
            setCurrentLevel(level);
            setCurrentSentenceIndex(0);
            setHighlightedWords([]);
            setUserTranscript('');
          }}
          className={`px-4 py-2 rounded-lg font-medium transition-all ${
            currentLevel === level
              ? 'bg-blue-600 text-white shadow-lg border border-blue-500'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600 border border-gray-600'
          }`}
        >
          {level.charAt(0).toUpperCase() + level.slice(1)}
        </button>
      ))}
    </div>
  </div>
);
export default LevelSelection;