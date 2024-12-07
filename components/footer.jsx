'use client'

import Link from 'next/link'
import React from 'react'
import { FaFacebookF, FaLinkedinIn, FaTwitter, FaInstagram } from 'react-icons/fa'

const mockData = {
  content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.',
  facebook: 'www.facebook.com/rania',
  location: '123 Main St, Anytown, USA',
  email: 'info@rania-darkal.com',
  phone: '+1 (234) 567-8901',
}

const SocialIcon = ({ Icon }) => (
  <a href="#" className="w-10 h-10 rounded-full bg-black flex items-center justify-center text-white hover:bg-pr1 transition-colors duration-300">
    <Icon className="w-5 h-5" />
  </a>
)

export default function Footer() {
  const data = mockData

  return (
    <footer className="bg-black_more text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Company Info */}
          <div>
            <Link href="/" className="text-2xl font-semibold">
              <span>Rania</span>
              <span className="text-pr1 font-light"> Darkal</span>
            </Link>
            <p className="mt-4 text-white text-sm leading-relaxed">{data.content}</p>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-medium mb-4">Follow Us</h3>
            <p className="text-white text-sm mb-4">You can follow our work and the latest news on:</p>
            <div className="flex space-x-4">
              <SocialIcon Icon={FaFacebookF} />
              <SocialIcon Icon={FaLinkedinIn} />
              <SocialIcon Icon={FaTwitter} />
              <SocialIcon Icon={FaInstagram} />
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-medium mb-4">Contact Us</h3>
            <ul className="text-white text-sm space-y-2">
              <li>Phone: {data.phone}</li>
              <li>Email: {data.email}</li>
              <li>Facebook: {data.facebook}</li>
              <li>Location: {data.location}</li>
            </ul>
          </div>

          {/* Useful Links */}
          <div>
            <h3 className="text-lg font-medium mb-4">Useful Links</h3>
            <ul className="text-white text-sm space-y-2">
              {['About Us', 'Team', 'Works', 'Services', 'Blog', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '-')}`} className="hover:text-pr1 transition-colors duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Sub Footer */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-white text-sm">
            © Copyrights 2024-2025 All rights reserved.
          </p>
          <Link href="https://www.xtreme-communication.com/" className="text-white text-sm hover:text-pr1 transition-colors duration-300 mt-4 sm:mt-0">
            xtreme-communication
          </Link>
        </div>
      </div>
    </footer>
  )
}