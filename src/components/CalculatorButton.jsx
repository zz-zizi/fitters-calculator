import React from 'react';

const CalculatorButton = ({ onClick, children, className }) => (
  <button onClick={onClick} className={`calculator-button ${className}`}>
    {children}
  </button>
);

export default CalculatorButton;
