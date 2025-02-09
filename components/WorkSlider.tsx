'use client';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { workData } from '@utils';
import { WorkDataProps } from '@interfaces';
import { BsArrowRight } from 'react-icons/bs'
import Image from 'next/image';
import Link from 'next/link';

const WorkSlider = () => {
  type SlideProps = WorkDataProps["slides"][0];
  type ImageProps = SlideProps["images"][0];

  return (
    <div
      className='h-[280px] sm:h-[480px]'
    >
      {workData.slides.map((item: SlideProps, i: number) => (
        <div key={i}>
          <div
            className='grid grid-cols-2 grid-rows-2 gap-4'
          >
            {item.images.map((image: ImageProps, imageIndex: number) => (
              <div
                key={imageIndex}
                className='relative rounded-lg overflow-hidden flex items-center justify-center group'
              >
                <div className='flex items-center justify-center relative overflow-hidden'>
                  <Image
                    src={image.path}
                    width={500}
                    height={300}
                    alt=''
                  />
                  <div className='absolute inset-0 bg-gradient-to-l from-transparent via-[#e838cc] to-[#4a22bd]
                  opacity-0 group-hover:opacity-70 transition-all duration-700' />
                  <div
                    className='absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20
                    transition-all duration-300'
                  >
                    <div className='flex items-center gap-x-2 text-xs xs:text-[10px] sm:text-[13px] tracking-[0.2em]'>
                      <div className='delay-100'>{image.title}</div>
                      <div className='delay-100'>
                        <Link href={image.link} target="_blank" passHref rel="noopener noreferrer">
                          <BsArrowRight className='cursor-pointer'/>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default WorkSlider;
