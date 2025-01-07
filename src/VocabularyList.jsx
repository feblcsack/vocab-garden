import React, { useState } from "react";

const VocabularyList = ({ vocabList }) => {
  return (
    
    <div className="bg-white p-4 rounded-lg shadow-md mt-6">
      <h2 className="text-lg font-bold mb-4">Vocabulary List</h2>
      <ul>
        {vocabList.map((vocab, index) => (
          <VocabularyItem key={index} vocab={vocab} />
        ))}
      </ul>
    </div>
  );
};

const VocabularyItem = ({ vocab }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <li className="mb-4">
      <h3 className="font-semibold">{vocab.word}</h3>
      <p className="text-sm text-gray-600">
        {expanded ? vocab.definition : `${vocab.definition.slice(0, 100)}...`}
      </p>
      {vocab.definition.length > 100 && (
        <button
          className="text-blue-500 text-sm"
          onClick={toggleExpand}
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      )}
    </li>
  );
};

export default VocabularyList;