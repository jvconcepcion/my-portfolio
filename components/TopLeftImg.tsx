import Image from 'next/image';
import { storageUrl } from '@/lib/storage';

const TopLeftImg = () => {
  return (
    <div className='absolute -left-[7rem] -top-[7rem]  mix-blend-color-dodge z-10 w-[200px] xl:w-[400px] opacity-50 animate-spin-reverse'>
      <Image src={storageUrl('ui/rotating-dragon.png')} width={400} height={400} alt='' />     
    </div>
  );
};

export default TopLeftImg;
