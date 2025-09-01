'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

const ProjectsBtn = () => {
  const [cvUrl, setCvUrl] = useState<string>('');

  useEffect(() => {
    const fetchCV = async () => {
      const res = await fetch('/api/data/cv');
      const data = await res.json();
      setCvUrl(data.cv);
    };
    fetchCV();
  }, []);

  return (
    <div className='mx-auto xl:mx-0'>
      <div className='text-sm flex justify-around'>
        <Link
          href={'/work'}
          className='px-6 py-3 rounded-full mr-4 bg-gradient-to-br from-blue-900 via-blue-600 to-blue-300 hover:bg-slate-200 text-white z-50'
        >
          Check Projects
        </Link>
        <Link 
          href={cvUrl || '#'}
          className='px-1 py-1 rounded-full bg-gradient-to-br from-blue-900 via-blue-600 to-blue-300 hover:bg-slate-800 text-white z-50 border-0'
          target='_blank'
          rel='noopener noreferrer'
        >
          <span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2'>
            Download CV
          </span>
        </Link>
      </div>
    </div>
  );
};

export default ProjectsBtn;
