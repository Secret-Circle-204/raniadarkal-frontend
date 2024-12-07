/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
// import { Button } from '@nextui-org/react'
import Image from 'next/image'

import getAssetURL from '@/lib/get-asset-url'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'
import NotFound from '@/app/not-found'
export const revalidate = 30

async function getData () {
  try {
    const pages = await directus.request(
      readItems('about_us', {
        // filter: {
        //   slug: { _eq: slug }
        // },
        fields: [
          'id',
          'content',
          'desc',
          'title',
          'about_image',
          'main_image',
          'subtitle',
          'image_2'
          //   'id',
          //   'blocks',
          //   'blocks.*.*',
          //   'item',
          //   'item.*.*'
        ]
        // limit: -1
      }),
      {
        // next: { revalidate: 5 }
        next: { revalidate: 5 }
      }
    )

    // console.log(pages)
    return pages
  } catch (error) {
    NotFound('Error fetching data Mr Hamza :', error)
  }
}

const abou = {
  id: 1,
  title: 'About us',
  subtitle: 'Perfection Concept Design',
  content:
    ' We are a company that specializes in designing and manufacturing high-quality furniture pieces for homes, offices, and commercial spaces. Our team of experienced and creative designers work tirelessly to create furniture pieces that not only look great but are also functional and comfortable. We pride ourselves on using the best materials and production techniques to ensure that our pieces last for years to come. Our mission is to provide our customers with exceptional service and quality products that enhance their living and working spaces.',

  main_image: '/images/bg-2.jpg',
  about_image: '/images/bg-1.jpg',
  image_2: '/images/bg-3.jpg'
}

export default async function aboutPage () {
  const page = await getData()
  console.log('abou-page', page)
  return (
    <div className=' pt-[80px]   wraperitem'>
      <section
        className=' jumbotron breadcumb relative  h-[60vh]  object-cover items-center bg-center object-center bg-cover w-full'
        style={{
          backgroundImage: `url(${abou?.main_image})`
        }}
      >
        <div className=' absolute bottom-4 left-0 right-0 items-center  text-center     '>
          <div className='  text-white max-w-[1200px] mx-auto px-16 mt-40 sm:mt-[200px] sm:items-center lg:px-5    flex flex-wrap sm:flex  justify-between  max-sm:justify-center text-center  text-2xl drop-shadow-lg  transition-shadow duration-300 font-semibold'>
            <div className='items-center  text-center    '>
              <h1 className='lg:text-left ml-[-25px] items-center first-letter:capitalize  text-center    '>
                {page?.title}
              </h1>
            </div>

            <div className=' text-sm font-light text-center items-center '>
              {' '}
              {/* <a className='link' href='/'>
                Home
              </a> */}
              <span className='dash'>/</span>
              <span className='first-letter:capitalize'>{page?.title}</span>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      <section className='sm:w-screen sm:mt-16 sm:bg-blue3  max-sm:bg-none   bg-content items-center'>
        <div className=' group sm:min-h-[500px]  sm:max-h-[900px] relative     sm:max-w-[1220px] sm:mx-auto   sm:text-white sm:rounded-3xl       '>
          <div className='grid grid-cols-1  m-6 lg:flex lg:flex-col justify-between  mx-auto lg:grid-cols-2'>
            <div className='sm:absolute top-0 left-0  max-sm:px-6  h-[100%]   sm:w-[50%]'>
              <Image
                alt='elia-youssef'
                src={getAssetURL(page?.about_image)}
                className='imgslickz   lg:max-h-[500px] sm:h-[100%] max-sm:h-[400px]  rounded-3xl   sm:rounded-3xl   transition-all duration-700 object-cover'
                loading='lazy'
                width={600}
                height={600}
              />
            </div>

            <div className='sm:absolute top-0 right-0  sm:h-[100%] min-h-[300px]   sm:w-[50%] '>
              <div className='p-7  sm:py-8  '>
                <h2 className='heading sm:text-3xl sm:text-white'>
                  {page?.subtitle}
                </h2>

                <p className='mt-4 '>{page?.content}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*  */}
      {/*  */}
      <div className='  group sm:pt-28  sm:min-w-[1200px]sm:max-w-[1220px] sm:mx-auto  '>
        <div className='    lg:px-[70px] px-2 sm:px-10   '>
          <div className=' grid grid-cols-1 rounded-lg sm:h-screen lg:h-screen  max-w-[1200px] mx-auto '>
            <div className='relative w-full max-sm:px-3 rounded-lg z-10  sm:py-36'>
              <Image
                alt='img'
                src={getAssetURL(page?.main_image)}
                className='lg:absolute   rounded-3xl max-sm:min-h-[400px]  transition duration-600 inset-0 h-full w-full object-cover'
                loading='lazy'
                width={600}
                height={600}
              />
            </div>

            <div className='relative flex items-left max-sm:px-4  '>
              <div className='py-8 sm:py-8  '>
                <h2 className='heading sm:text-3xl text-blue3'>
                  {page?.subtitle}
                </h2>

                <p className='mt-4 '>{page?.content}</p>

                {/* <Button
                  disableRipple
                  className="relative py-2 my-4 overflow-visible rounded-full hover:-translate-y-1 px-12 shadow-xl bg-background/30 after:content-[''] after:absolute after:rounded-full after:inset-0 after:bg-pr1 after:z-[-1] after:transition after:!duration-500 hover:after:scale-150 hover:after:opacity-0"
                >
                  <Link href='/contact'> Get in Touch</Link>
                </Button> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/*  */}

      <div className='py-[15px]' />
     </div>
  )
}
