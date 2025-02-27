'use client';

import { motion } from 'framer-motion';

const variants = {
  initial: {
    x: '100%',
    width: '100%',
  },
  animate: {
    x: '0%',
    width: '0%',
  },
  exit: {
    x: ['0%', '100%'],
    width: ['0%', '100%'],
  },
}

const Transition = () => {
  return (
    <>
      <motion.div
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-primary/60'
        variants={variants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}
      >

      </motion.div>
      <motion.div
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-20 bg-primary/40'
        variants={variants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.4, duration: 0.6, ease: 'easeInOut' }}
      >

      </motion.div>
      <motion.div
        className='fixed top-0 bottom-0 right-full w-screen h-screen z-10 bg-primary/20'
        variants={variants}
        initial='initial'
        animate='animate'
        exit='exit'
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeInOut' }}
      >

      </motion.div>
    </>
  );
};

export default Transition;
