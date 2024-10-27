import React from 'react';
import CalculatorButton from './CalculatorButton';

const FractionButtons = ({ handleFractionClick }) => {
  const fractionClick = (fraction) => {
    const [numerator, denominator] = fraction.split('/').map(Number);
    handleFractionClick(numerator, denominator);
  };

  return (
    <div className="fraction-buttons">
      {['1/16', '1/8', '3/16', '1/4', '3/8', '7/16', '1/2', '9/16', '5/8', '11/16', '3/4', '13/16', '7/8', '15/16'].map((fraction) => (
        <CalculatorButton 
          key={fraction} 
          onClick={() => fractionClick(fraction)} 
          className="fraction-button"
        >
          {fraction}
        </CalculatorButton>
      ))}
    </div>
  );
};

export default FractionButtons;
