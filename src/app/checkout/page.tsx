
import React from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'


const page = ({ searchParams }: any) => {
    const localCartItems = JSON.parse(searchParams.orderSummary)

    console.log(localCartItems);
    console.log(typeof(localCartItems));

    const formatCurrency = (amount: number) => {
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

    const calculateTotal = () => {
        return localCartItems.reduce((total: number, item: any) => {
            return total + item.quantity * item.productPrice;
        }, 0);
    };

    return (
        <div className=''>
            <Navbar />
            <div className='m-2 pb-2 lg:flex lg:flex-row lg:gap-2 lg:justify-between max-w-screen-2xl 2xl:mx-auto'>
                <div className='flex flex-col gap-4 lg:order-2'>
                    <div className="bg-[#100F0F] text-white p-4 flex flex-col gap-4 h-fit rounded lg:max-w-[400px] xl:max-w-[450px]">
                        <h1 className="font-medium text-xl">Order Summary</h1>

                        <hr />

                        <div className="flex flex-col gap-6">
                            {localCartItems.map((item: any, index: any) => (
                                <div
                                    key={index}
                                    className="flex flex-row justify-between items-start"
                                >
                                    <p>x{item.quantity}</p>
                                    <p className="text-justify max-w-[200px]">
                                        {item.productName}
                                    </p>
                                    <p className="">
                                        {formatCurrency(item.productPrice * item.quantity)}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <hr />

                        <div className="flex flex-row justify-between">
                            <p>Amount</p>
                            <p className="font-bold">
                                {formatCurrency(calculateTotal())}
                            </p>
                        </div>

                        <div className="flex flex-row justify-between">
                            <p>Delivery Charge</p>
                            <p className="font-bold">{formatCurrency(0)} </p>
                        </div>

                        <hr />

                        <div className="flex flex-row justify-between">
                            <p>Grand Total</p>
                            <p className="font-bold text-2xl">
                                {formatCurrency(calculateTotal())}
                            </p>
                        </div>

                        <div className="flex justify-center ">

                            <button className=" bg-indigo-500 text-white px-20 py-4 rounded text-lg font-medium">
                                Pay
                            </button>
                        </div>
                    </div>

                    <div className="bg-[#100F0F] text-white p-4 flex flex-col gap-4 rounded lg:w-[400px]">
                        <h1 className="font-medium text-xl">Delivery Through</h1>

                        <hr />

                        <div className="flex flex-row gap-4">
                            <Image
                                src="/assets/cart.png"
                                width={100}
                                height={100}
                                alt="Empty Cart"
                                className="w-[24px] h-[24px]"
                            />
                            <p>Professional Courier</p>
                        </div>

                        <div className="flex flex-row gap-4">
                            <Image
                                src="/assets/cart.png"
                                width={100}
                                height={100}
                                alt="Empty Cart"
                                className="w-[24px] h-[24px]"
                            />
                            <div>
                                <span className="text-gray-400">Deliver to</span>
                                <span className="ml-2">ABC Street, XYZ City.</span>
                            </div>
                        </div>
                    </div>

                </div>



                <div className='grow border-2 border-black rounded-sm p-4 flex flex-col'>
                    <h1 className='text-2xl font-semibold'>1. Delivery Details</h1>
                    <div className='m-4'>
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

                        </div>
                    </div>
                    <h1 className='text-2xl font-semibold'>2. Payment Details</h1>

                </div>
            </div>

        </div>
    )
}

export default page
