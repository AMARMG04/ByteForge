// "use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

const FrequentlyBought = ({ mostFB }) => {
  const slides = [
    "/assets/Laptop.jpg",
    "/assets/CPU.jpg",
    "/assets/CPU2.jpg",
    "/assets/Processor.jpg",
  ];

  return (
    <div className="flex flex-col lg:flex-row lg:flex-wrap lg:max-w-2xl lg:mx-auto lg:gap-10 xl:max-w-full">
      {mostFB.map((product, index) => (
        <div
          key={index}
          className="mx-auto flex flex-col my-10 items-center justify-center shadow-2xl rounded-3xl max-w-xs w-[310px] h-[450px] hover:scale-105 duration-200"
        >
          <Link href={`/products/${product.category}/${product.name}`} className="flex flex-col items-center justify-around h-full w-full">
            <Image
              src={product.image}
              width={200}
              height={200}
              alt={product.name}
              className="rounded-t-3xl object-contain border-gray-700 basis-1/2"
            />
            <hr  className="border border-black w-full"/>
            <div className="flex flex-col basis-1/2 py-4">
              <h1 className="font-medium mt-4 px-3 text-xl">
                {product.brand + " " + product.name}
              </h1>
              <p className="text-3xl my-4">₹{product.mrp}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FrequentlyBought;
