import Image from 'next/image';
import clsx from 'clsx';

const DynamicImage = ({ className, src, width, height, alt }: { className: string, src: string; width: number; height: number; alt: string }) => {
  return <Image className={clsx(className)} src={src} width={width} height={height} alt={alt} />;
};

export default DynamicImage;