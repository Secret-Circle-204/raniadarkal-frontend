import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Cta from '@/components/Cta'
import Tagse from '@/components/Tagse'
import directus from '@/lib/directus'
import { readItems, readItem } from '@directus/sdk'
import getAssetURL from '@/lib/get-asset-url'

async function getList() {
  try {
    const list = await directus.request(
      readItems('services', {
        fields: ['slug', 'id', 'title', 'sort', 'date_created'],
        sort: ['sort']
      }),
      {
        next: { revalidate: 60 }
      }
    )
    return list
  } catch (error) {
    console.error('Error fetching service list:', error)
    return []
  }
}

async function getService(slug) {
  try {
    const serv = await directus.request(
      readItem('services', slug, {
        fields: [
          // '*',
          'slug',
          'id',
          'title',
          'sort',
          'date_created',
          'publish_date',
          'desc',
          'block',
          'name',
          'main_image',
        {
          related_projects: ['*']
        }
        ]
      })
    )
    return serv
  } catch (error) {
    console.error('Error fetching service:', error)
    notFound()
  }
}

export default async function DynamicPage({ params }) {
  const serv = await getService(params.slug)
  const list = await getList()

  if (!serv) {
    notFound()
  }

  return (
    <div className="pt-20 ">
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-end justify-center"
        style={{
          backgroundImage: `url(${getAssetURL(serv?.main_image)})`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white text-center pb-16 px-4">
          <h1 className="text-4xl font-bold mb-4 capitalize">{serv?.title}</h1>
          <div className="text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>{serv?.title}</span>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-2/3 px-4 mb-8 lg:mb-0">
            <div className="bg-black_more rounded-lg shadow-lg p-6">
              <h2 className="text-3xl font-bold mb-4">{serv?.title}</h2>
              <div className="prose max-w-none">
                <p>{serv?.desc}</p>
                <blockquote className="border-l-4 border-pr4  pl-4 italic my-4">
                  {serv?.block}
                </blockquote>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 px-4">
            <div className="bg-black_more rounded-lg shadow-lg p-6">
              <h3 className="text-2xl font-bold mb-4">Projects Served</h3>
              <p className="mb-6 text-pr4">The Sample Projects We Have Done.</p>
              <div className="space-y-4">
                {serv?.related_projects?.map((project) => (
                  <Tagse key={project?.id} tag={project} />
                ))}
              </div>
              <h3 className="text-2xl font-bold mt-8 mb-4">Other Services</h3>
              <ul className="space-y-2">
                {list.map((item) => (
                  <li key={item?.slug} className="bg-pr4 hover:bg-black  rounded transition-colors duration-200">
                    <Link href={`/${item?.slug}`} className="block px-4 py-2">
                      {item?.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <Cta />
    </div>
  )
}