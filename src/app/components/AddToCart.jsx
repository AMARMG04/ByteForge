"use client";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const AddToCart = ({ data }) => {
  const [cartEmpty, setCartEmpty] = useState(false);

  const cartItems = data.cart_items;

  useEffect(() => {
    if (data.cart_items.length === 0) {
      setCartEmpty(true);
    }
  }, []);

  const userId = data.cart_items.userId;

  // const router = useRouter();

  const [localCartItems, setLocalCartItems] = useState(cartItems);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      const response = await fetch("/api/cart/updateQuantity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, newQuantity, userId }),
      });

      if (response.ok) {
        // Optimistic Rendering: Update local state immediately
        const updatedCartItems = cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
        setLocalCartItems(updatedCartItems);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteQuantity = async (productId) => {
    try {
      const response = await fetch("/api/cart/deleteQuantity", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      console.log(response);

      if (response.status === 200) {
        toast.success("Product removed from the cart", {
          position: "bottom-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        const updatedCartItems = localCartItems.filter(
          (item) => item._id !== productId
        );
        setLocalCartItems(updatedCartItems);
      } else {
        console.error("Failed to delete quantity");
      }
    } catch (error) {
      console.error("Error deleting quantity:", error);
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

  const calculateTotal = () => {
    return localCartItems.reduce((total, item) => {
      return total + item.quantity * item.productPrice;
    }, 0);
  };

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
                  <Link
                    href={{
                      pathname: "/checkout", // Your checkout page path
                      query: {
                        userId: localCartItems[0]?.userId || userId,
                        orderSummary: JSON.stringify(localCartItems),
                        total: calculateTotal(),
                      },
                    }}
                  >
                    <button className=" bg-indigo-500 text-white px-20 py-4 rounded text-lg font-medium hover:scale-105 transition duration-200">
                      Place Order
                    </button>
                  </Link>
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
                <div className="flex flex-row gap-2 items-center">
                  <h1 className="text-xl font-medium">My Cart</h1>
                  <div className="w-[30px] h-[30px] rounded-full bg-red-500 text-white flex justify-center items-center">
                    <p className="font-medium">{localCartItems.length}</p>
                  </div>
                </div>

                <hr className="border-black" />

                <div className="flex flex-col gap-6">
                  {localCartItems.map((item, index) => (
                    <div key={index} className="flex flex-col gap-4">
                      <div className="flex flex-row gap-4">
                        <Image
                          src={item.productImage}
                          width={200}
                          height={200}
                          alt="Logo"
                          className="object-scale-down p-10 rounded"
                        />
                        <div className="flex flex-col w-full gap-4">
                          <div>
                            <p>{item.productBrand}</p>
                            <span className="max-w-[250px] font-medium md:max-w-[500px]">
                              {item.productName}
                            </span>
                          </div>
                          <p className="text-2xl font-medium">
                            {formatCurrency(item.productPrice)}
                          </p>
                          <div className="flex flex-row gap-2 items-center">
                            <button
                              className=" bg-black text-white w-[32px] h-[32px] text-center align-middle rounded-full text-xl font-medium"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity - 1
                                )
                              }
                            >
                              -
                            </button>
                            <div className="w-[60px] h-[40px] border-2 border-black flex items-center justify-center">
                              {
                                localCartItems.find(
                                  (cartItem) =>
                                    cartItem.productId === item.productId
                                )?.quantity
                              }
                            </div>
                            <button
                              className=" bg-black text-white w-[32px] h-[32px] text-center align-middle rounded-full text-xl font-medium"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.quantity + 1
                                )
                              }
                            >
                              +
                            </button>
                          </div>

                          <button
                            className="bg-black flex justify-center py-3 rounded-full hover:scale-105 transition duration-200 md:max-w-[300px]"
                            onClick={() => deleteQuantity(item._id)}
                          >
                            <div className="flex flex-row gap-2 items-center ">
                              <Image
                                src={"/assets/trash.png"}
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
