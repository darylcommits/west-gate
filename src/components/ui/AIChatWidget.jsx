import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageCircle, FiX, FiSend, FiLoader } from 'react-icons/fi';
import { chatWithAI } from '../../services/aiService';

const SUGGESTED_QUESTIONS = [
  'What properties are available?',
  'Do you have beachfront lots?',
  'What is your price range?',
  'How can I book a viewing?',
];

const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }} />
    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }} />
    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }} />
  </div>
);

export const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm **West AI**, your personal real estate assistant 👋\n\nI can help you find properties, answer questions about West Gate Realty, or guide you through the buying process. How can I help you today?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 300);
      setHasNewMessage(false);
    }
  }, [isOpen, messages]);

  const sendMessage = async (text) => {
    const userText = text || input.trim();
    if (!userText || isLoading) return;

    const newMessages = [...messages, { role: 'user', content: userText }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await chatWithAI(
        newMessages.filter(m => m.role !== 'system').map(m => ({
          role: m.role,
          content: m.content,
        }))
      );
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
      if (!isOpen) setHasNewMessage(true);
    } catch (error) {
      console.error('AI chat error:', error);
      const isKeyError = error.message?.includes('API key') || error.message?.includes('401') || error.message?.includes('403');
      
      let errorText = 'Sorry, I\'m having trouble connecting right now.';
      if (isKeyError) {
        errorText = '⚠️ The AI assistant is not configured yet.';
      } else {
        errorText = `⚠️ Connection error: ${error.message || 'Unknown error'}`;
      }
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `${errorText}\n\nPlease contact us directly through the **Contact page** while we fix this.`,
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // Simple markdown-like renderer for bold text
  const renderContent = (text) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    );
  };

  return (
    <>
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] max-h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-navy-900 to-navy-700 px-5 py-4 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-crimson-500 flex items-center justify-center text-white font-bold text-lg">
                  W
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-green-400 border-2 border-navy-900"></span>
              </div>
              <div className="flex-1">
                <p className="text-white font-bold text-sm">West AI</p>
                <p className="text-navy-300 text-xs">West Gate Realty Assistant • Online</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0 max-h-[380px] custom-scrollbar bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex items-end gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-crimson-500 flex items-center justify-center text-white text-xs font-bold shrink-0 mb-1">
                      W
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-navy-900 text-white rounded-br-sm'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                    }`}
                  >
                    {renderContent(msg.content)}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-end gap-2">
                  <div className="w-7 h-7 rounded-full bg-crimson-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    W
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-sm shadow-sm border border-gray-100">
                    <TypingIndicator />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (only at start) */}
            {messages.length <= 1 && (
              <div className="px-4 py-2 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-400 mb-2">Suggested questions:</p>
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      className="text-xs bg-white border border-gray-200 text-navy-700 px-3 py-1.5 rounded-full hover:bg-navy-900 hover:text-white hover:border-navy-900 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="px-4 py-3 bg-white border-t border-gray-100 flex items-center gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about our properties..."
                rows={1}
                disabled={isLoading}
                className="flex-1 resize-none text-sm text-navy-900 placeholder-gray-400 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-navy-900/20 focus:border-navy-900 transition-all max-h-24 disabled:opacity-50"
                style={{ lineHeight: '1.5' }}
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || isLoading}
                className="w-10 h-10 rounded-xl bg-navy-900 text-white flex items-center justify-center hover:bg-crimson-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shrink-0"
              >
                {isLoading ? (
                  <FiLoader className="w-4 h-4 animate-spin" />
                ) : (
                  <FiSend className="w-4 h-4" />
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-5 right-4 sm:right-6 z-50 w-14 h-14 rounded-full bg-navy-900 text-white shadow-lg hover:bg-crimson-600 transition-colors flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open AI Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <FiX className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <FiMessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notification dot */}
        {!isOpen && hasNewMessage && (
          <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-crimson-500 border-2 border-white animate-pulse" />
        )}

        {/* Pulse ring when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full border-2 border-navy-900 animate-ping opacity-20" />
        )}
      </motion.button>
    </>
  );
};
