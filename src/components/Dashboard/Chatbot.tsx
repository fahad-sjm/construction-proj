import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './Chatbot.module.css';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

interface QAEntry {
  question: string;
  response: string;
}

const initialMessages: Message[] = [
  { sender: 'bot', text: 'Welcome to the AI Assistant. How can I help you today?' },
];

const DEFAULT_WIDTH = 340;
const EXPANDED_WIDTH = 500;
const DEFAULT_HEIGHT = 400;
const EXPANDED_HEIGHT = '80vh';

const STORAGE_KEY = 'chat_history';

const Chatbot: React.FC = () => {
  const [qaHistory, setQaHistory] = useState<QAEntry[]>([]);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [minimized, setMinimized] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Load chat history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY);
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        setQaHistory(parsedHistory);
        // Convert QA history to messages
        const historyMessages = parsedHistory.flatMap((entry: QAEntry) => [
          { sender: 'user' as const, text: entry.question },
          { sender: 'bot' as const, text: entry.response }
        ]);
        setMessages([...initialMessages, ...historyMessages]);
      } catch (error) {
        console.error('Error loading chat history:', error);
      }
    }
  }, []);

  // Save chat history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(qaHistory));
  }, [qaHistory]);

  useEffect(() => {
    if (!minimized && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, minimized]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { sender: 'user' as const, text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(`https://demo-chatbot.simplogics.com/api/v1/chat/${encodeURIComponent(input)}`);
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setMessages(prev => [...prev, { sender: 'bot', text: data.response }]);
      setQaHistory(prev => [...prev, { question: input, response: data.response }]);
    } catch (err) {
      setMessages(prev => [...prev, { sender: 'bot', text: 'Sorry, there was an error getting a response.' }]);
      setQaHistory(prev => [...prev, { question: input, response: 'Sorry, there was an error getting a response.' }]);
    } finally {
      setLoading(false);
    }
  };

  // Reset chat history and messages
  const handleReset = () => {
    setQaHistory([]);
    setMessages(initialMessages);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <div
      className={styles.chatbot}
      style={{
        width: minimized ? 260 : (expanded ? EXPANDED_WIDTH : DEFAULT_WIDTH),
        height: minimized ? 48 : (expanded ? EXPANDED_HEIGHT : DEFAULT_HEIGHT),
        minHeight: minimized ? 48 : 200,
        minWidth: 260,
        zIndex: 1000,
        transition: 'box-shadow 0.2s, width 0.3s, height 0.3s ease-in-out',
      }}
    >
      <div
        className={styles.header}
        style={{ userSelect: 'none' }}
      >
        <span className={styles.botIcon}>🤖</span>
        <span>AI Assistant</span>
        {!minimized && (
          <button
            className={styles.expandBtn}
            title={expanded ? 'Collapse' : 'Expand'}
            onClick={e => { e.stopPropagation(); setExpanded(e => !e); }}
            style={{ marginLeft: 8 }}
          >
            {expanded ? '⊖' : '⊕'}
          </button>
        )}
        <button
          className={styles.closeBtn}
          title={minimized ? 'Open' : 'Minimize'}
          onClick={e => { e.stopPropagation(); setMinimized(m => !m); }}
        >
          {minimized ? '▲' : '–'}
        </button>
        <button
          className={styles.resetBtn}
          title="Reset chat history"
          onClick={handleReset}
          style={{ marginLeft: 8 }}
        >
          ⟳
        </button>
      </div>
      {!minimized && (
        <>
          <div className={styles.messages}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={msg.sender === 'user' ? styles.userMsg : styles.botMsg}
              >
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
            ))}
            {loading && (
              <div className={styles.botMsg}><em>Loading...</em></div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <form className={styles.inputRow} onSubmit={handleSend}>
            <input
              className={styles.input}
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={loading}
            />
            <button className={styles.sendBtn} type="submit" disabled={loading}>➤</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatbot; 