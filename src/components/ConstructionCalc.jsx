import React, { useState } from 'react';
import Display from './Display';
import NumberPad from './NumberPad';
import FractionButtons from './FractionButtons';
import OperationButtons from './OperationButtons';
import useConstructionCalcSpeech from '../hooks/useConstructionCalcSpeech';
import './ConstructionCalc.css';

const ConstructionCalc = () => {
  const [feet, setFeet] = useState(0);
  const [inches, setInches] = useState(0);
  const [fraction, setFraction] = useState({ numerator: 0, denominator: 1 });
  const [secondaryDisplay, setSecondaryDisplay] = useState('0\' 0"');
  const [activePad, setActivePad] = useState(1);

  const { isListening, transcript, isSpeechSupported, toggleListening } = useConstructionCalcSpeech(
    setFeet, setInches, setFraction, setSecondaryDisplay
  );

  const updateFeet = (updater) => {
    setFeet((prev) => typeof updater === 'function' ? updater(prev) : updater);
  };

  const updateInches = (updater) => {
    setInches((prev) => {
      const newValue = typeof updater === 'function' ? updater(prev) : updater;
      if (newValue >= 12) {
        const additionalFeet = Math.floor(newValue / 12);
        setFeet(feet => feet + additionalFeet);
        return newValue % 12;
      }
      return newValue;
    });
  };

  const handleFractionClick = (newNumerator, newDenominator) => {
    setFraction({ numerator: newNumerator, denominator: newDenominator });
  };

  const handleClear = () => {
    setFeet(0);
    setInches(0);
    setFraction({ numerator: 0, denominator: 1 });
    setSecondaryDisplay('0\' 0"');
  };

  return (
    <div className="calculator">
      <Display 
        feet={feet}
        inches={inches}
        fraction={fraction}
        secondaryDisplay={secondaryDisplay}
      />
      <ButtonGrid 
        updateFeet={updateFeet}
        updateInches={updateInches}
        handleFractionClick={handleFractionClick}
        updateSecondaryDisplay={setSecondaryDisplay}
        activePad={activePad}
        setActivePad={setActivePad}
        handleClear={handleClear}
      />
      {isSpeechSupported ? (
        <div className="voice-control">
          <button onClick={toggleListening}>
            {isListening ? 'Stop Listening' : 'Start Listening'}
          </button>
          <p>Transcript: {transcript}</p>
        </div>
      ) : (
        <p>Speech recognition is not supported in this browser.</p>
      )}
    </div>
  );
};

const ButtonGrid = ({ 
  updateFeet, 
  updateInches, 
  handleFractionClick, 
  updateSecondaryDisplay, 
  activePad, 
  setActivePad,
  handleClear
}) => (
  <div className="button-grid">
    <NumberPad 
      updateValue={updateFeet}
      pad={1}
      isActive={activePad === 1}
      setActivePad={setActivePad}
    />
    <NumberPad 
      updateValue={updateInches}
      pad={2}
      isActive={activePad === 2}
      setActivePad={setActivePad}
    />
    <FractionButtons handleFractionClick={handleFractionClick} />
    <OperationButtons 
      updateFeet={updateFeet}
      updateInches={updateInches}
      updateSecondaryDisplay={updateSecondaryDisplay}
      handleClear={handleClear}
    />
  </div>
);

export default ConstructionCalc;
