import React from 'react';

const Display = ({ feet, inches, fraction, secondaryDisplay }) => {

  const { numerator, denominator } = fraction || { numerator: 0, denominator: 1 };
  const formattedDisplay = `${feet}' ${inches}${numerator ? ` ${numerator}/${denominator}` : ''}"`;
  
  return (
    <div className="display">
      <div className="primary-display">{formattedDisplay}</div>
      <div className="secondary-display">{secondaryDisplay}</div>
    </div>
  );
};

export default Display;
