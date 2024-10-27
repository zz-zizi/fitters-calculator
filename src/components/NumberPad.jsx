import React from 'react';
import CalculatorButton from './CalculatorButton';

const NumberPad = ({ updateValue, pad, isActive, setActivePad }) => {
  const handleNumberClick = (value) => {
    setActivePad(pad);
    if (value === '←') {
      updateValue((prev) => Math.floor(prev / 10));
    } else {
      updateValue((prev) => Number(`${prev}${value}`));
    }
  };

  return (
    <div className={`number-pad-${pad === 1 ? 'one' : 'two'} ${isActive ? 'active' : ''}`}>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0, '.', '←'].map((num) => (
        <CalculatorButton 
          key={num} 
          onClick={() => handleNumberClick(num.toString())} 
          className="number-button"
        >
          {num}
        </CalculatorButton>
      ))}
    </div>
  );
};

export default NumberPad;
