'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

const BOT_RESPONSES_FR = [
  { keywords: ['bonjour', 'salut', 'coucou'], answer: "Bonjour ! Comment puis-je vous aider avec votre apprentissage de la conduite aujourd'hui ?" },
  { keywords: ['prix', 'tarif', 'combien', 'coût'], answer: "Nos formules Permis B commencent à partir de 650€. Les stages de code intensifs sont à 250€. Souhaitez-vous voir le détail ?" },
  { keywords: ['code', 'route', 'examen'], answer: "L'examen du code de la route comporte 40 questions. Vous devez obtenir au moins 35 bonnes réponses. Pratiquez avec nos quiz !" },
  { keywords: ['permis', 'conduite', 'heures'], answer: "La formation pratique légale est d'au moins 20 heures de conduite sur boîte manuelle, ou 13h sur boîte automatique." },
  { keywords: ['auto-ecole', 'ecole', 'localiser', 'où'], answer: "Nous avons plusieurs auto-écoles partenaires. Vous pouvez consulter la page 'Auto-écoles' pour trouver la plus proche de chez vous sur la carte." }
];

const BOT_RESPONSES_RU = [
  { keywords: ['привет', 'здравствуйте', 'добрый', 'здравствуй'], answer: "Здравствуйте! Как я могу помочь вам с обучением вождению сегодня?" },
  { keywords: ['цена', 'тариф', 'стоимость', 'сколько', 'стоит'], answer: "Наши пакеты на права категории B начинаются от 650€. Интенсивные курсы теории стоят 250€. Хотите узнать подробности?" },
  { keywords: ['теория', 'код', 'экзамен', 'пдд', 'тест'], answer: "Теоретический экзамен состоит из 40 вопросов. Для успешной сдачи нужно правильно ответить минимум на 35. Тренируйтесь на наших тестах!" },
  { keywords: ['права', 'вождение', 'часы', 'часов', 'автомат'], answer: "Обязательное практическое обучение составляет минимум 20 часов вождения на механике или 13 часов на автомате." },
  { keywords: ['автошкола', 'школа', 'где', 'адрес', 'карта'], answer: "У нас много автошкол-партнеров. Вы можете найти ближайшую на вкладке 'Автошколы' на карте." }
];

export default function ChatBot() {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize welcome message based on language
  useEffect(() => {
    setMessages([
      { 
        id: 0, 
        sender: 'bot', 
        text: language === 'fr' 
          ? 'Bonjour ! Je suis votre assistant "Le Volant Pour Tous". Avez-vous des questions sur le permis ou le code de la route ?' 
          : 'Здравствуйте! Я ваш помощник "Le Volant Pour Tous". Есть ли у вас вопросы о водительских правах или правилах дорожного движения?' 
      }
    ]);
  }, [language]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    const newUserMsg: Message = { id: Date.now(), sender: 'user', text: userText };
    
    setMessages(prev => [...prev, newUserMsg]);
    setInputText('');
    setIsTyping(true);

    // Simulate thinking and finding response
    setTimeout(() => {
      let responseText = language === 'fr'
        ? "Je suis désolé, je n'ai pas bien compris. Pourriez-vous reformuler votre question concernant le code de la route ou le permis ?"
        : "Извините, я вас не совсем понял. Не могли бы вы переформулировать ваш вопрос о правилах дорожного движения или правах?";
      
      const lowerInput = userText.toLowerCase();
      const responses = language === 'fr' ? BOT_RESPONSES_FR : BOT_RESPONSES_RU;
      const matchedRule = responses.find(rule => 
        rule.keywords.some(kw => lowerInput.includes(kw))
      );
      
      if (matchedRule) {
        responseText = matchedRule.answer;
      }

      setMessages(prev => [...prev, { id: Date.now() + 1, sender: 'bot', text: responseText }]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-80 sm:w-96 rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.15)] overflow-hidden mb-4 border border-gray-100 flex flex-col"
            style={{ height: '500px', maxHeight: '70vh' }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 text-white flex justify-between items-center relative overflow-hidden">
              <div className="absolute top-[-50%] right-[-10%] w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
              <div className="flex items-center gap-3 relative z-10">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center p-2 backdrop-blur-sm">
                  <span className="text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">
                    {language === 'fr' ? 'Assistant LVPT' : 'Помощник LVPT'}
                  </h3>
                  <p className="text-xs text-blue-100 flex items-center gap-1 mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-green-400"></span> 
                    {language === 'fr' ? 'En ligne' : 'В сети'}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-2 rounded-full transition-colors relative z-10"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {messages.map(msg => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm mr-2 flex-shrink-0 self-end mb-1">
                        🤖
                      </div>
                    )}
                    <div 
                      className={`max-w-[75%] p-3 rounded-2xl ${
                        msg.sender === 'user' 
                          ? 'bg-blue-600 text-white rounded-br-none shadow-md' 
                          : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none shadow-sm'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{msg.text}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start items-center"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm mr-2 flex-shrink-0">
                    🤖
                  </div>
                  <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1">
                    <motion.div className="w-2 h-2 bg-gray-300 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0 }} />
                    <motion.div className="w-2 h-2 bg-gray-300 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }} />
                    <motion.div className="w-2 h-2 bg-gray-300 rounded-full" animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 relative">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={language === 'fr' ? "Posez votre question..." : "Задайте ваш вопрос..."}
                className="w-full bg-gray-50 border border-gray-200 text-sm rounded-full pl-4 pr-12 py-3 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all font-medium text-gray-700"
              />
              <button 
                type="submit"
                disabled={!inputText.trim()}
                className="absolute right-6 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center bg-blue-600 text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors shadow-sm"
              >
                <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_10px_25px_rgba(37,99,235,0.4)] hover:bg-blue-700 hover:shadow-[0_10px_35px_rgba(37,99,235,0.5)] transition-all z-50 border-4 border-white"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </motion.svg>
          ) : (
            <motion.svg key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
