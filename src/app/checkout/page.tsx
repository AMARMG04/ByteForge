import React from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image'
import UserDetailsForm from '../components/UserDetailsForm'

const getData = async (uid: string | null) => {
    const res = await fetch("http://localhost:3000/api/personalDetails/fetchData", { 
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
                        <UserDetailsForm user={user} uid={localCartItems[0].userId}/>
                    </div>
                    <h1 className='text-2xl font-semibold'>2. Payment Details</h1>

                </div>
            </div>

        </div>
    )
}

export default page
