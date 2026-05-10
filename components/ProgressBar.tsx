'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  duration: number; // Duration in seconds
}

const ProgressBar: React.FC<ProgressBarProps> = ({ duration }) => {
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + (100 / duration);
        if (newProgress >= 100) clearInterval(interval);
        return newProgress;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div className="z=[9999] fixed top-0 right-0 m-2 w-64 h-4 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        className="h-full bg-blue-500"
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: 'linear' }}
      />
    </div>
  );
};


export default ProgressBar;

