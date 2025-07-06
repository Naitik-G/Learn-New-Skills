const StatsBar = ({ score, streak, attempts, progress }) => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
    <div className="bg-blue-900/50 border border-blue-800 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-blue-400">{score}</div>
      <div className="text-sm text-gray-400">Score</div>
    </div>
    <div className="bg-green-900/50 border border-green-800 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-green-400">{streak}</div>
      <div className="text-sm text-gray-400">Streak</div>
    </div>
    <div className="bg-yellow-900/50 border border-yellow-800 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-yellow-400">{attempts}</div>
      <div className="text-sm text-gray-400">Attempts</div>
    </div>
    <div className="bg-purple-900/50 border border-purple-800 p-4 rounded-lg text-center">
      <div className="text-2xl font-bold text-purple-400">{Math.round(progress)}%</div>
      <div className="text-sm text-gray-400">Accuracy</div>
    </div>
  </div>
);

export default StatsBar;