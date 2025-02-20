import Image from 'next/image';

const DynamicImage = ({ src, width, height, alt }: { src: string; width: number; height: number; alt: string }) => {
  return <Image src={src} width={width} height={height} alt={alt} />;
};

export default DynamicImage;