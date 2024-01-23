"use client"
import { useState } from 'react';

const ConfigurationSelector = ({config}) => {
  const [selectedOptions, setSelectedOptions] = useState({ color: null, storage: null, capacity: null });

  const handleOptionSelect = (category, option) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [category]: option,
    }));
  };

  const configurations = [
    { category: 'Color', options: ['Black', 'Gray', 'White'] },
    { category: 'Storage', options: ['128GB', '256GB', '512GB'] },
    { category: 'Capacity', options: ['256GB', '512GB', '1TB'] },
  ];

  return (
    <div className="">
      {configurations.map(({ category, options }, index) => (
        <div key={index} className="mb-4">
          <h3 className="text-lg font-semibold">{category}</h3>
          <div className="flex space-x-4">
            {options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(category, option)}
                className={`px-8 py-2 rounded-full font-medium shadow-lg ${
                  selectedOptions[category] === option ? 'bg-black text-white' : 'bg-white border-2 border-black'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ConfigurationSelector;
