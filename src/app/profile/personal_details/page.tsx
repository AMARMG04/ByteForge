import React from 'react'
import Navbar from '@/app/components/Navbar'
const page = () => {
    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='lg:flex lg:flex-col lg:justify-center lg:items-center lg:h-[800px]'>
                <div className='lg:max-w-fit'>
                    <h1 className='m-2 text-2xl font-medium'>Personal Details</h1>
                    <div className='m-2 flex flex-col gap-4'>
                        <div className='flex flex-col gap-4 lg:flex-row lg:gap-40'>
                            <div>
                                <label htmlFor="firstName" className='block font-medium'>First Name</label>
                                <input type="text" name="firstName" id="firstName" placeholder="Enter your first name" required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                            </div>
                            <div>
                                <label htmlFor="lastName" className='block font-medium'>Last Name</label>
                                <input type="text" name="lastName" id="lastName" placeholder="Enter your last name" required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 lg:flex-row lg:gap-40'>
                            <div>
                                <label htmlFor="mailid" className='block font-medium'>Email ID</label>
                                <input type="email" name="mailid" id="mailid" placeholder="Enter your email ID" required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                            </div>
                            <div>
                                <label htmlFor="mobile" className='block font-medium'>Mobile Number</label>
                                <input type="tel" name="mobile" id="mobile" placeholder="Enter your mobile number" required maxLength={10} className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                            </div>
                        </div>
                    </div>
                    <h1 className='m-2 mt-4 text-2xl font-medium'>Address</h1>
                    <div className='m-2 flex flex-col gap-4'>
                        <div>
                            <label htmlFor="street" className='block font-medium'>Street Name</label>
                            <input type="text" name="street" id="street" placeholder="Enter your street name" required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[965px]' />
                        </div>
                        <div className='flex flex-col gap-4 lg:flex-row lg:gap-40'>
                            <div>
                                <label htmlFor="city" className='block font-medium'>City / Town</label>
                                <input type="text" name="city" id="city" placeholder="Enter your city name" required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                            </div>
                            <div>
                                <label htmlFor="district" className='block font-medium'>District</label>
                                <input type="text" name="district" id="district" placeholder="Enter your district name" required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                            </div>
                        </div>
                        <div className='flex flex-col gap-4 lg:flex-row lg:gap-40'>
                            <div>
                                <label htmlFor="state" className='block font-medium'>State</label>
                                <input type="text" name="state" id="state" placeholder="Enter your state name" required className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                            </div>
                            <div >
                                <label htmlFor="pincode" className='block font-medium'>Pincode</label>
                                <input type="text" name="pincode" id="pincode" placeholder="Enter your pincode" required maxLength={6} className='w-full p-2 border-2 border-gray-500 rounded-sm lg:w-[400px]' />
                            </div>
                        </div>
                        <input type="submit" className='w-full p-4 bg-black text-white rounded-sm my-10 lg:w-[400px]' value='Save' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
