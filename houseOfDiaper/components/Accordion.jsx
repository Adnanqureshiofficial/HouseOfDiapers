import React, { useState } from 'react';

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => setIsOpen(!isOpen);

  return (
    <div className="border border-gray-300 rounded-md shadow-sm">
      <button
        onClick={toggleAccordion}
        className="w-full text-left px-4 py-3 bg-gray-100 font-medium flex justify-between items-center"
      >
        {title}
        <span className="text-lg">
          {isOpen ? '-' : '+'}
        </span>
      </button>

      {isOpen && (
        <div className="px-4 py-3 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

export default Accordion;
