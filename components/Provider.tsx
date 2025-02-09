'use client'

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Transition from './Transition';
import FrozenRouter from './FrozenRouter';


const Provider = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();

  return (
    <AnimatePresence
      initial
      mode='wait'
    >
      <motion.div
        key={pathName}
        className='h-full'
      >
        <Transition />
        <FrozenRouter>{children}</FrozenRouter>
      </motion.div>
    </AnimatePresence>
  )
}

export default Provider