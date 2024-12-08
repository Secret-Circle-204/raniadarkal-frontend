'use client'

import React, { useState, useEffect } from 'react'
import { toast, Toaster } from 'react-hot-toast'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { readItems, createItem } from '@directus/sdk'
import directus from '@/lib/directus'
import getAssetURL from '@/lib/get-asset-url'

export default function Contact() {
  const [loading, setLoading] = useState(false)
  const [footerData, setFooterData] = useState({})
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  useEffect(() => {
    const getDataFooter = async () => {
      try {
        const response = await directus.request(
          readItems('footer', {
            fields: ['*', 'content'],
          }),
          {
            cache: 'no-store',
          }
        )
        setFooterData(response)
      } catch (error) {
        console.error('Error fetching footer data:', error)
      }
    }

    getDataFooter()
  }, [])

  const onSubmit = async (data) => {
    setLoading(true)
    let toastId

    try {
      // First, create the item in Directus
      const directusResponse = await directus.request(createItem('inbox', data))

      if (directusResponse) {
        // If Directus creation is successful, attempt to send email
        toastId = toast.loading('Sending your message...', { position: 'top-center' })

        const formData = new FormData()
        Object.keys(data).forEach(key => formData.append(key, data[key]))

        const emailResponse = await fetch('/api/mailer', {
          method: 'POST',
          body: formData,
        })

        if (emailResponse.ok) {
          toast.success('Message sent successfully!', { id: toastId })
          reset()
        } else {
          // Email failed, but message is saved in Directus
          toast.success('Message received. We\'ll get back to you soon.', { id: toastId })
          console.warn('Email sending failed, but message saved in Directus')
        }
      } else {
        throw new Error('Failed to save message')
      }
    } catch (error) {
      console.error('Error in form submission:', error)
      toast.error('An error occurred. Please try again.', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <Toaster />
      {/* Hero Section */}
      <section
        className="relative h-[60vh] bg-cover bg-center flex items-end justify-center"
        style={{ backgroundImage: `url(${getAssetURL(footerData?.main_image)})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-white text-center pb-16">
          <h1 className="text-4xl font-bold mb-4">{footerData?.title}</h1>
          <div className="text-sm">
            <Link href="/" className="hover:underline">Home</Link>
            <span className="mx-2">/</span>
            <span>{footerData?.title}</span>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex flex-wrap -mx-4">
          {/* Contact Info */}
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
            <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
            <p className="text-white mb-8">
              We are here to help and answer any question you might have. We look forward to hearing from you.
            </p>
            <div className="space-y-4">
              <ContactInfoItem
                icon="location"
                text={footerData?.location}
                link={`https://maps.google.com/?q=${footerData?.location}`}
              />
              <ContactInfoItem
                icon="email"
                text={footerData?.email}
                link={`mailto:${footerData?.email}`}
              />
              <ContactInfoItem
                icon="phone"
                text={footerData?.phone}
                link={`tel:${footerData?.phone}`}
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className="w-full lg:w-1/2 px-4">
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-8">
              <FormInput
                label="Name"
                id="name"
                type="text"
                placeholder="Your Name"
                register={register}
                errors={errors}
                validationRules={{ required: "Name is required" }}
              />
              <FormInput
                label="Email"
                id="email"
                type="email"
                placeholder="Your Email"
                register={register}
                errors={errors}
                validationRules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                }}
              />
              <FormInput
                label="Phone"
                id="phone"
                type="tel"
                placeholder="Your Phone Number"
                register={register}
                errors={errors}
                validationRules={{ required: "Phone number is required" }}
              />
              <FormInput
                label="Address"
                id="address"
                type="text"
                placeholder="Your Address"
                register={register}
                errors={errors}
                validationRules={{ required: "Address is required" }}
              />
              <FormTextarea
                label="Message"
                id="message"
                placeholder="Your Message"
                register={register}
                errors={errors}
                validationRules={{ required: "Message is required" }}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-pr1 text-white font-bold py-3 px-4 rounded-md hover:bg-pr1 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pr1 focus:ring-opacity-50"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

function ContactInfoItem({ icon, text, link }) {
  const icons = {
    location: (
      <svg className="w-6 h-6 text-pr1 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
      </svg>
    ),
    email: (
      <svg className="w-6 h-6 text-pr1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
      </svg>
    ),
    phone: (
      <svg className="w-6 h-6 text-pr1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
      </svg>
    ),
  }

  return (
    <div className="flex items-start">
      {icons[icon]}
      <Link href={link} className="text-white hover:text-pr1">
        {text}
      </Link>
    </div>
  )
}

function FormInput({ label, id, type, placeholder, register, errors, validationRules }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-black_more font-bold mb-2">{label}</label>
      <input
        type={type}
        id={id}
        {...register(id, validationRules)}
        className="w-full text-black_more px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pr1"
        placeholder={placeholder}
      />
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>}
    </div>
  )
}

function FormTextarea({ label, id, placeholder, register, errors, validationRules }) {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-black_more font-bold mb-2">{label}</label>
      <textarea
        id={id}
        {...register(id, validationRules)}
        rows="4"
        className="w-full px-3 py-2 border text-black_more border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pr1"
        placeholder={placeholder}
      ></textarea>
      {errors[id] && <p className="text-red-500 text-xs mt-1">{errors[id].message}</p>}
    </div>
  )
}