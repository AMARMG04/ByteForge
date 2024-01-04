import React from 'react'
import Image from 'next/image'

const Login = () => {
  return (
    <>
      <div className='flex flex-col h-screen p-2 lg:flex-row'>
          <div className='flex justify-center items-center h-2/6 bg-[#100F0F] rounded lg:flex-1 lg:h-auto lg:'>
          <Image
              src="/assets/logo.svg"
              width={150}
              height={150}
              alt='Logo'
              className=''
            />
          </div>
          <div className='h-4/6 bg-white lg:flex-1 lg:h-screen lg:p-2'>

                <div className='grid grid-cols-1 gap-6'>
                  <label className="block">
                    <span className=" text-xl block font-medium mb-2 lg:text-2xl">Phone Number</span>
                    <input type="tel" className='block border-2 border-gray-300 w-3/5 h-14 rounded p-2 text-lg' placeholder='Enter your phone number'/>
                  </label>
                  <input type="submit" value="Get OTP" className='w-44 bg-black text-white h-14 rounded'/>
                </div>
          </div>
      </div>
    </>
  )
}

export default Login
