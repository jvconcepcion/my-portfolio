'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { MessagesProps } from '@interfaces';
import { debounce } from 'lodash';
import {
  MdOutlineDarkMode,
  MdDarkMode,
  MdRecordVoiceOver,
  MdContentCopy,
  MdOutlineStopCircle
} from 'react-icons/md';
import { BsSendFill, BsSendSlashFill } from "react-icons/bs";
import Image from 'next/image';

const Messenger: React.FC = () => {
  const [messages, setMessages] = useState<MessagesProps[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('chat_messages') || '[]');
    }
    return [];
  });
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [isAssistantTyping, setIsAssistantTyping] = useState<boolean>(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [status, setStatus] = useState<'active' | 'idle' | 'offline'>('offline');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const fetchStatus = debounce(async () => {
    try {
      const response = await fetch('/api/chat');
      if (!response.ok) throw new Error('Failed to fetch status');
      const data = await response.json();
      setStatus(data.status);
      scrollToBottom();
    } catch (error) {
      setStatus('offline');
    }
  }, 1000);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

const speakWithOpenAI = async (text: string, index: number) => {
  try {
    setPlayingIndex(index);
    const response = await fetch('/api/chat/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    const { audioUrl } = await response.json();
    const audio = new Audio(audioUrl);

    audio.onended = () => setPlayingIndex(null);
    audio.onerror = () => setPlayingIndex(null);
    audio.play();
  } catch (err) {
    setPlayingIndex(null);
    console.error('Failed to play audio:', err);
  }
};

  const copyText = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.log('Failed to copy text.');
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // setIsLoading(true);
    setIsAssistantTyping(true);
    const newMessages: MessagesProps[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages })
      });

      if (!response.ok) throw new Error('API error');
      const data: { reply: string } = await response.json();

      setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      setIsAssistantTyping(false);
      // setStatus('idle');
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "Sorry, I'm having trouble connecting. Please try again later." }]);
      setIsAssistantTyping(false);
      setStatus('offline');
    }
    setIsLoading(false);
  };

  useEffect(() => {
    localStorage.setItem('chat_messages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const fetchData = async () => await fetchStatus();

    scrollToBottom();
    fetchData();

    if (messages.length === 0) {
      setIsAssistantTyping(true);
      (async () => {
        try {
          const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              messages: [{ role: 'user', content: '__INIT__' }]
            })
          });

          if (!response.ok) throw new Error('Failed to fetch greeting');
          const data: { reply: string } = await response.json();

          setMessages([{ role: 'assistant', content: data.reply }]);
        } catch (error) {
          setMessages([
            { role: 'assistant', content: 'Failed to load greeting. Try refreshing.' }
          ]);
        } finally {
          setIsAssistantTyping(false);
        }
      })();
    }

    const interval = setInterval(fetchStatus, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`max-w-2xl mx-auto rounded-md shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-800 text-white' : 'bg-gray-300 text-black'} glow-blue`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-2 rounded-t-md ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}>
        <div className='flex items-center space-x-2'>
          <Image src='/ai.jpg' width={32} height={32} alt='AI Assistant' className='w-8 h-8 rounded-full' />
          <div>
            <p className={`text-sm ${darkMode ? 'text-white' : 'text-black'} font-semibold`}>Scaeva</p>
          </div>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className='p-1 rounded-full bg-transparent border border-gray-500 hover:bg-gray-500'>
          {darkMode ? <MdOutlineDarkMode size={20} /> : <MdDarkMode size={20} />}
        </button>
      </div>

      {/* Chat Messages */}
      <div 
        className={`max-h-96 overflow-y-auto space-y-4 p-4 pb-0 ${darkMode ? 'bg-gray-800' : 'bg-gray-300'} scrollbar-thin`}
        style={{
          scrollbarColor: `${darkMode ? '#374151' : '#374151'} transparent`,
        }}
      >
        {messages.map((msg: any, index: number) => (
          <div
            key={index}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Chat Bubble */}
            <div 
              className={`text-[10px] xs:text-xs p-3 rounded-md ${msg.role === 'user' ? 'bg-blue-500 text-white max-w-[80%]' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} relative max-w-[80%]`}
              dangerouslySetInnerHTML={msg.role === 'assistant' ? { __html: msg.content } : undefined}
            >
              {msg.role === 'user' ? msg.content : null}
            </div>

            {/* Chat actions */}
            <div className='flex items-center gap-1 mt-1'>
              <button 
                className='p-1 bg-transparent hover:bg-gray-500 rounded'
                onClick={() =>
                  playingIndex === index
                    ? setPlayingIndex(null)
                    : speakWithOpenAI(msg.content, index)
                }
              >
                {playingIndex === index ? (
                  <MdOutlineStopCircle size={15} />
                ) : (
                  <MdRecordVoiceOver size={15} />
                )}
              </button>
              <button onClick={() => copyText(msg.content)} className='p-1 bg-transparent hover:bg-gray-500 rounded'>
                <MdContentCopy size={15} />
              </button>
            </div>
          </div>
        ))}

        {isAssistantTyping && (
          <div className="flex items-start">
            <div className={`text-xs italic animate-pulse px-3 py-2 rounded-md ${darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-600'}`}>
              Scaeva is typing<span className="animate-ping ml-1">...</span>
            </div>
          </div>
        )}
        {/* Auto-scroll anchor */}
        <span ref={messagesEndRef}/>
      </div>

      {/* Suggestion bubbles for first-time users */}
      {messages.length === 1 && (
        <div className="flex flex-col gap-2 mt-4 px-4">
          {[
            "Who is Jonathan?",
            "Provide a full list of his work experience.",
            "Highlight his skills."
          ].map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setInput(suggestion);
                setTimeout(() => {
                  document.getElementById('messenger-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                }, 0);
              }}
              className={`self-end px-4 py-2 rounded-md text-xs shadow hover:bg-blue-200 transition
                ${darkMode
                  ? 'bg-[#2e373d] text-gray-200 hover:bg-[#2e374d]'
                  : 'bg-blue-100 text-gray-800'}
              `}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Input Field */}
      <form 
        id="messenger-form"
        onSubmit={handleSubmit} 
        className={`flex gap-2 p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-300'}`}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask Scaeva'
          disabled={isLoading}
          className={`flex-1 p-2 border rounded-md focus:outline-none placeholder:text-sm text-xs xs:text-[16px] ${darkMode ? 'bg-gray-800 text-white border-gray-700 focus:ring-gray-500' : 'bg-white text-black border-gray-300 focus:ring-blue-500'}`}
        />
        <button
          type='submit'
          disabled={isLoading || input.trim() === ""}
          className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
        >
          {input !== "" ? <BsSendFill /> : <BsSendSlashFill />}
        </button>
      </form>
    </div>
  )
};

export default Messenger;