import Image from 'next/image';

const Abstract = () => {
  return (
    <div className='w-[200px] xl:w-[350px] absolute -right-0 -bottom-0 mix-blend-color-dodge
    animate-pulse duration-75 z-5 scale-x-[-1]'>
      <Image
        className='w-full h-full'
        src={'/abstract.png'}
        width={260}
        height={200}
        alt=''
      />
    </div>
  );
};

export default Abstract;
