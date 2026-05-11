'use client';

import Image from 'next/image';
import { storageUrl } from '@/lib/storage';

const Avatar = () => {
  return (
    <div className='hidden xl:flex xl:max-w-none opacity-60'>
      <Image
        src={storageUrl('ui/vault-boy.png')}
        width={737}
        height={678}
        alt=''
        className='translate-z-0 w-[75%]' 
      />
    </div>
  );
};

export default Avatar;
