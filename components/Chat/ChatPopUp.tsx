'use client';

import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { HiChatAlt2 } from 'react-icons/hi';
import {
  Tooltip,
  Messenger
} from '@components';

const ChatPopUp: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const mainButton = {
    open: { rotate: 90 },
    closed: { rotate: 0 },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem("chat_is_open");
      setIsOpen(storedValue ? JSON.parse(storedValue) : false);
    }
  }, []);

  const toggleChat = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("chat_is_open", JSON.stringify(newState));
      }
      return newState;
    });
  };

  return (
    <motion.div
      className={`fixed bottom-[7rem] right-8 sm:right-8 flex flex-col-reverse z-[100] ${!isOpen && 'transition-all duration-75 animate-pulse'}`}
    >
      <div className="relative group">
        {/* Tooltip for AI Assistant */}
        {!isOpen && (
          <Tooltip
            name="AI Assistant"
            positionClass="pr-20 right-0 xl:group-hover:flex bottom-[1.3rem]"
          />
        )}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute bottom-[3rem] right-0 mb-2 w-[320px] max-w-xs origin-bottom"
              style={{ transformOrigin: "bottom" }}>
              <Messenger />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Button */}
        <motion.button
          className="fixed bottom-[6rem] right-5 lg:right-10 z-[100] rounded-full p-4 text-4xl group hover:text-accent"
          onClick={toggleChat}
          variants={mainButton}
          initial="closed"
          animate={isOpen ? 'open' : 'closed'}
          aria-label="Toggle chat popup"
        >
          {isOpen ? <FiX /> : <HiChatAlt2 />}
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ChatPopUp;
