


// const catbg = '/img/bg-home1.jpg'

import Link from "next/link";

export default function Cta () {

    return (
        <div className='bg-pr4 text-white   w-screen py-10 my-10 sm:mt-20 '>
            <div className='  flex flex-wrap justify-between   mx-auto   max-w-[1360px]'>
                <div className='  w-full  '>
                    <div className='  text-center '>
                        <h2 className='  text-3xl font-bold '>
                        Get Incredible Interior Design Right Now!
                        </h2>
                        <p className='  text-lg py-3 '>
                        At every stage, we could supervise your project – controlling all the details and consulting the builders.


                        </p>
                    </div>
                </div>

                <div className='  w-full  '>
                    <div className=' py-3 text-center '>
                        <Link href='/contact' className=' text-white  btn   '>
                            <span>
                            Get Consultation
                            </span>

                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}