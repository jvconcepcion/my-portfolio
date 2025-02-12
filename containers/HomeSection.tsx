'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

import {
  Avatar,
  ChatPopUp,
  ParticlesContainer,
  ProjectsBtn,
} from '@components';

import { fadeIn } from '@utils/variants';

const IntroTextContainer = () => (
  <div className='w-full h-full bg-gradient-to-r from-black/10 via-black/20
      to-black/40'>
    <div className='text-center flex flex-col justify-center xl:pt-40 xl:text-left
        h-full container mx-auto'>
      <motion.label
        className='uppercase font-semibold text-xs xs:text-[16px] sm:text-[25px]'
        variants={fadeIn('down', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
      >
        Jonathan Concepcion
      </motion.label>
      <motion.h1
        className='h1 uppercase'
        variants={fadeIn('down', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
      >
        I'm a{' '}
        <TypeAnimation
          sequence={[
            'Developer',
            2000,
            'Designer',
            2000,
            'Gamer',
            2000,
          ]}
          speed={50}
          className='text-accent'
          wrapper='span'
          repeat={Infinity}
        />
      </motion.h1>
      <motion.p
        className='page-desc max-w-sm xl:max-w-xl mx-auto xl:mx-0 mb-10 xl:mb-16'
        variants={fadeIn('down', 0.3)}
        initial='hidden'
        animate='show'
        exit='hidden'
      >
        I'm a navigator of code and creativity, steering through the vast sea of possibilities. As a Developer, I craft interactive landscapes where technology and artistry converge, guiding users on delightful journeys.
      </motion.p>
      <div className='flex justify-center xl:hidden relative'>
        <ProjectsBtn />
      </div>
      <motion.div
        variants={fadeIn('down', 0.4)}
        initial='hidden'
        animate='show'
        exit='hidden'
        className='hidden xl:flex'
      >
        <ProjectsBtn />
      </motion.div>
    </div>
  </div>
);

const IntroImageContainer = () => (
  <div className='w-[1200px] h-full absolute right-0 bottom-0 bg-gradient-to-r from-primary/10
  to-black/10'>
    {/* background image */}
    <div className='bg-none xl:bg-explosion xl:bg-cover xl:bg-left xl:bg-no-repeat
        w-full h-full absolute mix-blend-color-dodge translate-z-0 opacity-40' />
    {/* particles */}
    <ParticlesContainer />
    {/* avatar img */}
    <motion.div
      className='w-full h-full max-w-[737px] max-h-[678px] absolute -bottom-32
          lg:bottom-0 lg:right-[8%]'
      variants={fadeIn('up', 0.5)}
      initial='hidden'
      animate='show'
      exit='hidden'
      transition={{ duration: 1, ease: 'easeInOut' }}
    >
      {/* <Avatar /> */}
    </motion.div>
  </div>
)

const HomeSection = () => {
  return (
    <>
      <IntroTextContainer />
      <IntroImageContainer />
      <ChatPopUp />
    </>
  )
}

export default HomeSection;
