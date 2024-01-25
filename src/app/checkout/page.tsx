
import React from 'react'
import Navbar from '../components/Navbar'


const page = ({searchParams}:any) => {
    console.log(JSON.parse(searchParams.orderSummary))

    return (
        <div>
            <Navbar />
            <div className='m-2 flex flex-row gap-10 justify-start'>
                <div className='order-2'> 
                    <h1>Order Summary</h1>
                </div>
                <div className='border-2 border-black rounded-sm p-4'>
                <h1 className='text-2xl font-semibold'>1. Checkout Details</h1>
                </div>
            </div>

        </div>
    )
}

export default page
