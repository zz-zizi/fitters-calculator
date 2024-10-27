import React from 'react';

const FractionButtons = ({ handleFractionClick }) => {
  const fractions = [
    { numerator: 1, denominator: 16 },
    { numerator: 1, denominator: 8 },
    { numerator: 3, denominator: 16 },
    { numerator: 1, denominator: 4 },
    { numerator: 5, denominator: 16 },
    { numerator: 3, denominator: 8 },
    { numerator: 7, denominator: 16 },
    { numerator: 1, denominator: 2 },
    { numerator: 9, denominator: 16 },
    { numerator: 5, denominator: 8 },
    { numerator: 11, denominator: 16 },
    { numerator: 3, denominator: 4 },
    { numerator: 13, denominator: 16 },
    { numerator: 7, denominator: 8 },
    { numerator: 15, denominator: 16 }
  ];

  return (
    <div className="fraction-buttons">
      {fractions.map(({ numerator, denominator }) => (
        <button
          key={`${numerator}/${denominator}`}
          onClick={() => handleFractionClick(numerator, denominator)}
          className="calculator-button fraction-button"
        >
          <span className="numerator">{numerator}</span>⁄<span className="denominator">{denominator}</span>
        </button>
      ))}
    </div>
  );
};

export default FractionButtons;
