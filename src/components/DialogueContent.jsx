import React from 'react';

const DialogueContent = ({ dialogue, onTextSelect }) => {
  return (
    <div
      className="flex-1 p-6 max-w-4xl mx-auto shadow rounded-lg md:ml-0 select-text"
      onMouseUp={onTextSelect}
    >
      <div className="mb-4 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-400">
        <p className="text-sm text-blue-700">
          💡 <strong>Tip:</strong> Select any word in the conversation to see its definition!
        </p>
      </div>

      {dialogue.map((line, i) => (
        <p key={i} className="mb-2 leading-relaxed">
          <strong>{line.character && `${line.character}: `}</strong>
          <span>{line.text}</span>
        </p>
      ))}
    </div>
  );
};

export default DialogueContent;
