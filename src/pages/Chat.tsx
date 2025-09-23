import React, { useState } from 'react';
import { Send, Mic, MicOff } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatMessage {
  id: number;
  message: string;
  timestamp: string;
  isUser: boolean;
}

// Predefined Q&A pairs (Weather + Crop based)
const qaPairs = {
  en: [
    { q: "What is the weather forecast for tomorrow", a: "Tomorrow's forecast shows light rain with a maximum of 30°C." },
    { q: "Is it good to sow rice now", a: "Yes, June–July monsoon season is ideal for sowing rice in Kerala." },
    { q: "Should I water my coconut trees today", a: "Since rain is expected tomorrow, delay watering to avoid over-saturation." },
    { q: "Best fertilizer for paddy crop", a: "Urea and DAP in the recommended ratio are best for paddy growth." },
    { q: "Can I spray pesticide during rain", a: "Avoid spraying pesticides during rain as it reduces effectiveness." },
    { q: "When should I harvest bananas", a: "Bananas are ready for harvest 8–10 months after planting when fruits are plump." },
    { q: "How often to irrigate vegetables in summer", a: "Irrigate vegetables every 2–3 days during peak summer." },
    { q: "Is there a chance of flood next week", a: "Yes, IMD predicts heavy rainfall in central Kerala, be cautious." },
    { q: "What crop can I plant after harvesting rice", a: "Green gram or cowpea are good choices to restore soil nutrients." },
    { q: "Should I protect pepper plants from heavy wind", a: "Yes, provide support sticks to prevent pepper vines from breaking." }
  ],
  ml: [
    { q: "നാളെ കാലാവസ്ഥ പ്രവചനം എന്താണ്?", a: "നാളെ ചെറിയ മഴയും പരമാവധി 30°C വരെയും പ്രതീക്ഷിക്കുന്നു." },
    { q: "ഇപ്പോൾ നെല്ല് നടാൻ പറ്റുമോ?", a: "അതെ, കേരളത്തിൽ ജൂൺ–ജൂലൈ മൺസൂൺ കാലം നെല്ലിനുള്ള ഏറ്റവും നല്ല സമയമാണ്." },
    { q: "ഇന്ന് തേങ്ങാ മരങ്ങൾക്ക് വെള്ളം കൊടുക്കണോ?", a: "നാളെ മഴ ലഭിക്കുമെന്നതിനാൽ ഇന്ന് വെള്ളം കൊടുക്കുന്നത് ഒഴിവാക്കാം." },
    { q: "നെല്ലിന് ഏറ്റവും നല്ല വളം ഏത്?", a: "യൂറിയയും ഡി.എ.പി.യും ശരിയായ അനുപാതത്തിൽ നൽകുന്നത് ഉചിതമാണ്." },
    { q: "മഴയിൽ കീടനാശിനി തളിക്കാമോ?", a: "മഴയിൽ തളിക്കുന്നതിലൂടെ ഫലപ്രാപ്തി കുറയുന്നതിനാൽ ഒഴിവാക്കുക." },
    { q: "വാഴപ്പഴം എപ്പോൾ കൊയ്യാം?", a: "വാഴ 8–10 മാസം കഴിഞ്ഞാൽ പഴങ്ങൾ പുഷ്ടമായപ്പോൾ കൊയ്യാം." },
    { q: "ചൂടുകാലത്ത് പച്ചക്കറികൾക്ക് എത്ര ദിവസത്തിന് ഒരിക്കൽ വെള്ളം കൊടുക്കണം?", a: "ചൂടുകാലത്ത് 2–3 ദിവസത്തിന് ഒരിക്കൽ വെള്ളം കൊടുക്കുക." },
    { q: "അടുത്ത ആഴ്ച വെള്ളപ്പൊക്കം ഉണ്ടാകുമോ?", a: "അതെ, കേരളത്തിന്റെ മധ്യഭാഗത്ത് ശക്തമായ മഴ ലഭിക്കുമെന്ന് കാലാവസ്ഥ വകുപ്പ് മുന്നറിയിപ്പ് നൽകി." },
    { q: "നെല്ല് കൊയ്യിയതിന് ശേഷം ഏത് വിള നടാം?", a: "ചെറുപയർ അല്ലെങ്കിൽ കൊങ്ങിണി നടുന്നത് മണ്ണിന്റെ പോഷകഗുണം വീണ്ടെടുക്കാൻ നല്ലതാണ്." },
    { q: "കാറ്റിൽ കുരുമുളക് ചെടികളെ സംരക്ഷിക്കണോ?", a: "അതെ, വള്ളികൾ പൊട്ടുന്നത് തടയാൻ തുണികോലുകൾ ഉപയോഗിക്കുക." }
  ]
};

const Chat: React.FC = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now(),
      message: newMessage,
      timestamp: new Date().toLocaleTimeString(),
      isUser: true
    };

    // Find matching answer
    const pair = qaPairs[language].find(
      qa => qa.q.toLowerCase() === newMessage.toLowerCase()
    );

    const botResponse: ChatMessage = {
      id: Date.now() + 1,
      message: pair ? pair.a : (language === "en" ? "Sorry, I only answer weather and crop-related questions." : "ക്ഷമിക്കണം, ഞാൻ കാലാവസ്ഥയും കൃഷിയുമായി ബന്ധപ്പെട്ട ചോദ്യങ്ങൾക്കു മാത്രമേ ഉത്തരം നൽകൂ."),
      timestamp: new Date().toLocaleTimeString(),
      isUser: false
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setNewMessage('');
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      setTimeout(() => {
        setNewMessage(language === 'en' ? "What is the weather forecast for tomorrow?" : "നാളെ കാലാവസ്ഥ പ്രവചനം എന്താണ്?");
        setIsListening(false);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col h-screen pb-20 lg:pb-4">
      <div className="p-4 bg-white border-b">
        <h1 className="text-xl font-bold text-green-600">{t('chat')}</h1>
        <p className="text-sm text-gray-600">Ask only weather or crop-based questions</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.isUser
                  ? 'bg-green-600 text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{msg.message}</p>
              <p className="text-xs opacity-75 mt-1">{msg.timestamp}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 bg-white border-t">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={language === 'en' ? 'Ask about weather or crops...' : 'കാലാവസ്ഥയോ കൃഷിയോ ചോദിക്കുക...'}
              className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              onClick={toggleListening}
              className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors ${
                isListening 
                  ? 'bg-red-500 text-white animate-pulse' 
                  : 'text-gray-400 hover:text-green-600'
              }`}
            >
              {isListening ? <MicOff size={16} /> : <Mic size={16} />}
            </button>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
        {isListening && (
          <p className="text-xs text-red-600 mt-2 animate-pulse">
            🔴 Listening... Speak now
          </p>
        )}
      </div>
    </div>
  );
};

export default Chat;
