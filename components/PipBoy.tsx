'use client';

import Image from 'next/image';
import { storageUrl } from '@/lib/storage';

const PipBoy = () => {
  return (
    <div 
      className='absolute -left-10 bottom-10 rotate-45 mix-blend-color-dodge animate-pulse
      duration-75 z-20 w-[200px] xl:w-[350px]'
    >
      <Image
        src={storageUrl('ui/pip-boy.png')}
        width={350}
        height={200}
        className='w-full h-full'
        alt=''
      />
    </div>
  );
};

export default PipBoy;
