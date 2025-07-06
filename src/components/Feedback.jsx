// Feedback Component
const Feedback = ({ feedback }) => (
  feedback && (
    <div className="text-center mb-6">
      <div className="inline-block bg-gray-800 border border-gray-700 rounded-lg px-6 py-4 shadow-sm">
        <p className="text-lg font-medium text-gray-200">{feedback}</p>
      </div>
    </div>
  )
);
export default Feedback;