import { useCallback } from 'react';
import useSpeechRecognition from './useSpeechRecognition';

const useConstructionCalcSpeech = (setFeet, setInches, setFraction, setSecondaryDisplay) => {
  const processCommand = useCallback((command) => {
    console.log('Processing command:', command);

    const regex = /(\d+)?\s*(?:feet|foot|ft)?\s*(?:(\d+)\s*(?:(\d+)\s*\/\s*(\d+))?)?\s*(?:inches|inch|in)?/i;
    const match = command.match(regex);

    if (match) {
      const [_, feet, wholeInches, numerator, denominator] = match;

      let newFeet = feet ? parseInt(feet) : 0;
      let totalInches = 0;

      if (wholeInches) {
        totalInches += parseInt(wholeInches);
      }
      if (numerator && denominator) {
        totalInches += parseInt(numerator) / parseInt(denominator);
      }

      if (totalInches >= 12) {
        newFeet += Math.floor(totalInches / 12);
        totalInches = totalInches % 12;
      }

      setFeet(newFeet);
      setInches(Math.floor(totalInches));

      const fractionalPart = totalInches % 1;
      if (fractionalPart > 0) {
        const fractions = [
          { numerator: 1, denominator: 2 }, { numerator: 1, denominator: 4 }, { numerator: 3, denominator: 4 },
          { numerator: 1, denominator: 8 }, { numerator: 3, denominator: 8 }, { numerator: 5, denominator: 8 }, { numerator: 7, denominator: 8 },
          { numerator: 1, denominator: 16 }, { numerator: 3, denominator: 16 }, { numerator: 5, denominator: 16 }, { numerator: 7, denominator: 16 },
          { numerator: 9, denominator: 16 }, { numerator: 11, denominator: 16 }, { numerator: 13, denominator: 16 }, { numerator: 15, denominator: 16 }
        ];
        const closestFraction = fractions.reduce((prev, curr) => 
          Math.abs(curr.numerator / curr.denominator - fractionalPart) < Math.abs(prev.numerator / prev.denominator - fractionalPart) ? curr : prev
        );
        setFraction(closestFraction);
      } else {
        setFraction({ numerator: 0, denominator: 1 });
      }

      setSecondaryDisplay(`${newFeet}' ${Math.floor(totalInches)}" ${closestFraction.numerator}/${closestFraction.denominator}`);

      console.log(`Recognized: ${newFeet} feet ${Math.floor(totalInches)} ${closestFraction.numerator}/${closestFraction.denominator} inches`);
    } else {
      console.log("Command not recognized");
    }
  }, [setFeet, setInches, setFraction, setSecondaryDisplay]);

  const { isListening, transcript, isSpeechSupported, toggleListening } = useSpeechRecognition(processCommand);

  return { isListening, transcript, isSpeechSupported, toggleListening };
};

export default useConstructionCalcSpeech;
