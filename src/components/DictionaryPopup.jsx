import React, { useState, useEffect, useRef } from 'react';
import { Volume2, X, BookOpen, Globe, MapPin } from 'lucide-react';

// Country to language mapping
const countryToLanguage = {
  'CN': { code: 'zh', name: 'Chinese' },
  'IN': { code: 'hi', name: 'Hindi' },
  'JP': { code: 'ja', name: 'Japanese' },
  'KR': { code: 'ko', name: 'Korean' },
  'DE': { code: 'de', name: 'German' },
  'FR': { code: 'fr', name: 'French' },
  'ES': { code: 'es', name: 'Spanish' },
  'IT': { code: 'it', name: 'Italian' },
  'PT': { code: 'pt', name: 'Portuguese' },
  'RU': { code: 'ru', name: 'Russian' },
  'AR': { code: 'ar', name: 'Arabic' },
  'TR': { code: 'tr', name: 'Turkish' },
  'TH': { code: 'th', name: 'Thai' },
  'VN': { code: 'vi', name: 'Vietnamese' },
  'ID': { code: 'id', name: 'Indonesian' },
  'MY': { code: 'ms', name: 'Malay' },
  'PH': { code: 'tl', name: 'Filipino' },
  'BD': { code: 'bn', name: 'Bengali' },
  'PK': { code: 'ur', name: 'Urdu' },
  'IR': { code: 'fa', name: 'Persian' },
  'IL': { code: 'he', name: 'Hebrew' },
  'GR': { code: 'el', name: 'Greek' },
  'PL': { code: 'pl', name: 'Polish' },
  'NL': { code: 'nl', name: 'Dutch' },
  'SE': { code: 'sv', name: 'Swedish' },
  'NO': { code: 'no', name: 'Norwegian' },
  'DK': { code: 'da', name: 'Danish' },
  'FI': { code: 'fi', name: 'Finnish' }
};

// Fallback dictionary with translations
const fallbackDictionary = {
  physics: {
    word: "physics",
    phonetic: "/ˈfɪzɪks/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{
        definition: "The branch of science concerned with the nature and properties of matter and energy.",
        example: "She studied physics at university."
      }]
    }],
    translations: {
      hi: "भौतिकी",
      zh: "物理学",
      ja: "物理学",
      ko: "물리학",
      de: "Physik",
      fr: "physique",
      es: "física",
      ru: "физика",
      ar: "الفيزياء"
    }
  },
  energy: {
    word: "energy",
    phonetic: "/ˈɛnərdʒi/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{
        definition: "The strength and vitality required for sustained physical or mental activity.",
        example: "Solar panels convert sunlight into electrical energy."
      }]
    }],
    translations: {
      hi: "ऊर्जा",
      zh: "能量",
      ja: "エネルギー",
      ko: "에너지",
      de: "Energie",
      fr: "énergie",
      es: "energía",
      ru: "энергия",
      ar: "طاقة"
    }
  },
  renewable: {
    word: "renewable",
    phonetic: "/rɪˈnuːəbl/",
    meanings: [{
      partOfSpeech: "adjective",
      definitions: [{
        definition: "Able to be renewed or replaced naturally or by human action.",
        example: "Renewable energy sources include solar and wind power."
      }]
    }],
    translations: {
      hi: "नवीकरणीय",
      zh: "可再生的",
      ja: "再生可能な",
      ko: "재생 가능한",
      de: "erneuerbar",
      fr: "renouvelable",
      es: "renovable",
      ru: "возобновляемый",
      ar: "متجدد"
    }
  },
  solar: {
    word: "solar",
    phonetic: "/ˈsoʊlər/",
    meanings: [{
      partOfSpeech: "adjective",
      definitions: [{
        definition: "Relating to or derived from the sun.",
        example: "Solar panels harness energy from sunlight."
      }]
    }],
    translations: {
      hi: "सौर",
      zh: "太阳能的",
      ja: "太陽の",
      ko: "태양의",
      de: "solar",
      fr: "solaire",
      es: "solar",
      ru: "солнечный",
      ar: "شمسي"
    }
  },
  electrons: {
    word: "electrons",
    phonetic: "/ɪˈlɛktrɒnz/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{
        definition: "Stable subatomic particles with a charge of negative electricity.",
        example: "Electrons flow through the circuit to create electricity."
      }]
    }],
    translations: {
      hi: "इलेक्ट्रॉन",
      zh: "电子",
      ja: "電子",
      ko: "전자",
      de: "Elektronen",
      fr: "électrons",
      es: "electrones",
      ru: "электроны",
      ar: "إلكترونات"
    }
  }
};

