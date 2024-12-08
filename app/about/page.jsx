import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'
import getAssetURL from '@/lib/get-asset-url'

export const revalidate = 30

async function getData() {
  try {
    const response = await directus.request(
      readItems('about_us', {
        fields: [
          'id',
          'title',
          'subtitle',
          'content',
          'about_image',
          'main_image',
          'about_image_2'
        ]
      }),
      {
        next: { revalidate: 5 }
      }
    )
    return response
  } catch (error) {
    console.error('Error fetching data:', error)
    return null
  }
}

export default async function AboutPage() {
  const page = await getData()

  if (!page) {
    notFound()
  }

  return (
    <div className=" text-white min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-[60vh] bg-cover bg-center flex items-end justify-center"
        style={{
          backgroundImage: `url(${getAssetURL(page?.main_image)})`
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-center pb-16 px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{page?.title}</h1>
          <div className="text-sm">
            <Link href="/" className="hover:text-gray-300 transition duration-300">Home</Link>
            <span className="mx-2">/</span>
            <span>{page?.title}</span>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src={getAssetURL(page?.about_image)}
                alt="About Us"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-100">{page?.subtitle}</h2>
              <div className="prose prose-lg prose-invert">
                <p>{page?.content}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-width Image Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-6xl px-4 md:px-0">
          <div className="relative h-[300px] md:h-[500px]">
            <Image
              src={getAssetURL(page?.main_image)}
              alt="Full-width Image"
              layout="fill"
              objectFit="cover"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="py-16 px-4 md:px-0">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-100">Our Mission</h2>
              <div className="prose prose-lg prose-invert">
                <p>
                  At our core, we strive to deliver exceptional value to our clients through innovative solutions and unwavering commitment to quality. Our mission is to empower businesses and individuals with cutting-edge technology and creative designs that make a lasting impact.
                </p>
              </div>
            </div>
            <div className="relative h-[400px] md:h-[500px]">
              <Image
                src={getAssetURL(page?.about_image_2)}
                alt="Our Mission"
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}