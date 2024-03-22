"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const BuyNowButton = () => {

  const router = useRouter();


  return (
    <button
      className=" flex flex-row justify-center items-center py-3 w-full lg:py-5 xl:max-w-sm bg-indigo-200 rounded-full hover:scale-105 duration-200"
    //   onClick={handleButtonClick}
    >
      <Image
        src="/assets/black-buy.png"
        width={30}
        height={30}
        alt="Buy"
        className="w-[32px] h-[32px] mr-2"
      />
      <p className="font-medium">Buy Now</p>
    </button>
  );
};

export default BuyNowButton;