const DictionaryPopup = ({ word, position, onClose }) => {
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userLanguage, setUserLanguage] = useState(null);
  const [translation, setTranslation] = useState('');
  const [translationLoading, setTranslationLoading] = useState(false);
  const popupRef = useRef(null);

  // Get user location
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        // First try to get country from IP
        const response = await fetch('https://ipapi.co/json/');
        if (response.ok) {
          const data = await response.json();
          const countryCode = data.country_code;
          setUserLocation(countryCode);
          
          if (countryToLanguage[countryCode]) {
            setUserLanguage(countryToLanguage[countryCode]);
          }
        }
      } catch (error) {
        console.log('Location detection failed, using browser language');
        // Fallback to browser language
        const browserLang = navigator.language.slice(0, 2);
        const langData = Object.values(countryToLanguage).find(lang => lang.code === browserLang);
        if (langData) {
          setUserLanguage(langData);
        }
      }
    };

    getUserLocation();
  }, []);

  // Fetch definition
  useEffect(() => {
    const fetchDefinition = async () => {
      try {
        setLoading(true);
        setError(null);

        const lowerWord = word.toLowerCase();

        // Check fallback dictionary first
        if (fallbackDictionary[lowerWord]) {
          setDefinition(fallbackDictionary[lowerWord]);
          setLoading(false);
          return;
        }

        // Try external API
        try {
          const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${lowerWord}`);
          
          if (response.ok) {
            const data = await response.json();
            setDefinition(data[0]);
          } else {
            throw new Error('API request failed');
          }
        } catch (apiError) {
          // Create basic definition for unknown words
          setDefinition({
            word: word,
            phonetic: `/${word}/`,
            meanings: [{
              partOfSpeech: "word",
              definitions: [{
                definition: `Selected word: "${word}". Definition not available in offline dictionary.`,
                example: `Try selecting a more common word for detailed definitions.`
              }]
            }]
          });
        }
      } catch (err) {
        setError('Unable to fetch definition');
      } finally {
        setLoading(false);
      }
    };

    if (word) {
      fetchDefinition();
    }
  }, [word]);

  // Translate word
  useEffect(() => {
    const translateWord = async () => {
      if (!userLanguage || !definition || userLanguage.code === 'en') return;

      setTranslationLoading(true);
      
      try {
        // Check if we have a cached translation
        if (fallbackDictionary[word.toLowerCase()]?.translations?.[userLanguage.code]) {
          setTranslation(fallbackDictionary[word.toLowerCase()].translations[userLanguage.code]);
          setTranslationLoading(false);
          return;
        }

        // Try Google Translate API (you'd need to set up your own API key)
        // For demo purposes, we'll use a simple translation service
        const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|${userLanguage.code}`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.responseData && data.responseData.translatedText) {
            setTranslation(data.responseData.translatedText);
          }
        }
      } catch (error) {
        console.log('Translation failed:', error);
      } finally {
        setTranslationLoading(false);
      }
    };

    if (definition && userLanguage) {
      translateWord();
    }
  }, [definition, userLanguage, word]);

  const playPronunciation = () => {
    try {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.rate = 0.8;
      utterance.volume = 0.8;
      speechSynthesis.speak(utterance);
    } catch (err) {
      console.log('Speech synthesis failed:', err);
    }
  };

  const getPopupStyle = () => {
    if (!position) return {};
    
    const popupWidth = 350; // Slightly wider for translation
    const popupHeight = 250;
    const padding = 10;
    
    let left = position.x;
    let top = position.y + 20;
    
    if (left + popupWidth > window.innerWidth - padding) {
      left = window.innerWidth - popupWidth - padding;
    }
    if (left < padding) {
      left = padding;
    }
    
    if (top + popupHeight > window.innerHeight - padding) {
      top = position.y - popupHeight - 10;
    }
    
    return {
      position: 'fixed',
      left: `${left}px`,
      top: `${top}px`,
      zIndex: 1000
    };
  };

  if (!word || !position) return null;

  return (
    <div
      ref={popupRef}
      style={getPopupStyle()}
      className="bg-zinc-900 text-white border border-zinc-700 rounded-xl shadow-2xl p-4 max-w-sm"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <BookOpen size={16} className="text-blue-400" />
          <h3 className="font-bold text-lg">{word}</h3>
          {userLocation && (
            <div className="flex items-center gap-1 text-xs text-zinc-400">
              <MapPin size={12} />
              <span>{userLocation}</span>
            </div>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-zinc-400 hover:text-white p-1"
        >
          <X size={16} />
        </button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="text-center py-4">
          <div className="animate-spin h-6 w-6 border-b-2 border-blue-400 mx-auto rounded-full"></div>
          <p className="text-sm text-zinc-400 mt-2">Loading definition...</p>
        </div>
      ) : error ? (
        <div className="text-center py-4">
          <p className="text-sm text-red-400 mb-2">Unable to load definition</p>
          <button
            onClick={playPronunciation}
            className="flex items-center gap-1 text-blue-400 hover:text-blue-300 mx-auto"
          >
            <Volume2 size={14} />
            <span className="text-sm">Play pronunciation</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {/* Translation */}
          {userLanguage && userLanguage.code !== 'en' && (
            <div className="bg-zinc-800 rounded-lg p-3 border border-zinc-600">
              <div className="flex items-center gap-2 mb-2">
                <Globe size={14} className="text-green-400" />
                <span className="text-xs font-semibold text-green-400 uppercase">
                  {userLanguage.name} Translation
                </span>
              </div>
              {translationLoading ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin h-4 w-4 border-b-2 border-green-400 rounded-full"></div>
                  <span className="text-sm text-zinc-400">Translating...</span>
                </div>
              ) : translation ? (
                <p className="text-lg font-semibold text-green-300">{translation}</p>
              ) : (
                <p className="text-sm text-zinc-400">Translation not available</p>
              )}
            </div>
          )}

          {/* Pronunciation */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-zinc-300">
              {definition?.phonetic || `/${word}/`}
            </span>
            <button
              onClick={playPronunciation}
              className="text-blue-400 hover:text-blue-300 p-1 rounded hover:bg-zinc-800"
              title="Play pronunciation"
            >
              <Volume2 size={14} />
            </button>
          </div>

          {/* Definitions */}
          <div className="max-h-32 overflow-y-auto pr-1">
            {definition.meanings?.slice(0, 2).map((meaning, i) => (
              <div key={i} className="mb-2">
                <span className="text-xs font-semibold text-blue-400 uppercase">
                  {meaning.partOfSpeech}
                </span>
                <p className="text-sm text-zinc-100 mt-1">
                  {meaning.definitions[0]?.definition}
                </p>
                {meaning.definitions[0]?.example && (
                  <p className="text-xs text-zinc-400 italic mt-1">
                    "{meaning.definitions[0].example}"
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DictionaryPopup;