import Image from 'next/image'
import Link from 'next/link'
import getAssetURL from '@/lib/get-asset-url'

export default function TagsComponent({ tag }) {
  console.log('tag----->>>>',tag)
  return (
    <Link
      href={`/${tag?.service_related}/projects/${tag?.id}`}
      className="block relative w-full h-48 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-105"
    >
      <Image
        src={getAssetURL(tag?.main_image)}
        alt={tag?.name}
        width={500}
        height={500}
        priority
        className="transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
        <h3 className="text-lg font-semibold mb-1">{tag?.name}</h3>
       </div>
    </Link>
  )
}