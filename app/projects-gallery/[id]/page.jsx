import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Cta from '@/components/Cta'
import {getProjectDetails} from '@/lib/apis'
import getAssetURL from '@/lib/get-asset-url'
import GalleryModal from '@/components/GalleryModal'

 

export default async function ProjectsGalleryDetails({ params }) {
  const project = await getProjectDetails(params.id)
  const mainImage = getAssetURL(project?.main_image) || '/images/no_image_available.jpg'

  console.log('Project-main-Image---->', mainImage)
  console.log('Project', project)
  return (
    <div className="pt-16 bg-black">
      <section className="relative h-[50vh] bg-cover bg-center flex items-end justify-center" style={{ backgroundImage: `url(${mainImage})` }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white text-center pb-16">
          <h1 className="text-4xl font-bold mb-4">{project?.title}</h1>
          <div className="text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/projects-gallery" className="hover:underline">Projects</Link>
            <span className="mx-2">/</span>
            <span>{project?.client_name}</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-bold mb-6">Project Details</h2>
            <p className="text-pr1 mb-6">{project?.desc}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2">Client :</h3>
                <p className="text-pr1">{project?.client_name}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Date :</h3>
                <p className="text-pr1">{new Date(project?.project_date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Duration :</h3>
                <p className="text-pr1">{project?.Duration}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Budget :</h3>
                <p className="text-pr1">{project?.Budget}</p>
              </div>
            </div>
          </div>
          <div>
            <Image
              src={mainImage}
              alt={`image-${project?.title}`}
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

        <h2 className="text-3xl font-bold mb-8 text-center">Project Gallery</h2>
        <GalleryModal project={project} />
      <Cta />
    </div>
  )
}