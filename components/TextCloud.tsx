'use client';

import { IconTextCloudDataProps } from '@interfaces';
import { useEffect } from 'react';
import TagCloud, { TagCloudOptions } from 'TagCloud';

const TextCloud = ({ data = ['React', 'Next.JS', 'Node.JS'] }: IconTextCloudDataProps) => {
  useEffect(() => {
    return () => {
      const container: any = ".tagcloud-container";

      const options: TagCloudOptions = {
        radius: 150,
        maxSpeed: "normal",
        initSpeed: "normal",
        keep: true,
      };

      TagCloud(container, data, options);
    };
  }, []);
  return (
    <div className='text-sphere'>
      {/* span tag className must be "tagcloud"  */}
      <span className='tagcloud-container'></span>
    </div>
  )
};

export default TextCloud;