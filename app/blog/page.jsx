'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'
import getAssetURL from '@/lib/get-asset-url'

// Main Blog Component
export default function Blog() {
  const [blog, setBlog] = useState(null)
  const [posts, setPosts] = useState([])
  const [selectedPost, setSelectedPost] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedBlog = await directus.request(readItems('blog', {
          fields: ['main_image', 'block', 'title']
        }))
        setBlog(fetchedBlog)

        const fetchedPosts = await directus.request(readItems('posts', {
          fields: ['*', 'id', 'title', 'video_link', 'desc', 'date_published']
        }))
        setPosts(fetchedPosts)
        setSelectedPost(fetchedPosts[0])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  if (!blog || posts.length === 0) return <div>Loading...</div>
  console.log('blog--->>>>>', blog)
  console.log('posts--->>>>>', posts)
  console.log('selectedPost--->>>>>', selectedPost)
  return (
    <div className="min-h-screen bg-black">
      <HeroSection blog={blog} />
      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BlogList blog={blog} post={selectedPost} />
          </div>
          <aside className="space-y-8">
            <RecentPosts posts={posts} onSelectPost={setSelectedPost} />
            <BannerService />
          </aside>
        </div>
      </main>
    </div>
  )
}

// Hero Section Component
function HeroSection({ blog }) {
  return (
    <section
      className="relative h-[60vh] bg-cover bg-center flex items-end"
      style={{ backgroundImage: `url(${getAssetURL(blog.main_image)})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 pb-16 text-white">
        <h1 className="text-4xl font-bold mb-2 capitalize">{blog.title}</h1>
        <div className="flex items-center text-sm">
          <Link href="/" className="hover:underline">Home</Link>
          <span className="mx-2">/</span>
          <span className="capitalize">{blog.title}</span>
        </div>
      </div>
    </section>
  )
}

// BlogList Component
function BlogList({ blog, post }) {
  if (!post) return null

  return (
    <article className="bg-black_more shadow-lg rounded-lg overflow-hidden">
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          className='pt-2 w-full mx-auto'
          width='660'
           
          height='410'
          src={`https://www.youtube.com/embed/${post?.video_link}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
      <div className="p-6">
        <h2 className="text-2xl font-bold text-white mb-2">{post.title}</h2>
        <p className="text-sm text-white mb-4">{new Date(post.date_published).toLocaleDateString()}</p>
        <p className="text-white mb-6">{post.desc}</p>
        <blockquote className="bg-pr1/30 border-l-4 border-pr1 italic p-4 mb-6">
          {blog.block}
        </blockquote>
      </div>
    </article>
  )
}

// RecentPosts Component
function RecentPosts({ posts, onSelectPost }) {
  return (
    <div className="bg-black_more shadow-lg rounded-lg overflow-hidden">
      <h3 className="text-lg font-semibold bg-pr1/80 text-white p-4">Recent Posts</h3>
      <ul className="divide-y divide-gray-200 max-h-[750px] overflow-y-auto">
        {posts.map(post => (
          <li key={post.id} className="p-4 hover:bg-pr1 cursor-pointer" onClick={() => onSelectPost(post)}>
            <RecentListItem post={post} />
          </li>
        ))}
      </ul>
    </div>
  )
}

// RecentListItem Component
function RecentListItem({ post }) {
  return (
    <div className="flex space-x-4">
      <div className="  flex-shrink-0 w-24 h-16 relative overflow-hidden rounded">
        {/* <Image
          src={`https://img.youtube.com/vi/${post.video_link}/0.jpg`}
          alt={post.title}
          layout="fill"
          objectFit="cover"
        /> */}
        <iframe
          className='w-full h-full object-cover'
          width='660'
          height='315'
          src={`https://www.youtube.com/embed/${post?.video_link}`}
          title='YouTube video player'
          frameBorder='0'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        ></iframe>
      </div>
      <div className="flex-grow">
        <h4 className="text-sm font-medium text-white mb-1 line-clamp-1">{post.title}</h4>
        <p className="text-xs text-gray-100 line-clamp-2">{post.desc}</p>
      </div>
    </div>
  )
}

// BannerService Component
function BannerService() {
  return (
    <div className="bg-pr1/90 items-center text-center text-white rounded-lg overflow-hidden shadow-lg">
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold">Get A Quote</h3>
        <p className="text-sm">With Experts Advice</p>
        <Link href="/contact" className="inline-block text-base font-medium bg-black_more text-pr1 px-4 py-2 rounded hover:text-black_more hover:bg-pr1 transition duration-300">
          Click here
        </Link>
      </div>
    </div>
  )
}