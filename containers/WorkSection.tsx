'use client';

import React from 'react';
import { Abstract, Circles, PipBoy, WorkSlider } from '@components';
import { motion } from 'framer-motion';
import { fadeIn } from '@utils/variants';

const WorkSection = () => {
  return (
    <>
      <Abstract />
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          <div className='text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0'>
            <motion.h2
              className='h2 xl:mt-12'
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
            >
              My <span className='text-accent'>Work</span>
            </motion.h2>
            <motion.p
              className='page-desc mb-4 max-w-[400px] mx-auto lg:max-0'
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
            >
              Explore my portfolio to see the innovative web applications and stunning designs I've crafted through my personal projects. Each project showcases my expertise in web development, design, and branding. <br/><br/>While I've collaborated with professionals and worked on confidential projects in my current employment, this portfolio highlights my individual skills and creativity. Dive in to see how I transform ideas into dynamic digital experiences.
            </motion.p>
          </div>
          <motion.div
            className='w-full xl:max-w-[65%]'
            variants={fadeIn('down', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
            <WorkSlider />
          </motion.div>
        </div>
      </div>
      <PipBoy />
      <Circles />
    </>
  )
};

export default WorkSection;