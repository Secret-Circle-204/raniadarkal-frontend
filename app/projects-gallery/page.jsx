import Image from 'next/image'
import Link from 'next/link'
import Cta from '@/components/Cta'
import { getProjects } from '@/lib/apis'
import getAssetURL from '@/lib/get-asset-url'
import FilterButtons from './FilterButtons'
import ProjectGrid from './ProjectGrid'

export default async function ProjectsGallery() {
  const projects = await getProjects()

  return (
    <div className="pt-20">
      <HeroSection projects={projects} />
      <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <SectionHeader />
        <FilterButtons projects={projects} />
        <ProjectGrid initialProjects={projects} />
      </section>
      <Cta />
    </div>
  )
}

const HeroSection = ({ projects }) => (
  <section
    className="relative h-[70vh] bg-cover bg-center flex items-end justify-center"
    style={{ backgroundImage: `url(${getAssetURL(projects[0]?.main_image)})` }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
    <div className="relative z-10 text-white text-center pb-16">
      <h1 className="text-4xl font-bold mb-4">OUR PROJECTS</h1>
      <div className="text-sm">
        <Link href="/" className="hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span>Projects</span>
      </div>
    </div>
  </section>
)

const SectionHeader = () => (
  <div className="text-center mb-12">
    <h2 className="text-3xl font-bold mt-2 mb-4">Samples of Our Works and Case Studies for Clients</h2>
    <div className="w-24 h-1 bg-pr3 mx-auto"></div>
  </div>
)

export const ProjectCard = ({ project }) => (
  <div
    className="bg-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
  >
    <Link href={`/projects-gallery/${ project?.related_client[0]?.id }`} className="block relative group">
      <Image
        src={getAssetURL(project?.main_image)}
        alt={project?.title}
        width={400}
        height={300}
        className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-white text-3xl">+</span>
      </div>
    </Link>
    <div className="p-4">
      <h3 className="text-xl font-semibold mb-2">{project?.title}</h3>
      <p className="text-pr1">{project?.name}</p>
    </div>
  </div>
)