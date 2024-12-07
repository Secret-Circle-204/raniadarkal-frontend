'use client'

import React, { useState, useEffect } from 'react'
 
import getAssetURL from '@/lib/get-asset-url'
import { Swiper, SwiperSlide } from 'swiper/react'
import { getTeamPageData, getTeamData } from '@/lib/apis'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
import Image from 'next/image'
import Link from 'next/link'

export default function TeamCarousel() {
  const [teamData, setTeamData] = useState([])
  const [teamPageData, setTeamPageData] = useState({})

  useEffect(() => {
    async function getTeam() {
      const data = await getTeamData()
      const pageData = await getTeamPageData()
      setTeamData(data)
      setTeamPageData(pageData)
    }
    getTeam()
  }, [])
  console.log('teamData', teamData)
  console.log('teamPageData', teamPageData)
  return (
    <>
      <div className='py-5 md:py-10 max-w-[1350px] mx-auto'>
        <div className='font-semibold text-base '>{teamPageData?.title}</div>

        <div
          className='text-sm font-light text-left items-center max-sm:justify-center drop-shadow-lg transition-shadow duration-300'
          dangerouslySetInnerHTML={{
            __html: teamPageData?.description
          }}
        />
      </div>

      <div className='container group mx-auto text-white'>
        <Swiper
          slidesPerView={3}
          spaceBetween={30}
          pagination={{ clickable: true }}
          navigation={true}
          modules={[Pagination, Navigation]}
          className='mySwiper'
        >
          {teamData.map(teamMember => (
            <SwiperSlide key={teamMember?.id}>
              <div className='h-full  group rounded-3xl'>
                <Image
                  src={getAssetURL(teamMember?.image)}
                  className=' object-cover bg-cover h-[290px] lg:h-[310px] rounded-3xl'
                  alt={teamMember?.name}
                  width={500}
                  height={700}
                />
              </div>
               
                <Link href={`/team`}
                className='group mb-16 desc icon flex flex-col space-y-2'>
                <span className='text-left uppercase p-0 mt-12 text-xl font-semibold'>
                  {teamMember?.name}
                </span>
                <span className='text-left p-0 mt-14 mb-2'>
                  {teamMember?.job_title}
                </span>
                <span className='text-left line-clamp-4 /-/group-hover:line-clamp-none p-0 my-16 max-h-[180px] overflow-y-hidden'>
                  {teamMember?.description}
                </span>
                </Link>
               
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  )
}

