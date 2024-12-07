// import ImageGallery from 'react-image-grid-gallery'
import Image from 'next/image'

// const imagesArray = [
//   {
//     alt: "Image1's alt text",
//     caption: "Image1's description",
//     src: 'http://example.com/image1.jpg'
//   },
//   {
//     alt: "Image2's alt text",
//     caption: "Image2's description",
//     src: 'http://example.com/image2.png'
//   },
//   {
//     alt: "Image3's alt text",
//     caption: "Image3's description",
//     src: 'http://example.com/image3.webp'
//   }
// ]

export default function ImageItems () {
  return (
    <div>
      <div className='grid gap-3 '>
        <div className=' relative'>
          <Image
            className='h-auto max-w-full relative  '
            src='https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg'
            alt=''
          />
        </div>
        <div className=' relative'>
          <Image
            className='h-auto max-w-full relative  '
            src='https://flowbite.s3.amazonaws.com/docs/gallery/masonry/image.jpg'
            alt=''
          />
        </div>
      </div>
    </div>
  )
}
