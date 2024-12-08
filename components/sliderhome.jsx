'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';
import Image from 'next/image';
import getAssetURL from '@/lib/get-asset-url';

const SliderHome = ({ tagline, headline, slideImg }) => {
  const [visible, setVisible] = useState(true);

  return (
    <Swiper
      className="w-screen mx-auto pt-16 max-sm:h-[80vh] h-[95vh] slider-wrapper"
      modules={[Navigation, Pagination, Autoplay, EffectFade]}
      spaceBetween={50}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      onSlideChange={() => setVisible(false)}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      effect="fade"
      fadeEffect={{
        crossFade: true,
      }}
      onTransitionEnd={() => setVisible(true)}
    >
      {slideImg.map((item) => (
        <SwiperSlide key={item.id} className="bg-center w-full mx-auto h-full slider-content">
          <Image
            src={getAssetURL(item.directus_files_id)}
            alt="image"
            width={1000}
            height={1000}
            priority
            className="w-screen no-repeat relative bg-no-repeat bg-cover h-full object-cover"
          />
          <div className={`absolute top-[75%] left-[10%] mx-10 text-left text-white w-[90%] inner transition-opacity duration-700 ${visible ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-4xl font-bold">{tagline}</h1>
            <p className="text-2xl">{headline}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SliderHome;