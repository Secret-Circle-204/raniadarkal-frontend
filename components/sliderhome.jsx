'use client'


import React, { useState, useEffect, useRef } from 'react'
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow, Controller, EffectFade } from 'swiper/modules';

import getAssetURL from '@/lib/get-asset-url'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Image from 'next/image';

const mokuSlideImages = [
  {
    id: 1,
    src: '/images/bg-1.jpg',
  },
  {
    id: 2,
    src: '/images/bg-2.jpg',
  },
  {
    id: 3,
    src: '/images/bg-3.jpg',
  },
  {
    id: 4,
    src: '/images/bg-4.jpg',
  }
]
export default function SliderHome({ tagline, headline }) {
  // console.log('homedata', slideImg)
  // console.log('homedata', homedata.images)
  const slideImg = mokuSlideImages
  console.log('SlideImg', slideImg)
  return (
    <Swiper
      className='w-screen mx-auto pt-16  max-sm:h-[80vh]  h-[80vh] slider-wrapper'
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow, EffectFade, Controller]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      autoplay={{
        // pauseOnMouseEnter: true,
        delay: 4000,
        disableOnInteraction: true,
      }}
     effect="fade"
     fadeEffect={{
       crossFade: true
      
     }}
      // coverflowEffect={{
      //   rotate: 300,
      //   stretch: 50,
      //   depth: 500,
      //   modifier: 2.5,
      //   slideShadows: true,
      // }}
      controller={{ control: 'swiper' }}
    >
      {slideImg?.map((item, index) => (
      <SwiperSlide
      key={item?.id}
        // index={index}
        className='  bg-center w-full mx-auto h-full slider-content'
        // style={{
        //   backgroundImage: `url('${item.src}')`
        // }}
        style={{
          // backgroundImage: `url('${item?.src}')`,
          // backgroundImage: `url('${getAssetURL(item?.directus_files_id)}')`,
        }}
      >
          <Image
            src={item?.src}
            alt='image'
            width={1000}
            height={1000}
            priority
            className='w-screen no-repeat relative bg-no-repeat bg-cover h-full object-cover'
          />



        {/* <div className=' absolute  top-[50%] left-[10%] mx-10  text-left  text-white  w-[90%]  inner  '>
          <h1>{tagline}</h1>
          <p>{headline}</p>
          <button>
            <span className='shine'></span>
            <span>Read More</span>
          </button>
        </div> */}
      </SwiperSlide>
        ))}
    </Swiper>
  )
}
