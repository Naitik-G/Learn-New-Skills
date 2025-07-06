const ProgressBar = ({ progress }) => (
  <div className="bg-gray-700 rounded-full h-4 mb-4">
    <div
      className="bg-gradient-to-r from-blue-500 to-purple-500 h-4 rounded-full transition-all duration-500"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);
export default ProgressBar;