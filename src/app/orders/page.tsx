import React from 'react'
import Navbar from '../components/Navbar'

const page = () => {
    const orders = [{
        productName: 'T-shirt',
        productPrice: 100,
        productQuantity: 1,
    }
    ]
  return (
    <div>
      <Navbar />
      <div className='m-4'>
      <h1 className='text-4xl font-medium'>Your Orders</h1>
      {
        orders.map((order:any)=>(
            <div>
                <h1>{order.productName}</h1>
                <p>{order.productPrice}</p>
                <p>{order.productQuantity}</p>
            </div>
        ))
      }
      </div>
    </div>
  )
}

export default page
