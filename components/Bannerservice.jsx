import Link from 'next/link'

export default function Bannerservice () {
  return (
    <div className='bannerservice   bg-pr1 group  rounded-3xl border-2    border-pr1 hover:scale-95 duration-200 '>
      <div className='imgbg rounded-lg '></div>
      <div className='contb rounded-lg  '>
        <div className=' rounded-lg headingb  text-white group-hover:scale-105 duration-150'>
          Get A quote
        </div>
        <div className='descb text-white group-hover:text-pr1'>
          With Experts Advice
        </div>
        <Link
          className=' mt-3 group-hover:bg-pr1  text-white  hover:scale-105 duration-500 group group-hover:scale-95  group-hover:text-white relative inline-flex items-center overflow-hidden rounded   px-8 py-3 '
          href='/contact'
        >
          <span className='text-lg  text-white font-medium transition-all group-hover:me-4'>
            click here
          </span>
          <span className='absolute -end-full transition-all group-hover:end-4'>
            <svg
              className='h-5 w-5 rtl:rotate-180'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  )
}
