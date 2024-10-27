import React from 'react';
import CalculatorButton from './CalculatorButton';

const OperationButtons = ({ handleOperatorClick, handleEqualsClick, handleClear }) => (
  <div className="operation-buttons">
    {['+', '-', '×', '÷'].map((op) => (
      <CalculatorButton key={op} onClick={() => handleOperatorClick(op)} className="operation-button">
        {op}
      </CalculatorButton>
    ))}
    <CalculatorButton onClick={handleEqualsClick} className="operation-button">
      =
    </CalculatorButton>
    <CalculatorButton onClick={handleClear} className="clear-button">
      Clear
    </CalculatorButton>
  </div>
);

export default OperationButtons;
