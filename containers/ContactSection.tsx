'use client';

import { ChangeEvent, FormEvent, useState } from 'react';
import { Abstract } from '@components';
import { BsArrowRight } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { fadeIn } from '@utils/variants';
import { ContactDataProps } from '@interfaces';

type Props = {};

const ContactSection = (props: Props) => {
  const [emailData, setEmailData] = useState<ContactDataProps>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/mail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailData),
      });

      const data = await response.json();
      console.log(data)

      if (data.success) {
        console.log('Email sent successfully!');
      } else {
        console.error('Error sending email:', data.error);
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <>
      <Abstract />
      <div className='container mx-auto py-32 text-center xl:text-left flex
      items-center justify-center h-full'>
        <div className='flex flex-col w-full max-w-[700px]'>
          <motion.h2
            className='h2 text-center mb-12'
            variants={fadeIn('up', 0.2)}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
            Get in <span className='text-accent animate-pulse duration-75'>touch</span>
          </motion.h2>
          <motion.form
            className='flex-1 flex flex-col gap-6 w-full mx-auto'
            onSubmit={handleSubmit}
            variants={fadeIn('up', 0.4)}
            initial='hidden'
            animate='show'
            exit='hidden'
          >
            <div className='flex gap-x-6 w-full'>
              <input
                type='text'
                placeholder='Full Name'
                className='input'
                value={emailData.name}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailData({ ...emailData, name: e.target.value })}
              />
              <input
                type='text'
                placeholder='Email'
                className='input'
                value={emailData.email}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailData({ ...emailData, email: e.target.value })}
              />
            </div>
            <input
              type='text'
              placeholder='Subject'
              className='input'
              value={emailData.subject}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setEmailData({ ...emailData, subject: e.target.value })}
            />
            <textarea
              placeholder='message'
              className='textarea'
              value={emailData.message}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEmailData({ ...emailData, message: e.target.value })}
            />
            <button className='btn rounded-full border border-white/50 max-w-[170px] px-8
            transition-all duration-300 flex items-center justify-center overflow-hidden
            hover:border-accent group'>
              <span className='group-hover:-translate-y-[120%] group-hover:opacity-0 transition-all duration-500'>
                Send
              </span>
              <BsArrowRight className='-translate-y-[120%] opacity-0 group-hover:flex group-hover:-translate-y-0
              group-hover:opacity-100 transition-all duration-300 absolute text-[22px]' />
            </button>
          </motion.form>
        </div>
      </div>
    </>
  )
};

export default ContactSection;