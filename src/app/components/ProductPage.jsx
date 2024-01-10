import React from "react";
import Image from "next/image";
import ConfigurationSelector from "../components/ConfigurationSelector";

const ProductPage = () => {
  const slides = [
    "/assets/Laptop.jpg",
    "/assets/CPU.jpg",
    "/assets/CPU2.jpg",
    "/assets/Processor.jpg",
    "/assets/Processor.jpg",
  ];

  return (
    <div>
      <div>
          <div className="flex justify-end p-4">
            <Image
              src="/assets/share.png"
              width={150}
              height={150}
              alt="Logo"
              className="w-[32px] h-[32px]"
            />
          </div>
        <div className="flex flex-col gap-6 p-4 lg:flex-row lg:gap-4">

          <div className="flex flex-row gap-6 lg:w-full">
            <div className="flex flex-col gap-6">
              {slides.map((slide, index) => (
                <div key={index} className="">
                  <Image
                    src={slide}
                    width={100}
                    height={100}
                    className="w-[58px] h-[58px] rounded-lg object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="md:mx-auto lg:mx-0">
              <Image
                src="/assets/laptop.jpg"
                width={500}
                height={500}
                alt="Logo"
                className="w-full h-96 rounded-lg lg:h-2/3 xl:h-full"
              />
            </div>
          </div>

          <hr />

          <div className="flex flex-col gap-1">
            <h1 className="font-medium text-sm lg:text-lg">SAMSUNG</h1>
            <h1 className="font-medium text-xl max-w-full md:max-w-full lg:text-3xl lg:max-w-full">
              Galaxy Book3 Pro, 16” 32GB RAM 1TB SSD, 13th Gen Intel core i7 -
              1360p processor, 3k oled screen, 120hz, 2023 model, graphite
            </h1>
            <p className="mt-4">
              ✩✩✩✩✩ (0){" "}
              <span className="text-purple-900 underline ml-4">
                Write a review
              </span>
            </p>

            <ConfigurationSelector />

            <hr />

            <div className="">
              <p className="text-red-400 lg:text-2xl">-15%</p>
              <p className="text-3xl lg:text-4xl">$2,25,000/-</p>
              <p className="line-through lg:text-xl">MRP:$2,50,000/-</p>
            </div>

            <div className="flex flex-col gap-5">
            <button className=" flex flex-row justify-center items-center h-12 w-full lg:h-16 bg-violet-300 rounded-md">
              <Image
                src="/assets/black-buy.png"
                width={30}
                height={30}
                alt="Buy"
                className="w-[32px] h-[32px] mr-2"
              />
              <p className="font-medium">Buy Now</p>
            </button>
            <button className=" flex flex-row justify-center items-center h-12 w-full lg:h-16 bg-black rounded-md">
              <Image
                src="/assets/cart.png"
                width={30}
                height={30}
                alt="Cart"
                className="w-[32px] h-[32px] mr-2"
              />
              <p className="font-medium text-white">Add to cart</p>
            </button>
            </div>
          </div>
        </div>
        <hr />

        <div className="m-4">
          <h1 className="text-3xl font-medium">Features</h1>
          <ol className=" list-disc p-4">
            <li className="">
              CAREER ACCELERATING SPEED: Strivers and thrivers, this is the PC
              laptop for you; Accomplish your ambitions with a powerful
              processor that’s the latest design by Intel — ideal for fast-paced
              lifestyles
            </li>
            <li>
              CAREER ACCELERATING SPEED: Strivers and thrivers, this is the PC
              laptop for you; Accomplish your ambitions with a powerful
              processor that’s the latest design by Intel — ideal for fast-paced
              lifestyles
            </li>
            <li>
              CAREER ACCELERATING SPEED: Strivers and thrivers, this is the PC
              laptop for you; Accomplish your ambitions with a powerful
              processor that’s the latest design by Intel — ideal for fast-paced
              lifestyles
            </li>
          </ol>
        </div>

        <hr />

        <div className="m-4">
          <h1 className="text-3xl font-medium">Specifications</h1>
          <div className="overflow-x-auto py-2">
            <table className="w-full bg-black text-white rounded-2xl">
              {/* <thead>
                  <tr>
                    <th className="py-2 px-4">Specification</th>
                    <th className="py-2 px-4">Details</th>
                  </tr>
                </thead> */}
              <tbody>
                <tr>
                  <td className="py-2 px-4">Color</td>
                  <td className="py-2 px-4">Black</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Storage</td>
                  <td className="py-2 px-4">256GB</td>
                </tr>
                <tr>
                  <td className="py-2 px-4">Capacity</td>
                  <td className="py-2 px-4">1TB</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
