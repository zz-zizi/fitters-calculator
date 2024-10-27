import { useState, useEffect, useRef, useCallback } from 'react';

const useSpeechRecognition = (onTranscript) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isSpeechSupported, setIsSpeechSupported] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const isSpeechRecognitionSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    setIsSpeechSupported(isSpeechRecognitionSupported);

    if (isSpeechRecognitionSupported) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.onresult = (event) => {
        const newTranscript = event.results[0][0].transcript.toLowerCase();
        setTranscript(newTranscript);
        onTranscript(newTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript]);

  const toggleListening = useCallback(() => {
    if (!isSpeechSupported) {
      console.error('Speech recognition not supported in this browser');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  }, [isListening, isSpeechSupported]);

  return { isListening, transcript, isSpeechSupported, toggleListening };
};

export default useSpeechRecognition;
