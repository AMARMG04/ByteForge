import React from "react";
import Navbar from "./Navbar";
import Image from "next/image";

const AddToCart = () => {
  const cartEmpty = false;
  const cartItems = [
    {
      quantity: 2,
      productName: `Samsung Galaxy Book3 Pro, 16” 32GB RAM 1TB SSD, 13th Gen Intel core i7 - 1360p processor, 3k oled screen, 120hz, 2023 model, graphite`,
      price: 1000,
    },
    { quantity: 1, productName: "Monitor", price: 500 },
    // Add more items as needed
  ];

  return (
    <>
      <Navbar />
      <div className="max-w-screen-2xl mx-auto">
        {cartEmpty ? (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Image
              src="/assets/empty-cart.png"
              width={256}
              height={256}
              alt="Empty Cart"
              className="w-[120px] h-[120px] mb-4 ml-10"
            />
            <h2 className="text-2xl font-medium mb-4">Your Cart is Empty</h2>
          </div>
        ) : (
          <div className="m-2 pb-2 lg:flex lg:flex-row lg:gap-2 lg:justify-between">
            <div className="flex flex-col gap-4 lg:order-2">
              {/* Order Summary Section */}
              <div className="bg-[#100F0F] text-white p-4 flex flex-col gap-4 rounded lg:w-[400px] xl:w-[450px]">
                <h1 className="font-medium text-xl">Order Summary</h1>

                <hr />

                <div className="flex flex-col gap-6">
                  {cartItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex flex-row justify-between items-start"
                    >
                      <p>x{item.quantity}</p>
                      <p className="text-justify max-w-[200px]">
                        {item.productName}
                      </p>
                      <p>Rs.{item.price}</p>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="flex flex-row justify-between">
                  <p>Amount</p>
                  <p className="font-bold">Rs. 1500</p>
                </div>

                <div className="flex flex-row justify-between">
                  <p>Tax</p>
                  <p className="font-bold">Rs. 500</p>
                </div>

                <hr />

                <div className="flex flex-row justify-between">
                  <p>Grand Total</p>
                  <p className="font-bold text-2xl">Rs. 2000</p>
                </div>

                <div className="flex justify-center ">
                  <button className=" bg-indigo-500 text-white px-20 py-4 rounded text-lg font-medium">
                    Place Order
                  </button>
                </div>
              </div>
              {/* Delivery Details Section */}
              <div className="bg-[#100F0F] text-white p-4 flex flex-col gap-4 rounded">
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
            {/* Cart Details Section */}
            <div className="my-4 lg:mt-0 grow">
            <div className="border-2 border-black rounded p-4 flex flex-col gap-4 mb-2">
              <div className="flex flex-row gap-4">
                <h1 className="text-xl font-medium">My Cart</h1>
                <div className="w-[30px] h-[30px] rounded-full bg-red-500 flex justify-center items-center">
                  <p className="font-medium">2</p>
                </div>
              </div>

              <hr className="border-black" />

              <div className="flex flex-row gap-2">
                <input
                  type="checkbox"
                  name="choose"
                  id="choose"
                  className="w-[24px] h-[24px]"
                />
                <p className="text-lg font-normal">Choose all items</p>
              </div>

              <hr className="border-black" />

              <div className="flex flex-col gap-6">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex flex-col gap-4">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      className="w-[18px] h-[18px]"
                    />
                    <div className="flex flex-row gap-4">
                      <Image
                        src="/assets/laptop.jpg"
                        width={200}
                        height={200}
                        alt="Logo"
                        className="w-[100px] h-[100px] object-cover md:w-[200px] md:h-[200px] rounded"
                      />
                      <div className="flex flex-col w-full gap-6">
                        <span className="max-w-[250px] font-medium md:max-w-[500px]">
                          {item.productName}
                        </span>
                        <p className="text-2xl font-medium">${item.price}</p>
                        <div className="flex flex-row gap-2 items-center">
                          <button className=" bg-black text-white w-[32px] h-[32px] text-center align-middle rounded-full text-xl font-medium">
                            -
                          </button>
                          <div className="w-[60px] h-[40px] border-2 border-black flex items-center justify-center">
                            {item.quantity}
                          </div>
                          <button className=" bg-black text-white w-[32px] h-[32px] text-center align-middle rounded-full text-xl font-medium">
                            +
                          </button>
                        </div>

                        <button className="bg-black flex justify-center p-3 rounded md:max-w-[300px]">
                          <div className="flex flex-row gap-2 items-center">
                            <Image
                              src="/assets/trash.png"
                              width={30}
                              height={30}
                              alt="Logo"
                              className="w-[24px] h-[24px]"
                            />
                            <p className="text-white text-xl">Remove</p>
                          </div>
                        </button>
                      </div>
                    </div>
                    <hr />
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AddToCart;
