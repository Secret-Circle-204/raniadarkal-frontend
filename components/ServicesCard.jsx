'use client'
import React, { useState, useEffect } from 'react'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'
import getAssetURL from '@/lib/get-asset-url'
// import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
// import { useRouter } from 'next/navigation'

// const data = [
//   {
//     slug: 'service-1',
//     title: 'Service 1',
//     desc: 'desc 1',
//     date_published: '2022-01-01',
//     main_image: '/img/bg-1.jpg'
//   },
//   {
//     slug: 'service-2',
//     title: 'Service 2',
//     desc: 'desc 2',
//     date_published: '2022-01-01',
//     main_image: '/img/bg-2.jpg'
//   },
//   {
//     slug: 'service-3',
//     title: 'Service 3',
//     desc: 'desc 3',
//     date_published: '2022-01-01',
//     main_image: '/img/bg-3.jpg'
//   }
// ]
export default function ServicesCard() {
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const fetchedServices = await directus.request(
        readItems('services', {
          fields: ['slug', 'title', 'desc', 'date_published', 'main_image']
        }),
        {
          next: { revalidate: 7 }
        }
      )
      setData(fetchedServices)
    } catch (error) {
      console.error('Error fetching data:', error)
      // Handle errors as needed
    }
  }

  useEffect(() => {
    getData()
  }, [])

  console.log('servicesCard_data', data)
  return (
    <section className='container    px-5 mx-auto py-24    '>
       <h3 className='text-center text-pr1 text-xl font-semibold mb-10'>Our Services</h3>
      <div className=' grid grid-cols-1 lg:grid-cols-3  '>
        {data?.map(item => (
          <div key={item?.slug} className=' gap-4  p-2'>
            <div className='  rounded-2xl hover:translate-y-[-3%] transition-transform duration-500 hover:scale-[0.98]'>
              <div className=' relative w-full rounded-2xl bg-pr3/30 backdrop-blur-2xl '>
                <Image
                  src={getAssetURL(item?.main_image)}
                  alt='bg-features'
                  loading='lazy'
                  width={600}
                  height={600}
                  className='img-fluid rounded-2xl object-cover w-full bg-cover object-center  h-[350px] lg:h-[290px] opacity-95 '
                />
              <div className='absolute w-full bottom-0 rounded-2xl bg-pr3/30 backdrop-blur-2xl '>
                <div className='py-2 px-3 bg-pr4/90  w-full'>
                <Link className='rounded-2xl' href={`/${item?.slug}`}>
                  <button className='link flex justify-between space-x-2    text-white py-1 px-3 text-right w-[100%] rounded-2xl '>
 <h1
  className='uppercase text-white   shadow-slate-700  text-base font-bold'
 > {item?.title}</h1>                  
                    <span className=' rounded-2xl bg-black_more py-1 px-2   text-white'>View More</span>
                  </button>
                </Link>
                  </div>
          
              </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
