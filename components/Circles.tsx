import Image from 'next/image';
import { storageUrl } from '@/lib/storage';

const Circles = () => {
  return (
    <div className='w-[200px] xl:w-[300px] absolute -left-[5rem] -bottom-[8rem] mix-blend-color-dodge
    animate-pulse duration-75 z-5 rotate-90'>
      <Image
        className='w-full h-full'
        src={storageUrl('ui/circles.png')}
        width={260}
        height={200}
        alt=''
      />
    </div>
  );
};

export default Circles;
