'use client'
import React, { useState } from 'react'
import getAssetURL from '@/lib/get-asset-url'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import Image from "next/image"

export default function GalleryModal({ project }) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [currentImageIndex, setCurrentImageIndex] = useState(0)
    if (!project) {
        return <div>Loading...</div>
    }

    // const mainImage = getAssetURL(project?.main_image) || '/img/rooms/bg-room-1.jpg'

    const openModal = (index) => {
        setCurrentImageIndex(index)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
    }

    const navigateImage = (direction) => {
        setCurrentImageIndex((prevIndex) => {
            const newIndex = prevIndex + direction
            if (newIndex < 0) return project?.gallery.length - 1
            if (newIndex >= project?.gallery.length) return 0
            return newIndex
        })
    }


    return (
        <>
            <section className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {project?.gallery.map((image, index) => (
                        <div
                            key={index}
                            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            onClick={() => openModal(index)}
                        >
                            <Image
                                src={getAssetURL(image?.directus_files_id, {quality: 60})}
                                alt={`Gallery image ${index + 1}`}
                                width={400}
                                height={300}
                                loading='eager'
                                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <span className="text-white text-3xl">+</span>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <button
                                className="absolute top-8 right-8 text-white"
                                onClick={closeModal}
                            >
                                <X size={35} />
                            </button>
                            <button
                                className="absolute left-9 text-white"
                                onClick={() => navigateImage(-1)}
                            >
                                <ChevronLeft size={35} />
                            </button>
                            <button
                                className="absolute right-9 text-white"
                                onClick={() => navigateImage(1)}
                            >
                                <ChevronRight size={35} />
                            </button>
                            <Image
                                src={getAssetURL(project?.gallery[currentImageIndex]?.directus_files_id, { quality: 60 })}
                                alt={`Gallery image ${currentImageIndex + 1}`}
                                width={900}
                                height={800}
                                loading='lazy'

                                className="max-w-full max-h-full object-contain"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}