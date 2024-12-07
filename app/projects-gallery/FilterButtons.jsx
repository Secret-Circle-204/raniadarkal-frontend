'use client'

import { useState } from 'react'

const FilterButtons = ({ projects }) => {
  const [currentFilter, setCurrentFilter] = useState('all')
  const uniqueCategories = ['all', ...new Set(projects.map(project => project.title))]

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter)
    document.dispatchEvent(new CustomEvent('filterChange', { detail: filter }))
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {uniqueCategories.map((category) => (
        <button
          key={category}
          className={`px-4 py-2 rounded-full transition-colors duration-300 ${
            currentFilter === category
              ? 'bg-pr3 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
          onClick={() => handleFilterChange(category)}
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </button>
      ))}
    </div>
  )
}

export default FilterButtons