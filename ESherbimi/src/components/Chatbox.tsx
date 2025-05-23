import React, { useState, useRef, useEffect } from 'react';

interface Message {
  text: string;
  isBot: boolean;
}

const Chatbox: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: "Përshëndetje! Si mund t'ju ndihmoj?", isBot: true }
  ]);

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) return;

    const userMessage = { text: message, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setMessage('');

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant that responds in Albanian." },
            { role: "user", content: message }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`Gabim në API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const reply = data?.choices?.[0]?.message?.content?.trim();

      setMessages(prev => [
        ...prev,
        { text: reply || 'Më falni, nuk mora përgjigje të vlefshme.', isBot: true }
      ]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [
        ...prev,
        { text: 'Gabim gjatë komunikimit me serverin.', isBot: true }
      ]);
    }
  };

  return (
    <div className={`chatbox ${isOpen ? 'open' : ''}`} style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      width: isOpen ? '300px' : '60px',
      height: isOpen ? '400px' : '60px',
      backgroundColor: 'white',
      borderRadius: '10px',
      boxShadow: '0 0 10px rgba(0,0,0,0.2)',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 1000
    }}>
      <div
        onClick={toggleChat}
        style={{
          backgroundColor: '#002244',
          color: 'white',
          padding: '10px 15px',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        {isOpen ? (
          <>
            <span>Asistenti Virtual</span>
            <span>✖</span>
          </>
        ) : (
          <span style={{ margin: 'auto' }}>💬</span>
        )}
      </div>

      {isOpen && (
        <>
          <div ref={chatMessagesRef} style={{
            padding: '15px',
            flexGrow: 1,
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column'
          }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                style={{
                  marginBottom: '10px',
                  padding: '8px 12px',
                  borderRadius: '12px',
                  maxWidth: '80%',
                  alignSelf: msg.isBot ? 'flex-start' : 'flex-end',
                  backgroundColor: msg.isBot ? '#e6e6e6' : '#002244',
                  color: msg.isBot ? '#000' : '#fff',
                  marginLeft: msg.isBot ? '0' : 'auto',
                  marginRight: msg.isBot ? 'auto' : '0',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word'
                }}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            padding: '10px',
            borderTop: '1px solid #e6e6e6'
          }}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Shkruaj një mesazh..."
              style={{
                flexGrow: 1,
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: '20px',
                marginRight: '5px'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: '#002244',
                color: 'white',
                border: 'none',
                borderRadius: '20px',
                padding: '8px 15px',
                cursor: 'pointer'
              }}
            >
              📤
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default Chatbox;
