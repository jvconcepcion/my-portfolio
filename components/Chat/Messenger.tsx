'use client';

import { useState, useEffect, FormEvent } from 'react';
import { MessengerProps } from '@interfaces';
import Image from 'next/image';

const Messenger: React.FC = () => {
  const [messages, setMessages] = useState<MessengerProps[]>(() => JSON.parse(localStorage.getItem("chat_messages") || "[]"));
  const [input, setInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("chat_messages", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim()) return;

    // setIsLoading(true);
    const newMessages: MessengerProps[] = [...messages, { role: 'user', content: input }];
    setMessages(newMessages);
    setInput('');

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: input }] })
      });

      if (!response.ok) throw new Error('API error');
      const data: { reply: string } = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply
      }]);
    } catch (error) {
      console.log(error)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: "Sorry, I'm having trouble connecting. Please try again later."
      }]);
    }
    setIsLoading(false);
  };

  return (
    <div className='max-w-2xl mx-auto bg-white rounded-md shadow-lg'>
      {/* Header */}
      <div className="flex items-center justify-between bg-black text-white p-2 rounded-t-md">
        <div className="flex items-center space-x-2">
          <Image
            src='/ai.jpg'
            width={32}
            height={32}
            alt=''
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold">AI Assistant</p>
            <p className="text-xs text-gray-400">Active now</p>
          </div>
        </div>
        <button className="text-gray-400 hover:text-white">✖</button>
      </div>
      {/* Chat Messenger */}
      <div className="h-96 overflow-y-auto mb-4 space-y-4 p-4">
        {messages.map((msg: any, index: number) => (
          <div
            key={index}
            className={`text-black text-xs p-3 rounded-md ${msg.role === 'user'
              ? 'bg-blue-500 text-white ml-auto max-w-[80%]'
              : 'bg-gray-100 text-gray-800 mr-auto max-w-[80%]'
              }`}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="p-4 bg-gray-100 rounded-lg max-w-[80%]">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2 p-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about my experience..."
          disabled={isLoading}
          className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm text-black text-xs xs:text-[16px]"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Send
        </button>
      </form>
    </div>
  )
};

export default Messenger;