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

// Expanded fallback dictionary with more common words
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
  },
  science: {
    word: "science",
    phonetic: "/ˈsaɪəns/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{
        definition: "The intellectual and practical activity encompassing systematic study of the structure and behavior of the physical and natural world.",
        example: "Science has revolutionized our understanding of the universe."
      }]
    }],
    translations: {
      hi: "विज्ञान",
      zh: "科学",
      ja: "科学",
      ko: "과학",
      de: "Wissenschaft",
      fr: "science",
      es: "ciencia",
      ru: "наука",
      ar: "علم"
    }
  },
  technology: {
    word: "technology",
    phonetic: "/tɛkˈnɒlədʒi/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{
        definition: "The application of scientific knowledge for practical purposes.",
        example: "Modern technology has transformed how we communicate."
      }]
    }],
    translations: {
      hi: "प्रौद्योगिकी",
      zh: "技术",
      ja: "技術",
      ko: "기술",
      de: "Technologie",
      fr: "technologie",
      es: "tecnología",
      ru: "технология",
      ar: "تقنية"
    }
  },
  environment: {
    word: "environment",
    phonetic: "/ɪnˈvaɪrənmənt/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{
        definition: "The surroundings or conditions in which a person, animal, or plant lives or operates.",
        example: "We must protect our environment for future generations."
      }]
    }],
    translations: {
      hi: "पर्यावरण",
      zh: "环境",
      ja: "環境",
      ko: "환경",
      de: "Umwelt",
      fr: "environnement",
      es: "medio ambiente",
      ru: "окружающая среда",
      ar: "بيئة"
    }
  },
  sustainable: {
    word: "sustainable",
    phonetic: "/səˈsteɪnəbl/",
    meanings: [{
      partOfSpeech: "adjective",
      definitions: [{
        definition: "Able to be maintained at a certain rate or level without depleting natural resources.",
        example: "Sustainable development meets present needs without compromising future generations."
      }]
    }],
    translations: {
      hi: "टिकाऊ",
      zh: "可持续的",
      ja: "持続可能な",
      ko: "지속 가능한",
      de: "nachhaltig",
      fr: "durable",
      es: "sostenible",
      ru: "устойчивый",
      ar: "مستدام"
    }
  },
  chemical: {
    word: "chemical",
    phonetic: "/ˈkɛmɪkəl/",
    meanings: [{
      partOfSpeech: "noun",
      definitions: [{
        definition: "A compound or substance that has been purified or prepared artificially.",
        example: "The lab tested various chemicals for toxicity."
      }]
    }],
    translations: {
      hi: "रासायनिक",
      zh: "化学物质",
      ja: "化学物質",
      ko: "화학물질",
      de: "Chemikalie",
      fr: "produit chimique",
      es: "químico",
      ru: "химическое вещество",
      ar: "مادة كيميائية"
    }
  }
};

