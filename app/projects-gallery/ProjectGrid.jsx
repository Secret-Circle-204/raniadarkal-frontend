'use client'

import { useState, useEffect } from 'react'
import { ProjectCard } from './page'

const ProjectGrid = ({ initialProjects }) => {
  const [projects, setProjects] = useState(initialProjects)

  useEffect(() => {
    const handleFilterChange = (event) => {
      const filter = event.detail
      if (filter === 'all') {
        setProjects(initialProjects)
      } else {
        setProjects(initialProjects.filter((project) => project.title === filter))
      }
    }

    document.addEventListener('filterChange', handleFilterChange)
    return () => {
      document.removeEventListener('filterChange', handleFilterChange)
    }
  }, [initialProjects])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  )
}

export default ProjectGrid