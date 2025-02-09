const InteractiveLoader  = ({
  background,
  imgUrl,
}: {
  background: string;
  imgUrl: string;
}) => {
  return (
    <div className='relative h-full'>
      <div
        className='absolute inset-0 z-0'
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          mixBlendMode: 'color-dodge',
        }}
      />
      <div
        style={{ background }}
        className='absolute inset-0 animate-pulse z-10'
      />
      <span
        className='font-black absolute inset-0 z-20 text-center bg-clip-text text-transparent pointer-events-none'
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          mixBlendMode: 'plus-lighter',
          fontSize: 'clamp(3rem, 8vw, 10rem)',
          lineHeight: '50vh',
        }}
      >
        Loading...
      </span>
    </div>
  );
};

export default InteractiveLoader