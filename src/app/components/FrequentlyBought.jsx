// "use client";
import React from "react";
import Image from "next/image";

const FrequentlyBought = ({mostFB}) => {
  const slides = [
    "/assets/Laptop.jpg",
    "/assets/CPU.jpg",
    "/assets/CPU2.jpg",
    "/assets/Processor.jpg",
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap lg:max-w-2xl lg:mx-auto lg:gap-10 xl:max-w-full">
      {mostFB.map((product, index) => (
        <div key = {index} className="mx-auto flex flex-col my-10 items-center shadow-xl rounded-3xl max-w-xs h-[400px] border-2 border-gray-300">
          <Image src={product.image} width={100} height={100} className="w-[316px] h-[300px] rounded-t-3xl object-scale-down border-b-2 border-gray-300"/>
          <h1 className="font-medium mt-4 text-xl">{product.brand + " " + product.name}</h1>
          <p className="text-3xl my-4">₹{product.mrp}</p>
        </div>
      ))}
    </div>
  );
};

export default FrequentlyBought;
