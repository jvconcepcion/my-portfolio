'use client';

import { useState, useEffect, useRef, FormEvent } from 'react';
import { MessagesProps } from '@interfaces';
import { debounce } from 'lodash';
import {
  MdOutlineDarkMode,
  MdDarkMode,
  MdRecordVoiceOver,
  MdContentCopy
} from 'react-icons/md';
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
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isAssistantTyping, setIsAssistantTyping] = useState<boolean>(false);
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

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
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

    // Only trigger greeting on first load if no messages are saved
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
    <div className={`max-w-2xl mx-auto rounded-md shadow-lg transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Header */}
      <div className={`flex items-center justify-between p-2 rounded-t-md ${darkMode ? 'bg-black/80' : 'bg-gray-300'}`}>
        <div className='flex items-center space-x-2'>
          <Image src='/ai.jpg' width={32} height={32} alt='AI Assistant' className='w-8 h-8 rounded-full' />
          <div>
            <p className={`text-sm ${darkMode ? 'text-white' : 'text-black'} font-semibold`}>Scaeva</p>
            {/* Temporarily hidden due to some issue */}
            {/* <p className={`text-xs ${darkMode ? 'text-white' : 'text-black'}`}>{status === 'active' ? 'Active now' : status === 'idle' ? 'Idle' : 'Offline'}</p> */}
            <p className={`text-xs ${darkMode ? 'text-white' : 'text-black'}`}>Active now</p>
          </div>
        </div>
        <button onClick={() => setDarkMode(!darkMode)} className='p-1 rounded-full bg-transparent border border-gray-500 hover:bg-gray-500'>
          {darkMode ? <MdOutlineDarkMode size={20} /> : <MdDarkMode size={20} />}
        </button>
      </div>

      {/* Chat Messages */}
      <div className={`h-96 overflow-y-auto space-y-4 p-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {messages.map((msg: any, index: number) => (
          <div
            key={index}
            className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
          >
            {/* Chat Bubble */}
            <div className={`text-xs p-3 rounded-md ${msg.role === 'user' ? 'bg-blue-500 text-white max-w-[80%]' : darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'} relative max-w-[80%]`}>
              {msg.content}
            </div>

            {/* Icons - Positioned below the message */}
            <div className='flex items-center gap-1 mt-1'>
              <button onClick={() => speakText(msg.content)} className='p-1 bg-transparent hover:bg-gray-500 rounded'>
                <MdRecordVoiceOver size={15} />
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
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <form onSubmit={handleSubmit} className={`flex gap-2 p-4 ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask about my experience...'
          disabled={isLoading}
          className={`flex-1 p-2 border rounded-md focus:outline-none placeholder:text-sm text-xs xs:text-[16px] ${darkMode ? 'bg-gray-800 text-white border-gray-700 focus:ring-gray-500' : 'bg-white text-black border-gray-300 focus:ring-blue-500'}`}
        />
        <button type='submit' disabled={isLoading} className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'>
          Send
        </button>
      </form>
    </div>
  )
};

export default Messenger;