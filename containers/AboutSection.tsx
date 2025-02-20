'use client';

import { useState } from 'react'
import { Avatar, Abstract, IconCloud, TextCloud, StackList, ChatPopUp } from '@components';

import { motion } from 'framer-motion';
import { experienceOptions, educationOptions, fadeIn } from '@utils/variants';
import { TabNameProps } from '@interfaces';
import { aboutData } from '@utils';
import CountUp from 'react-countup';

const slugs: any = [
  'adobephotoshop',
  'html5',
  'bem',
  'css3',
  'sass',
  'tailwindcss',
  'framer',
  'vercel',
  'firebase',
  'flutter',
  'javascript',
  'typescript',
  'react',
  'nextdotjs',
  'nodedotjs',
  'postman',
  'express',
  'loopback',
  'nestjs',
  'mysql',
  'sqlite',
  'jira',
  'mongodb',
  'nginx',
];

const TabName = ({
  title,
  tabIndex,
  currentIndex,
  setIndex
}: TabNameProps) => (
  <div
    className={`${currentIndex === tabIndex && 'text-accent after:w-[100%] after:bg-accent after:transition-all after:duration-300'}
    cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0`}
    onClick={() => setIndex(tabIndex)}
  >
    {title}
  </div>
);

const TabInfo = ({ index }: { index: number }) => {
  const [iconMode, setIconMode] = useState<boolean>(true);
  const currentTab: string = aboutData[index].title.toLowerCase();
  const info = aboutData[index].info;
  const knowledges = currentTab === 'skills'
    ? info.map(({ knowledge }) => knowledge)[0]
      .map(({ value, iconID, count, color, url }: { [key: string]: string }) => iconMode ? { iconID, url } : { value, count, color, url})
    : []

  return (
    <div
      className='flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/60
    text-xs xs:text-base'
    >
      {currentTab !== 'skills' ? (
        <>
          <StackList
              data={[...info].reverse().map((res) => res)}
              options={currentTab === 'experience' ? experienceOptions : educationOptions}
            />
        </>
      ) : (
        <div className='flex flex-col items-center lg:items-start'>
          <div className='flex justify-center sm:justify-start items-center w-[70%] sm:w-[60%] mr-2 mt-[0.3rem] gap-4'>
            <input
              className='switch'
              type='checkbox'
              role='switch'
              id='flexSwitchCheckDefault'
              checked={iconMode}
              onChange={(e) => setIconMode(e.target.checked)}
            />
            <label
              className={`inline-block pl-[0.15rem] hover:cursor-pointer ${iconMode ? 'text-accent animate-pulse duration-75' : 'text-white'} font-semibold`}
              htmlFor='flexSwitchCheckDefault'
            >{iconMode ? 'Icon Mode' : 'Text Mode'}</label>
          </div>
          {iconMode ? <IconCloud data={knowledges} /> : <TextCloud data={knowledges} />}
        </div>
      )}
    </div>
  )
};

const AboutSection = () => {
  const [index, setIndex] = useState<number>(0);

  return (
    <>
      <Abstract />
      <ChatPopUp />
      <motion.div
        className='hidden xl:flex absolute bottom-0 -left-[10rem]'
        variants={fadeIn('right', 0.2)}
        initial='hidden'
        animate='show'
        exit='hidden'
      >
        <Avatar />
      </motion.div>
      <div className='container mx-auto flex flex-col items-center xl:flex-row gap-x-8'>
        <div className='flex flex-col justify-center'>
          <motion.h2
            className='h2'
            variants={fadeIn('right', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
            Innovative Engineer of <span className='text-accent animate-pulse duration-75'>Possibilities</span>
          </motion.h2>
          <motion.p
            className='page-desc max-w-[500px] mx-auto xl:mx-0 mb-6 xl:mb-12 px-2 xl:px-0'
            variants={fadeIn('right', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
             With an eye for aesthetics and a mind for logic, I blend creativity and technology to forge solutions that not only meet needs but exceed expectations. Let's innovate and transform the digital frontier.
          </motion.p>

          <motion.div
            className='hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0 mb-8'
            variants={fadeIn('right', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
            <div className='flex flex-1 xl:gap-x-6'>
              <div className='relative after:w-[1px] after:h-full after:bg-white/10
            after:absolute after:top-0 after:right-0'>
                <div className='text-2xl xl:text-4xl font-extrabold text-accent mb-2'>
                  <CountUp start={0} end={10} duration={5} /> +
                </div>
                <div className='text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px]'>
                  Years of experience
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className='flex flex-col w-full xl:max-w-[48%] sm:h-[480px] mb-10 xs:mb-0 '
          variants={fadeIn('left', 0.4)}
          initial='hidden'
          animate='show'
          exit='hidden'
        >
          <div className='flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4'>
            {aboutData.map(({ title }: { title: string }, i: number) => <TabName
              key={i}
              title={title}
              tabIndex={i}
              currentIndex={index}
              setIndex={() => setIndex(i)}
            />)}
          </div>
          <div className='py-2 flex flex-col gap-y-2 xl:gap-y-4 items-center xl:items-start w-full'>
            <TabInfo index={index} />
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default AboutSection;