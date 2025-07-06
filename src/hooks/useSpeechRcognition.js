 // src/hooks/useSpeechRecognition.js
import { useState, useEffect, useRef } from "react";

const useSpeechRecognition = ({ onResult, onError }) => {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.warn("Speech Recognition not supported in this browser.");
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setListening(true);
      console.log("Speech recognition started.");
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setListening(false);
      if (onError) onError(event.error);
    };

    recognition.onend = () => {
      setListening(false);
      console.log("Speech recognition ended.");
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onResult, onError]);

  const listen = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error("Error starting recognition:", e);
        setListening(false);
      }
    }
  };

  const stop = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  return { listen, listening, stop };
};

export default useSpeechRecognition;