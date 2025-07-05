import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Send, Bot, User, Loader2, HelpCircle } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showQuestions, setShowQuestions] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedQuestions = [
    "What can you help me with?",
    "Tell me a joke",
    "How do I learn programming?",
    "What's the weather like today?",
    "Can you explain artificial intelligence?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setShowQuestions(false);

    try {
      const response = await axios.post('http://192.168.1.100:8000/query', {
        message: inputMessage
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.message,
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error. Please try again.',
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      sendMessage(e);
    }
  };

  const handleQuestionClick = (question) => {
    setInputMessage(question);
    setShowQuestions(false);
  };

  const toggleQuestions = () => {
    setShowQuestions(!showQuestions);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
    setShowQuestions(true);
  };

  const handleInputBlur = () => {
    // Delay hiding questions to allow clicking on them
    setTimeout(() => {
      setIsInputFocused(false);
      setShowQuestions(false);
    }, 200);
  };

  return (
    <div className="min-h-screen flex justify-center items-center p-5">
      <div className="chat-container">
        {/* Header */}
        <div className="chat-header">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Bot className="w-6 h-6" />
            <h1 className="text-2xl font-semibold">Aclic Chatbot</h1>
          </div>
          <p className="text-sm opacity-90">Powered by OpenAI</p>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {messages.length === 0 && (
            <div className="text-center py-12 text-gray-600">
              <Bot className="w-12 h-12 text-primary-500 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold mb-3 text-gray-800">Welcome to Aclic Chatbot!</h2>
              <p className="text-base leading-relaxed max-w-md mx-auto">
                I'm here to help you with any questions you might have. Feel free to ask me anything!
              </p>
            </div>
          )}
          
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender} ${message.isError ? 'error' : ''}`}
            >
              <div className="message-avatar">
                {message.sender === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="text-xs text-gray-500 mt-1 px-1">
                  {/* {message.timestamp} */}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="message bot">
              <div className="message-avatar">
                <Bot size={20} />
              </div>
              <div className="message-content">
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-2xl rounded-bl-md border border-gray-200 text-gray-600 text-sm">
                  <Loader2 className="w-4 h-4 animate-spin-slow" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Container */}
        <div className="border-t border-gray-200 bg-white">
          {/* Input Form */}
          <div className="px-6 pt-6 pb-3">
            <form onSubmit={sendMessage}>
              <div className="flex gap-3 items-end">
                <textarea
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  placeholder="Type your message here..."
                  disabled={isLoading}
                  rows="1"
                  className="input-field"
                />
                <button
                  type="submit"
                  disabled={!inputMessage.trim() || isLoading}
                  className="send-button"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>

          {/* Questions Toggle Button */}
          <div className="px-6 pb-2">
            <button
              onClick={toggleQuestions}
              className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-gray-100 text-gray-600 rounded-full hover:bg-gray-200 transition-colors duration-200"
            >
              <HelpCircle size={14} />
              {showQuestions ? 'Hide' : 'Show'} Suggestions
            </button>
          </div>

          {/* Suggested Questions */}
          {showQuestions && (
            <div className="px-6 pb-6">
              <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 animate-fade-in">
                <h3 className="text-xs font-medium text-gray-700 mb-2">Try asking:</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestedQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuestionClick(question)}
                      className="px-3 py-1.5 text-xs bg-white text-gray-600 hover:bg-primary-50 hover:text-primary-600 rounded-full border border-gray-200 transition-colors duration-200"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 