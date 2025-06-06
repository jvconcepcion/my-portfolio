'use client';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

import { defaultBreakpoints, serviceData } from '@utils';
import { ServicesDataProps } from '@interfaces';
import { RxArrowTopRight } from 'react-icons/rx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Pagination } from 'swiper/modules';

const ServiceSlider = () => {
  return (
    <Swiper
      breakpoints={defaultBreakpoints}
      freeMode={true}
      pagination={{
        clickable: true,
      }}
      modules={[FreeMode, Pagination]}
      className='h-[240px] sm:h-[340px]'
    >
      {serviceData.map((item: ServicesDataProps, i: number) => (
        <SwiperSlide key={i}>
          <div
            className='bg-[rgba(65,47,123,0.15)] rounded-lg p-4 flex sm:flex-col
            gap-x-6 sm:gap-x-0 group cursor-pointer hover:bg-[rgba(89,65,169,0.15)] transition-all duration-300 h-[160px] lg:h-[316px]'
          >
            <div className='text-2xl text-accent mb-4'>{item.icon}</div>
            <div className='mb-4'>
              <div className='mb-2 text-lg'>{item.title}</div>
              <p className='max-w-[350px] leading-normal text-xs lg:text-base'>{item.description}</p>
            </div>
            {/* <div className='text-3xl'>
              <RxArrowTopRight className='group-hover:rotate-45 group-hover:text-accent transition-all duration-300' />
            </div> */}
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ServiceSlider;
