import Cta from '@/components/Cta'
import Carouselteam from '@/components/carouselteam'
import getAssetURL from '@/lib/get-asset-url'
import directus from '@/lib/directus'
import { readItems } from '@directus/sdk'
import NotFound from '@/app/not-found'
import Link from 'next/link'

async function getData () {
  try {
    const team_page = await directus.request(
      readItems('team_page', {
        // filter: {
        //   slug: { _eq: slug }
        // },
        fields: ['*', 'id', 'title', 'main_image']
        // limit: -1
      }),
      {
        next: { revalidate: 10 }
        // cache: 'no-store'
      }
    )

    // console.log(team_page)
    return team_page
  } catch (error) {
    NotFound('Error fetching data Mr Hamza :', error)
  }
}

export default async function Team () {
  const team = await getData()
  // console.log('team_data', team)
  // console.log(team)
  return (
    <>
    
     <section
       className=' h-[60vh] pt-[30px]    object-cover items-center   object-center bg-cover w-full'
       style={{
         backgroundImage:  `url(${getAssetURL(team?.main_image)})`
       }}
       // style={{
       //   backgroundImage: `url(${getAssetURL(team?.main_image)})`,
       //   backgroundImage: { cache: 'no-store' }
       // }}
     >
       <div className=' items-center  text-center     '>
         <div className='  text-white max-w-[1200px] mx-auto px-16 mt-40 sm:mt-[350px] sm:items-center lg:px-0  lg:pt-[110px]    pt-[20px] flex flex-wrap sm:flex  justify-between  max-sm:justify-center text-center  text-2xl drop-shadow-lg  transition-shadow duration-300 font-semibold'>
           <div className='items-center  text-center    '>
             <h1 className='lg:text-left ml-[-25px] items-center  text-center    '>
               {team?.title}
             </h1>
           </div>

           <div className=' text-sm font-light text-center items-center '>
             {' '}
             <Link className='link' href='/'>
               Home
             </Link>
             <span className='dash'>/</span>
             <span>{team?.title}</span>
           </div>
         </div>
       </div>
     </section>

     <section className='container-fluid  text-white bg-blue3 w-screen mx-auto my-20 '>
       <div className='row m-10-hor bg-blue3 w-full mx-auto sm:pb-20   '>
         {/* <div className=' p-md-5 mb-16'> */}
         {/* <div className='heading'> {team?.title}</div> */}

         {/* <div>
               <div
                 className='content'
                 dangerouslySetInnerHTML={{
                   __html: team?.description
                 }}
               ></div>
             </div> */}
         {/* </div> */}
         <Carouselteam />
       </div>
     </section>
    
     <Cta />
    </>
  )
}
