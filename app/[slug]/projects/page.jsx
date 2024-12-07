import Image from 'next/image'
import Link from 'next/link'

import directus from '@/lib/directus'
import { readItems, readItem } from '@directus/sdk'
import { notFound } from 'next/navigation'
import Cta from '@/components/Cta'

async function getProject() {
  try {
    const pages = await directus.request(
      readItems('project', {
        fields: [
          'slug',
          'id',
          'title',
          'sort',
          'date_created',
          'main_image',
          'about_image',
          'desc',
          'block',
          'name',
          'related_projects.*.*',
          'service_related.*.*'
        ],
        sort: ['sort']
        // limit: 99
      }),
      {
        // next: { revalidate: 7 }
        cache: 'no-store'
      }
    )

    console.log(pages)
    return pages
  } catch (error) {
    notFound('Error fetching data Mr Hamza :', error)
  }
}

export default async function Service() {
  const pro = await getProject()
  // const listPro = await getListPro()
  console.log(pro)
  // console.log(listPro)
  return (
    <div className=' pt-[80px] wraperitem'>
      <section className='ma bg-gray-900 bg-content text-white'>
        <div className='max-w-[1280px] mx-auto px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16'>
          <div className=' w-full '>
            <h2 className='text-3xl font-bold sm:text-4xl '>OUR WORK</h2>

            <p className='mt-4 text-gray-300 '>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            </p>
          </div>

          {pro?.map((pro) => (
            <div
              key={pro?.id}
              className='mt-8   grid-cols-1 flex flex-wrap gap-8 md:mt-16 md:grid-cols-2 md:gap-12 lg:grid-cols-3'
            >
              <div className='flex items-start gap-4'>


                <div>
                  <Link
                    href={`/${pro?.service_related?.slug}/projects/${pro?.id}`}
                  >
                    <h2 className='text-lg font-bold'>
                      {pro?.service_related?.title}
                    </h2>
                    <p className='mt-1 text-sm line-clamp-3 text-gray-300'>
                      {pro?.service_related?.desc}
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Cta />
    </div>
  )
}
