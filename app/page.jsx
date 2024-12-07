
import Sliderhome from '@/components/sliderhome'
import Carouselteam from '@/components/carouselteam'
// import getAssetURL from '@/lib/get-asset-url'
import { notFound } from 'next/navigation'
import {getHomeData} from '@/lib/apis'
import ServicesCard from '@/components/ServicesCard'

 
 

// async function getHome() {

//   try {
//     const home = await directus.request(
//       readItems('home', {
//         fields: ['slug', 'id', 'title', 'sort', 'date_created'],
//         // sort: ['sort']
//         // limit: 99
//       }),
//       {
//         next: { revalidate: 7 }
//       }
//     )
//     console.log(home)
//     return home
//   } catch (error) {
//     notFound('Error fetching data Mr Hamza :', error)
//   }

// }

export default async function Home () {
  const homedata = await getHomeData()
  console.log('homedataPage---->>>>>>>', homedata)
  return (
    <>
    {/* <main className='flex w-full mx-auto min-h-screen flex-col items-center justify-between'> */}
      <section className='w-full mx-auto'>
        <Sliderhome slideImg={homedata?.images} headline={homedata?.headline} tagline={homedata?.tagline} />
       
      </section>

      {/* <div className='py-5 h-11 w-screen block bg-blue3' /> */}

      <ServicesCard />

      <section className=' mx-auto px-5 container py-10 my-10 sm:mt-20 bg-blue3 bg-content    text-white  sm:rounded-3xl'>
          <div className='py-10 space-y-2 '>
            <div className='text-left text-pr1 text-xl font-semibold'>{homedata?.title}</div>

            <div>{homedata?.subtitle}</div>
          </div>
        <div className='container gap-5 grid grid-cols-1 sm:grid-cols-3 '>

          {homedata?.points?.map((item, index) => (
            <div key={index} className=' border-l-2 border-pr3 px-2 flex flex-col space-y-2 mt-5'>
              <div className='text-pr1 font-semibold text-base '>{index + 1}. </div>
              <div className='heading font-medium text-lg '>{item?.title}</div>

              <div className='content'>{item?.subtitle}</div>
            </div>
          ))}
        </div>
      </section>

      <div className=' mx-auto container text-white   w-full py-10 my-10 sm:mt-20 bg-blue3'>
        <div className='mx-auto  max-w-[1350px]'>
          <div className='col-12 text-center'>
              <div className='subheading'>Our team</div>
              {/* <div className='heading'>About Our Team</div> */}
              {/* <div className='row'> */}
              {/* <div className='col-md-8 mx-auto'> */}
              {/* <p className='content'>
              Curabitur mollis bibendum luctus. Duis suscipit vitae dui
              sed suscipit. Vestibulum auctor nunc vitae diam eleifend, in
              maximus metus sollicitudin. Quisque vitae sodales lectus.
                    Nam p orttitor justo sed mi finibus, vel tristique risus
                    faucibus.
                  </p> */}
                </div>
              {/* </div> */}
              {/* </div> */}
          <Carouselteam />
        </div>
      </div>
    {/* </main> */}
              </>
  )
}
