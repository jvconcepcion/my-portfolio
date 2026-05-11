'use client';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { storageUrl } from '@/lib/storage';
import { ProjectRow } from '@lib/settings';
import { BsArrowRight } from 'react-icons/bs';
import { VscGithub } from "react-icons/vsc";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Spinner } from '@chakra-ui/react';

const LazyImage = dynamic(() => import('./DynamicImage'), {
  loading: () => <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />,
  ssr: false,
});

function chunkArray<T>(arr: T[], size: number): T[][] {
  return Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, i * size + size)
  );
}

const WorkSlider = () => {
  const [slides, setSlides] = useState<ProjectRow[][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/data/projects')
      .then(res => res.json())
      .then(data => {
        setSlides(chunkArray(data.projects ?? [], 4));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className='h-[280px] sm:h-[480px] flex items-center justify-center'>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
    </div>
  );

  return (
    <Swiper
      spaceBetween={10}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className='h-[280px] sm:h-[480px]'
    >
      {slides.map((images, i) => (
        <SwiperSlide key={i}>
          <div
            className={`grid items-center ${images.length === 1
              ? 'grid-cols-1'
              : images.length === 2
                ? 'gap-4 grid-cols-2 grid-rows-1'
                : 'gap-4 grid-cols-2 grid-rows-2'
              }`}
          >
            {images.map((project, imageIndex) => (
              <div
                key={imageIndex}
                className={`relative rounded-lg overflow-hidden flex items-center justify-center group ${images.length === 1 ? 'col-span-2 row-span-2 w-full h-full' : ''}`}
              >
                <div className="flex items-center justify-center relative overflow-hidden w-full h-full">
                  <LazyImage
                    src={storageUrl(project.image_path)}
                    alt={project.title}
                    width={images.length === 1 ? 1920 : 500}
                    height={images.length === 1 ? 1080 : 300}
                    className={`transition-all duration-300 ${images.length === 1 ? 'w-full h-full object-cover' : ''}`}
                  />
                  {project.git_link && (
                    <div className='absolute top-1 right-1 md:top-4 md:right-4 z-10 md:opacity-0 scale-95 md:group-hover:opacity-100 md:group-hover:scale-100 transition-all duration-300 ease-in-out'>
                      <div className='bg-white/70 rounded-full'>
                        <Link href={project.git_link} target="_blank" passHref rel="noopener noreferrer">
                          <VscGithub className="w-[1.6em] h-[1.6em] md:w-[2.2em] md:h-[2.2em] cursor-pointer text-[#131424]" />
                        </Link>
                      </div>
                    </div>
                  )}
                  <div className='absolute inset-0 bg-gradient-to-r from-transparent via-[#e838cc] to-[#4a22bd] opacity-0 group-hover:opacity-80 transition-all duration-700' />
                  <div className='absolute bottom-0 translate-y-full group-hover:-translate-y-10 group-hover:xl:-translate-y-20 transition-all duration-300'>
                    <div className='flex items-center gap-x-2 text-xs xs:text-[10px] sm:text-[13px] tracking-[0.2em]'>
                      <div className='delay-100 hidden md:block'>{project.title}</div>
                      <div className='delay-100'>
                        <Link href={project.site_link} target="_blank" passHref rel="noopener noreferrer">
                          <BsArrowRight className='cursor-pointer w-6 h-6' />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default WorkSlider;
