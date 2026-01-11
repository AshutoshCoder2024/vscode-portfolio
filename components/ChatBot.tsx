import { useState, useRef, useEffect } from 'react';
import { VscSend, VscLoading, VscClose } from 'react-icons/vsc';
import styles from '@/styles/ChatBot.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatBotProps {
  onClose?: () => void;
  isMinimized?: boolean;
}

const ChatBot = ({ onClose, isMinimized = false }: ChatBotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hi! I'm Ashutosh's AI assistant. I can answer questions about his background, skills, projects, and experience. How can I help you?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input when component mounts or becomes visible
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setError(null);

    // Add user message to chat
    const newUserMessage: Message = {
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newUserMessage]);

    setIsLoading(true);

    try {
      // Prepare conversation history (exclude welcome message, last 10 messages for context)
      // Filter out the initial welcome message to avoid history issues
      const conversationHistory = messages
        .filter((msg, index) => {
          // Skip the first message if it's the welcome message
          if (index === 0 && msg.role === 'assistant' && msg.content.includes("Hi! I'm Ashutosh's AI assistant")) {
            return false;
          }
          return true;
        })
        .slice(-10)
        .map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));

      // Call API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory,
        }),
      });

      // Check if response is ok before parsing JSON
      if (!response.ok) {
        let errorMessage = 'Failed to get response';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch {
          // If JSON parsing fails, use status text
          errorMessage = response.statusText || `HTTP ${response.status}: ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      // Parse JSON response
      let data;
      try {
        data = await response.json();
      } catch (parseError) {
        throw new Error('Invalid response from server');
      }

      // Validate response data
      if (!data || !data.message) {
        throw new Error('Invalid response format');
      }

      // Add assistant response to chat
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setError(null);
    } catch (err: any) {
      console.error('Chat error:', err);
      const errorMsg = err?.message || 'Failed to send message. Please try again.';
      setError(errorMsg);
      
      // Add error message to chat
      const errorMessage: Message = {
        role: 'assistant',
        content: `Sorry, I encountered an error: ${errorMsg}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Hi! I'm Ashutosh's AI assistant. I can answer questions about his background, skills, projects, and experience. How can I help you?",
        timestamp: new Date(),
      },
    ]);
    setError(null);
  };

  return (
    <div className={`${styles.chatBot} ${isMinimized ? styles.minimized : ''} ${onClose ? styles.modal : ''}`}>
      {/* Chat Header */}
      <div className={styles.header}>
        <div className={styles.headerInfo}>
          <div className={styles.avatar}>
            <span>AI</span>
          </div>
          <div>
            <h3 className={styles.title}>Ashutosh's AI Assistant</h3>
            <p className={styles.subtitle}>Ask me anything about Ashutosh</p>
          </div>
        </div>
        <div className={styles.headerActions}>
          <button
            onClick={handleClearChat}
            className={styles.clearButton}
            title="Clear chat"
            aria-label="Clear chat"
          >
            Clear
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className={styles.closeButton}
              title="Close chat"
              aria-label="Close chat"
            >
              <VscClose />
            </button>
          )}
        </div>
      </div>

      {/* Messages Container */}
      <div className={styles.messagesContainer}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${styles.message} ${styles[message.role]}`}
          >
            <div className={styles.messageContent}>
              <p>{message.content}</p>
              <span className={styles.timestamp}>
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        ))}

        {/* Loading indicator */}
        {isLoading && (
          <div className={`${styles.message} ${styles.assistant}`}>
            <div className={styles.messageContent}>
              <div className={styles.loadingDots}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className={styles.errorMessage}>
            <p>{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className={styles.inputArea}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask about Ashutosh's skills, projects, or experience..."
          className={styles.input}
          disabled={isLoading}
          maxLength={1000}
        />
        <button
          onClick={handleSend}
          disabled={!input.trim() || isLoading}
          className={styles.sendButton}
          aria-label="Send message"
        >
          {isLoading ? (
            <VscLoading className={styles.loadingIcon} />
          ) : (
            <VscSend />
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatBot;

