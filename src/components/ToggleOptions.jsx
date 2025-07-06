const ToggleOptions = ({ showPhonetics, setShowPhonetics, showHints, setShowHints }) => (
  <div className="flex justify-center space-x-4 mb-6">
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={showPhonetics}
        onChange={(e) => setShowPhonetics(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
      />
      <span className="text-sm text-gray-300">Show Phonetics</span>
    </label>
    <label className="flex items-center space-x-2 cursor-pointer">
      <input
        type="checkbox"
        checked={showHints}
        onChange={(e) => setShowHints(e.target.checked)}
        className="form-checkbox h-5 w-5 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
      />
      <span className="text-sm text-gray-300">Show Hints</span>
    </label>
  </div>
);
export default ToggleOptions;