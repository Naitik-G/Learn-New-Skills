// src/hooks/useSpeechSynthesis.js
import { useState, useEffect } from "react";

const useSpeechSynthesis = () => {
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const fetchVoices = () => {
      setVoices(window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.onvoiceschanged = fetchVoices;
    fetchVoices(); // Initial fetch
    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const speak = (text, voice = null) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      if (voice) {
        utterance.voice = voice;
      }
      utterance.onstart = () => setSpeaking(true);
      utterance.onend = () => setSpeaking(false);
      utterance.onerror = (event) => {
        console.error("Speech synthesis error:", event);
        setSpeaking(false);
      };
      window.speechSynthesis.speak(utterance);
    } else {
      console.warn("Speech synthesis not supported in this browser.");
      console.log("Speaking (mock):", text); // Fallback for mock
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
    }
  };

  return { speak, stopSpeaking, speaking, voices };
};

export default useSpeechSynthesis;