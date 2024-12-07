'use client'

import { useState } from 'react'
import Image from 'next/image'
import { XIcon, ChevronLeft, ChevronRight } from 'lucide-react'
import getAssetURL from '@/lib/get-asset-url'

export default function GallerySection({ client }) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const images = client?.gallery || []

  const openModal = () => setIsOpen(true)
  const closeModal = () => setIsOpen(false)

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const goToPreviousImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  return (
    <>
      <div
        onClick={openModal}
        className="rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105"
      >
        <div className="relative h-64">
          <Image
            src={getAssetURL(client?.main_image?.filename_disk, { quality: 50 })} // Reduced quality
            alt={client?.client_name}
            width={500}
            height={500}
            // priority
            loading="lazy" // Lazy load for better performance
            className="w-full h-full object-cover"
          />
        </div>
        <div className="bg-black_more lg:h-24 p-4">
          <h3 className="font-semibold text-lg mb-2">{client?.client_name || 'Client Name'}</h3>
          <p className="text-gray-600 text-sm line-clamp-2">{client?.summary}</p>
        </div>
      </div>

      {isOpen && (
        <section className="fixed inset-0 z-50 w-full mx-auto overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="relative bg-black_more rounded-lg max-w-7xl w-full mx-4">
              <button
                onClick={closeModal}
                className="absolute z-30 lg:top-14 lg:right-14 top-6 right-6 text-gray-500 hover:text-gray-700"
              >
                <XIcon className="text-pr1 hover:text-pr4/80 bg-black_more/80 hover:bg-black_more/30 rounded-full lg:h-12 lg:w-12 h-8 w-8" />
              </button>

              <div className="lg:p-8 p-2">
                <div className="relative h-[60vh] lg:h-[60vh] mb-4">
                  <Image
                    src={getAssetURL(images[currentImageIndex]?.directus_files_id, { quality: 50 })} // Reduced quality
                    alt={`Gallery image ${currentImageIndex + 1}`}
                    width={500}
                    height={500}
                    // priority
                    loading="lazy" // Lazy load
                    className="w-full h-full object-cover object-center lg:h-full  transition-transform duration-300" // Added transition for smoothness
                  />
                  <button
                    onClick={goToPreviousImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                  >
                    <ChevronLeft className="h-6 w-6 text-gray-600" />
                  </button>
                  <button
                    onClick={goToNextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md"
                  >
                    <ChevronRight className="h-6 w-6 text-gray-600" />
                  </button>
                </div>

                <div className="text-sm text-gray-500 mb-4">
                  Image {currentImageIndex + 1} of {images.length}
                </div>

                <h3 className="text-xl font-semibold mb-2">{client?.client_name}</h3>
                <p className="text-gray-600 mb-4">{client?.summary}</p>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <strong className="text-gray-700">Date:</strong> {client?.project_date}
                  </div>
                  <div>
                    <strong className="text-gray-700">Duration:</strong> {client?.Duration}
                  </div>
                  <div>
                    <strong className="text-gray-700">Budget:</strong> {client?.Budget}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}