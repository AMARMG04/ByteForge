import React from 'react'
import Image from 'next/image';
import Navbar from '../components/Navbar'

const getData = async () => {
  const res = await fetch("http://localhost:3000/api/orderHistory", { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Something Went Wrong")
  }
  return res.json();
};

const page = async () => {
  const orders = await getData();

  const formatCurrency = (amount:any) => {
    const currencyFormatter = new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    });

    // Extracting parts from formatted string
    const parts = currencyFormatter.formatToParts(amount);

    // Adding space between symbol and digits
    const formattedAmount = parts
      .map((part) => (part.type === "currency" ? part.value + " " : part.value))
      .join("");

    return formattedAmount.replace("₹", "Rs. ");
  };

  return (
    <div className='pb-8'>
      <Navbar />
      <div className='m-4'>
        <h1 className='text-4xl font-medium my-3'>Your Orders</h1>
        <div className='flex flex-col justify-center items-center gap-6'>
          {
            orders.map((order: any, index: any) => (
              <div className='shadow-[0_5px_60px_-15px_rgba(0,0,0,0.3)] rounded-lg p-4 bg-white flex flex-col gap-4 w-[400px] md:w-[600px] lg:w-[800px]' key={index}>
                <h1 className='text-xl font-medium'>Order ID: <span className=' font-normal'>{order.orderID}</span></h1>
                <h1 className='text-md text-[#909090] font-normal'>Order Date: <span className=' font-light'>{order.orderDate}</span></h1>
                <hr />
                <div>
                  {
                    order.orderedItems.map((product:any, index:any)=>(
                      <div key={index} className='flex flex-row justify-between'>
                          <div className='flex flex-row gap-2 items-center'>
                            <Image
                                src={product.productImage}
                                width={100}
                                height={100}
                                alt="product image"
                                className='p-2 rounded-md w-[100px] h-[100px] object-contain'
                            />
                            <h1 className='font-medium text-md max-w-[140px] md:max-w-full'>
                                {product.productBrand} {product.productName}
                            </h1>
                          </div>
                          <div className='flex flex-col justify-center'>
                              <h1 className='text-md font-medium'>{formatCurrency(product.productPrice)}</h1>
                              <p className='text-right text-[#909090]'>Qty: {product.quantity}</p>
                          </div>
                      </div>
                    ))
                  }
                </div>
                <hr />
                <div className='grid grid-cols-2'>
                      <div className='flex flex-col'>
                        <h1 className='font-medium'>Need Help?</h1>
                        <span className=' mr-4 '>Contact:</span>
                        <p className='text-[#909090]'>+91 7868049915</p>
                        <span className='mr-4 '>Email:</span>
                        <p className='text-[#909090]'> kalvi.trt@gmail.com</p>
                      </div>
                      <div className=''>
                            <h1 className='font-medium'>Order Summary</h1>
                            <div className='flex justify-between'>
                            <p>Grand Total</p>
                            <p className='text-lg lg:text-xl'>{formatCurrency(order.orderedItems.reduce((total:any, item:any) => total + item.productPrice * item.quantity, 0))}</p>
                            </div>
                      </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default page
