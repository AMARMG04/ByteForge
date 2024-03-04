import React, { useState, useEffect } from "react";
import UserDetailsForm from "../components/UserDetailsForm";
import Navbar from "../components/Navbar";
import Image from "next/image";
import { paymentUsingRazorpay } from "@/app/actions/payment";

const CheckoutPage = ({ localCartItems, user }) => {
  // const [start, setStart] = useState(false)

  const calculateTotal = () => {
    return localCartItems.reduce((total, item) => {
      return total + item.quantity * item.productPrice;
    }, 0);
  };
  const amount = calculateTotal();

  // useEffect(() => {
  //     const loadRazorpayScript = async () => {
  //         try{
  //             const script = document.createElement("script");
  //             script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //             script.async = true;
  //             document.body.appendChild(script);
  //         }catch(e){
  //             console.error("Failed to load Razorpay Script ", e)
  //         }
  //     }

  //     const handlePayment = async () => {

  //         try{
  //             await loadRazorpayScript();
  //             const payment = await paymentUsingRazorpay(amount);
  //             console.log(payment.id)

  //             const options = {
  //                 key: process.env.RAZORPAY_KEY,
  //                 amount: amount,
  //                 currency: "INR",
  //                 name: "Kalvi Computers",
  //                 description: "Purchase of Laptop",
  //                 order_id: payment.id,
  //                 image: "Your Business Logo",
  //                 handler: function (response) {
  //                     alert("Payment Successful");
  //                 },
  //                 prefill:{
  //                     name: user.firstName,
  //                     email: user.email,
  //                     contact: user.mobile
  //                 }
  //             };

  //             const razorpayInstance = new window.Razorpay(options);
  //             razorpayInstance.open();

  //         }catch(error){
  //             console.error("Failed to handle payment", error);
  //             alert("Payment Initialization Failed");
  //         }
  //     };

  //     handlePayment();

  // }, [start]);

  // const handleSubmit = () =>{
  //     setStart(true)
  // }

  const loadRazorpayScript = async () => {
    try {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    } catch (e) {
      console.error("Failed to load Razorpay Script ", e);
    }
  };

  const handleSubmit = async () => {
    try {
      await loadRazorpayScript();
      const payment = await paymentUsingRazorpay(1000);
      console.log(payment.id);

      const options = {
        key: process.env.RAZORPAY_KEY,
        amount: 1000,
        currency: "INR",
        name: "Kalvi Computers",
        description: "Purchase of Laptop",
        order_id: payment.id,
        image: "Your Business Logo",
        handler: function (response) {
          alert("Payment Successful");
          
        },
        prefill: {
          name: user.firstName,
          email: user.email,
          contact: user.mobile,
        },
      };

      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Failed to handle payment", error);
      alert("Payment Initialization Failed");
    }
  };

  const formatCurrency = (amount) => {
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
    <>
      <Navbar />
      <div className="m-2 pb-2 lg:flex lg:flex-row lg:gap-2 lg:justify-between max-w-screen-2xl 2xl:mx-auto">
        <div className="flex flex-col gap-4 lg:order-2">
          <div className="bg-[#100F0F] text-white p-4 flex flex-col gap-4 h-fit rounded lg:max-w-[400px] xl:max-w-[450px]">
            <h1 className="font-medium text-xl">Order Summary</h1>

            <hr />

            <div className="flex flex-col gap-6">
              {localCartItems.map((item, index) => (
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
              <p className="font-bold">{formatCurrency(calculateTotal())}</p>
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
              <button
                className=" bg-indigo-500 text-white px-20 py-4 rounded text-lg font-medium"
                onClick={() => {
                  handleSubmit();
                }}
              >
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
                <span className="ml-2">{user.city}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grow border-2 border-black rounded-sm p-4 flex flex-col">
          <h1 className="text-2xl font-semibold">1. Delivery Details</h1>
          <div className="m-4">
            <UserDetailsForm user={user} />
          </div>

        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
