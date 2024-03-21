import React from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'

const page = () => {
  return (
    <div>
        <Navbar />
        <div className='flex flex-col justify-center items-center h-[600px] md:h-[700px] gap-4'>
            <h1 className='font-medium text-4xl md:text-[64px]'>Thank You For Ordering!</h1>
            <p className='font-medium md:text-xl md:mt-4'>Your Order Details Will Be Shared In The Mail Soon.</p>
            <Link href='/' className=' font-medium px-16 py-6 bg-black text-white rounded-full md:mt-4'>
                Shop More
            </Link>

        </div>
    </div>
  )
}

export default page
