'use client';

import React from 'react';
import { Abstract, Circles, PipBoy, ServiceSlider } from '@components';
import { motion } from 'framer-motion';
import { fadeIn } from '@utils/variants';

const ServicesSection = () => {
  return (
    <>
      <Abstract />
      <div className='container mx-auto'>
        <div className='flex flex-col xl:flex-row gap-x-8'>
          <div className='text-center flex xl:w-[30vw] flex-col lg:text-left mb-4 xl:mb-0'>
            <motion.h2
              className='h2 xl:mt-8'
              variants={fadeIn('up', 0.2)}
              initial='hidden'
              animate='show'
              exit='hidden'
            >
              My <span className='text-accent'>Service.</span>
            </motion.h2>
            <motion.p
              className='page-desc mb-4 max-w-[400px] mx-auto lg:max-0'
              variants={fadeIn('up', 0.4)}
              initial='hidden'
              animate='show'
              exit='hidden'
            >
              Unlock your digital potential! I build responsive, high-performance web applications with React, Next JS, and Node.js. Stunning designs? I've got you covered with Photoshop and Figma. Plus, I offer complete branding services to make your business unforgettable. Let's create something amazing together!
            </motion.p>
          </div>
          <motion.div
            className='w-full xl:max-w-[70%]'
            variants={fadeIn('down', 0.6)}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
            <ServiceSlider />
          </motion.div>
        </div>
      </div>
      <PipBoy />
      <Circles />
    </>
  )
};

export default ServicesSection;