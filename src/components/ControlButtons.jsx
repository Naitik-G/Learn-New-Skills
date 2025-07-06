const ControlButtons = ({ handleSpeak, listening, startRecording, stopRecording, nextSentence }) => (
  <div className="flex flex-wrap justify-center gap-4 mb-6">
    <button
      onClick={handleSpeak}
      className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors border border-blue-500"
    >
      <span>🔊</span>
      <span>Listen</span>
    </button>

    <button
      onClick={listening ? stopRecording : startRecording}
      className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all border ${
        listening
          ? 'bg-red-600 text-white hover:bg-red-700 animate-pulse border-red-500'
          : 'bg-green-600 text-white hover:bg-green-700 border-green-500'
      }`}
    >
      <span>{listening ? '⏹️' : '🎤'}</span>
      <span>{listening ? 'Stop' : 'Record'}</span>
    </button>

    <button
      onClick={nextSentence}
      className="flex items-center space-x-2 bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition-colors border border-purple-500"
    >
      <span>⏭️</span>
      <span>Next</span>
    </button>
  </div>
);
export default ControlButtons;