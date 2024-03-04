"use client"

import React from 'react'
import CheckoutPage from '../components/CheckoutPage'


const getData = async (uid: string | null) => {
    const res = await fetch("http://localhost:3000/api/personalDetails/fetchData", { 
        cache: "no-store",
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ uid })
     });
    if(!res.ok){
        throw new Error("Something Went Wrong")
    }
    return res.json();

}

const page = async({ searchParams }: any) => {
       
    const localCartItems = JSON.parse(searchParams.orderSummary)
    const details = await getData(localCartItems[0].userId)
    const user = details.user_details[0]

    return (
        <div className=''>
            <CheckoutPage 
                user={user}
                localCartItems={localCartItems}
            />

        </div>
    )
}

export default page