const DictionaryPopup = ({ word, position, onClose, isMobile = false }) => {
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [userLanguage, setUserLanguage] = useState(null);
  const [translation, setTranslation] = useState('');
  const [translationLoading, setTranslationLoading] = useState(false);
  const popupRef = useRef(null);

  // Get user location with better fallback handling
  useEffect(() => {
    const getUserLocation = async () => {
      try {
        // Method 1: Try ip-api.com for country code
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3-second timeout

        const response = await fetch('http://ip-api.com/json', {
          signal: controller.signal,
          headers: {
            'Accept': 'application/json',
          }
        });
        clearTimeout(timeoutId);

        if (response.ok) {
          const data = await response.json();
          // ip-api.com returns 'countryCode'
          if (data.status === 'success' && data.countryCode) {
            const countryCode = data.countryCode;
            if (countryToLanguage[countryCode]) {
              setUserLocation(countryCode);
              setUserLanguage(countryToLanguage[countryCode]);
              return; // Exit if successful
            }
          }
        }
        throw new Error('ip-api.com failed or no country data');

      } catch (error) {
        console.log('IP location detection failed, using browser language as fallback:', error.message);

        // Enhanced browser language detection as a fallback
        const getBrowserLanguage = () => {
          const languages = [
            navigator.language,
            ...(navigator.languages || []),
            navigator.userLanguage,
            navigator.browserLanguage,
            navigator.systemLanguage
          ].filter(Boolean);

          for (const lang of languages) {
            const langCode = lang.split('-')[0].toLowerCase(); // Get base language code (e.g., 'en' from 'en-US')
            const langData = Object.values(countryToLanguage).find(l => l.code === langCode);
            if (langData) {
              return { langData, langCode };
            }
          }
          return null;
        };

        const browserLang = getBrowserLanguage();
        if (browserLang) {
          setUserLanguage(browserLang.langData);
          // Set a generic location based on language if IP detection failed
          const countryForLang = Object.keys(countryToLanguage).find(
            country => countryToLanguage[country].code === browserLang.langCode
          );
          if (countryForLang) {
            setUserLocation(countryForLang);
          } else {
            // If no specific country for the browser language, default to US/English
            setUserLanguage({ code: 'en', name: 'English' });
            setUserLocation('US');
          }
        } else {
          // Ultimate fallback - assume English
          setUserLanguage({ code: 'en', name: 'English' });
          setUserLocation('US');
        }
      }
    };

    getUserLocation();
  }, []);

  // Fetch definition with better error handling
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

        // Try external API with timeout and error handling
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

          const response = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${lowerWord}`,
            {
              signal: controller.signal,
              headers: {
                'Accept': 'application/json',
              }
            }
          );
          clearTimeout(timeoutId);

          if (response.ok) {
            const data = await response.json();
            if (data && data[0]) {
              setDefinition(data[0]);
              setLoading(false);
              return;
            }
          }
          throw new Error('API request failed');
        } catch (apiError) {
          console.log('Dictionary API failed:', apiError.message);

          // Create enhanced basic definition for unknown words
          const basicDefinition = {
            word: word,
            phonetic: `/${word}/`,
            meanings: [{
              partOfSpeech: "word",
              definitions: [{
                definition: `"${word}" - Click the speaker icon to hear pronunciation. Definition not available in offline dictionary.`,
                example: `This word was selected from the text. Try common words like "energy", "solar", "physics" for full definitions.`
              }]
            }]
          };

          setDefinition(basicDefinition);
        }
      } catch (err) {
        console.error('Definition fetch error:', err);
        setError('Unable to fetch definition');
      } finally {
        setLoading(false);
      }
    };

    if (word) {
      fetchDefinition();
    }
  }, [word]);

  // Translate word with better error handling
  useEffect(() => {
    const translateWord = async () => {
      if (!userLanguage || !definition || userLanguage.code === 'en') {
        setTranslation(''); // Clear translation if no user language or if it's English
        setTranslationLoading(false);
        return;
      }

      setTranslationLoading(true);

      try {
        // Check if we have a cached translation first
        if (fallbackDictionary[word.toLowerCase()]?.translations?.[userLanguage.code]) {
          setTranslation(fallbackDictionary[word.toLowerCase()].translations[userLanguage.code]);
          setTranslationLoading(false);
          return;
        }

        // Try translation services with timeout and error handling
        const translationMethods = [
          // Method 1: MyMemory API
          async () => {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5-second timeout

            const response = await fetch(
              `https://api.mymemory.translated.net/get?q=${encodeURIComponent(word)}&langpair=en|${userLanguage.code}`,
              { signal: controller.signal }
            );
            clearTimeout(timeoutId);

            if (response.ok) {
              const data = await response.json();
              if (data.responseData && data.responseData.translatedText &&
                  data.responseData.translatedText.toLowerCase() !== word.toLowerCase()) {
                return data.responseData.translatedText;
              }
            }
            throw new Error('MyMemory translation failed');
          }
        ];

        let translationResult = null;

        for (const method of translationMethods) {
          try {
            translationResult = await method();
            if (translationResult) break;
          } catch (error) {
            console.log('Translation method failed:', error.message);
            continue;
          }
        }

        if (translationResult) {
          setTranslation(translationResult);
        } else {
          // Fallback: Check if we have partial matches in our dictionary
          const similarWords = Object.keys(fallbackDictionary).find(key =>
            key.includes(word.toLowerCase()) || word.toLowerCase().includes(key)
          );

          if (similarWords && fallbackDictionary[similarWords]?.translations?.[userLanguage.code]) {
            setTranslation(`~${fallbackDictionary[similarWords].translations[userLanguage.code]}`);
          } else {
            setTranslation(''); // No translation available
          }
        }

      } catch (error) {
        console.log('Translation failed:', error);
        setTranslation(''); // Clear translation on error
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

    // Mobile-first responsive sizing
    const isMobileDevice = window.innerWidth <= 768;
    const popupWidth = isMobileDevice ? Math.min(320, window.innerWidth - 20) : 350;
    const popupHeight = isMobileDevice ? 'auto' : 250;
    const padding = isMobileDevice ? 10 : 10;

    if (isMobileDevice) {
      // On mobile, center the popup or position it at bottom
      return {
        position: 'fixed',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: `${popupWidth}px`,
        maxHeight: '80vh',
        zIndex: 1000,
        overflow: 'auto'
      };
    }

    // Desktop positioning logic
    let left = position.x;
    let top = position.y + 20;

    if (left + popupWidth > window.innerWidth - padding) {
      left = window.innerWidth - popupWidth - padding;
    }
    if (left < padding) {
      left = padding;
    }

    if (top + 250 > window.innerHeight - padding) {
      top = position.y - 250 - 10;
    }

    return {
      position: 'fixed',
      left: `${left}px`,
      top: `${top}px`,
      width: `${popupWidth}px`,
      zIndex: 1000
    };
  };

  if (!word || !position) return null;

  const isMobileDevice = window.innerWidth <= 768;

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileDevice && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-999"
          onClick={onClose}
        />
      )}

      <div
        ref={popupRef}
        style={getPopupStyle()}
        className={`bg-zinc-900 text-white border border-zinc-700 rounded-xl shadow-2xl p-4 ${
          isMobileDevice ? 'max-w-sm' : 'max-w-sm'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-blue-400" />
            <h3 className="font-bold text-lg break-words">{word}</h3>
            {userLocation && (
              <div className="flex items-center gap-1 text-xs text-zinc-400">
                <MapPin size={12} />
                <span>{userLocation}</span>
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-zinc-400 hover:text-white p-1 min-w-[32px] min-h-[32px] flex items-center justify-center"
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
              className="flex items-center gap-1 text-blue-400 hover:text-blue-300 mx-auto p-2 rounded hover:bg-zinc-800"
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
                  <p className="text-lg font-semibold text-green-300 break-words">{translation}</p>
                ) : (
                  <p className="text-sm text-zinc-400">Translation not available</p>
                )}
              </div>
            )}

            {/* Pronunciation */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm text-zinc-300 break-all">
                {definition?.phonetic || `/${word}/`}
              </span>
              <button
                onClick={playPronunciation}
                className="text-blue-400 hover:text-blue-300 p-2 rounded hover:bg-zinc-800 min-w-[32px] min-h-[32px] flex items-center justify-center"
                title="Play pronunciation"
              >
                <Volume2 size={14} />
              </button>
            </div>

            {/* Definitions */}
            <div className={`${isMobileDevice ? 'max-h-48' : 'max-h-32'} overflow-y-auto pr-1`}>
              {definition.meanings?.slice(0, 2).map((meaning, i) => (
                <div key={i} className="mb-2">
                  <span className="text-xs font-semibold text-blue-400 uppercase">
                    {meaning.partOfSpeech}
                  </span>
                  <p className="text-sm text-zinc-100 mt-1 break-words">
                    {meaning.definitions[0]?.definition}
                  </p>
                  {meaning.definitions[0]?.example && (
                    <p className="text-xs text-zinc-400 italic mt-1 break-words">
                      "{meaning.definitions[0].example}"
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default DictionaryPopup;
