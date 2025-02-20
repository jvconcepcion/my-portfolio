'use client';

import Link from 'next/link';
import { TextCloudDataProps, CustomTextRendererProps } from '@interfaces';
import { TagCloud } from 'react-tagcloud';

const CustomRenderer: React.FC<CustomTextRendererProps> = ({ value = 'BEM', color, url = '/' }) => (
  <Link key={value} href={url} target="_blank" passHref rel="noopener noreferrer">
    <span
      className="inline-block border-2 m-1 p-1 text-white animate-blink cursor-pointer"
      style={{
        animationDelay: `${Math.random() * 2}s`,
        borderColor: color,
      }}
    >
      {value}
    </span>
  </Link>
);

const TextCloud = ({ data = [{ value: 'React', count: 30 }] }: TextCloudDataProps) => {

  return (
    <div className='text-sphere mt-5'>
      <TagCloud
        minSize={1}
        maxSize={5}
        tags={data}
        renderer={CustomRenderer}
      />
    </div>
  )
};

export default TextCloud;