import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Cta from '@/components/Cta'
import GallerySection from '@/components/GallerySection'
import { getProject } from '@/lib/apis'
import getAssetURL from '@/lib/get-asset-url'

export default async function ProjectPage({ params }) {
  const project = await getProject(params.id)

  if (!project) {
    notFound()
  }

 console.log('project', project)
  return (
    <div className="">
      <header 
        className="relative h-[60vh] bg-cover bg-center flex items-end justify-center"
        style={{ backgroundImage: `url(${getAssetURL(project?.main_image)})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative z-10 text-white text-center pb-16 px-4">
          <h1 className="text-4xl font-bold mb-4">{project?.title}</h1>
          <nav className="text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/projects" className="hover:underline">Projects</Link>
            <span className="mx-2">/</span>
            <span>{project?.title}</span>
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {project?.related_client?.map(client => (
            <GallerySection key={client?.id} client={client} />
          ))}
        </div>
      </main>

      <Cta />
    </div>
  )
}