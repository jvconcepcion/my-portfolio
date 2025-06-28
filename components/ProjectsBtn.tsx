'use client';

import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react';

const ProjectsBtn: React.FC = () => {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/work');
  };

  const handleDownload = () => {
    const cvPath = 'https://drive.google.com/uc?export=download&id=1Z3gUwQKL9wv-xopPWxZclGxN9hcSn3DY';
    const link = document.createElement('a');
    link.href = cvPath;
    link.download = 'Jonathan-Concepcion-CV.pdf';
    link.click();
  };


  return (
    <div className='mx-auto xl:mx-0'>
      <div className='text-sm flex justify-around'>
        <button 
          className='px-6 py-3 rounded-full mr-4 bg-gradient-to-br from-blue-900 via-blue-600 to-blue-300 hover:bg-slate-200 text-white z-50'
          onClick={handleClick}
          >
            Check Projects
          </button>
        <button 
          onClick={handleDownload}
          className='px-1 py-1 rounded-full bg-gradient-to-br from-blue-900 via-blue-600 to-blue-300 hover:bg-slate-800 text-white z-50 border-0'>
          <span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2'>
            Download CV
          </span>
         </button>
      </div>
    </div>
  );
};

export default ProjectsBtn;
