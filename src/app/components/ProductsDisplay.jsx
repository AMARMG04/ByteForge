"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ProductsDisplay = () => {
  const slides = [
    "/assets/Laptop.jpg",
    "/assets/CPU.jpg",
    "/assets/CPU2.jpg",
    "/assets/Processor.jpg",
  ];

  const filterData = [
    {
      category: "Brand",
      options: ["Samsung", "Apple", "Dell", "HP", "Lenovo"],
    },
    {
      category: "Display Type",
      options: ["LED", "LCD", "OLED", "IPS", "TN"],
    },
    {
      category: "Resolution",
      options: ["1080p", "1440p", "4k"],
    },
  ];

  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCheckboxChange = (category, option) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };
      if (!updatedFilters[category]) {
        updatedFilters[category] = [];
      }

      const index = updatedFilters[category].indexOf(option);

      if (index === -1) {
        // Option not selected, add it
        updatedFilters[category] = [...updatedFilters[category], option];
      } else {
        // Option already selected, remove it
        updatedFilters[category] = updatedFilters[category].filter(
          (item) => item !== option
        );
      }

      return updatedFilters;
    });
  };

  return (
    <>
      <div className="mx-2 flex flex-col gap-6 mt-10">
        <div className="flex flex-row gap-2 lg:hidden">
          <Image
            src="/assets/filter.png"
            width={30}
            height={30}
            alt="Filter"
            onClick={toggleFilters}
            style={{ cursor: "pointer" }}
            className="w-[24px] h-[24px]"
          />
          <h3 className="text-xl font-medium">Filters</h3>
        </div>
        {showFilters && (
          <div className="z-10 fixed top-[120px] left-0 right-0 bottom-0 bg-white overflow-y-auto max-h-[calc(100vh-120px)]">
            <div className="flex flex-row justify-between mx-6 mt-8">
              <div className="flex flex-row gap-2 items-center">
                <Image
                  src="/assets/filter.png"
                  width={30}
                  height={30}
                  alt="Filter"
                  className="w-[24px] h-[24px]"
                />
                <h1 className="font-medium text-xl">Filters</h1>
              </div>
              <button
                onClick={toggleFilters}
                className="rounded-sm h-8 w-[70px] bg-black font-medium text-white"
              >
                Done
              </button>
            </div>
            <hr className="my-4" />
            <div className="mx-6">
              {filterData.map((category, index) => (
                <div key={index} className="mb-6">
                  <h4 className="font-medium text-xl mb-2">
                    {category.category}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {category.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`checkbox-${index}-${optionIndex}`}
                          checked={
                            selectedFilters[category.category] &&
                            selectedFilters[category.category].includes(option)
                          }
                          onChange={() =>
                            handleCheckboxChange(category.category, option)
                          }
                          className="mr-2 h-5 w-5 border rounded border-gray-700 checked:bg-transparent checked:border-gray-600 focus:outline-none focus:border-gray-600 focus:ring focus:ring-gray-300"
                        />
                        <label htmlFor={`checkbox-${index}-${optionIndex}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="lg:flex lg:flex-row lg:gap-10">
          <div className="hidden lg:flex border-2 rounded-md border-black w-72 h-fit">
            <div className="mx-6">
              <h1 className="text-2xl my-4 font-semibold">Filters</h1>
              {filterData.map((category, index) => (
                <div key={index} className="mb-6">
                  <h4 className="font-medium text-xl mb-2">
                    {category.category}
                  </h4>
                  <div className="flex flex-col gap-2">
                    {category.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center">
                        <input
                          type="checkbox"
                          id={`checkbox-${index}-${optionIndex}`}
                          checked={
                            selectedFilters[category.category] &&
                            selectedFilters[category.category].includes(option)
                          }
                          onChange={() =>
                            handleCheckboxChange(category.category, option)
                          }
                          className="mr-2 h-5 w-5 border rounded border-gray-700 checked:bg-transparent checked:border-gray-600 focus:outline-none focus:border-gray-600 focus:ring focus:ring-gray-300"
                        />
                        <label htmlFor={`checkbox-${index}-${optionIndex}`}>
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-10  my-10 lg:w-full">
            <h1 className="text-2xl font-semibold">Products(10)</h1>
            {slides.map((slide, index) => (
              <div
                key={index}
                className="flex flex-row gap-4 shadow-2xl rounded-[10px] lg:gap-10 max-h-[400px]"
              >
                <Image
                  src={slide}
                  width={100}
                  height={100}
                  className="w-[155px] rounded-l-[10px] object-cover md:w-2/5 lg:w-2/6"
                />
                <div className="flex flex-col gap-4 my-4">
                  <div className="">
                    <h1 className="font-medium text-sm lg:text-lg ">SAMSUNG</h1>
                    <Link href="/product">
                      <h1 className="font-medium text-xl max-w-[200px] md:max-w-md lg:text-3xl lg:max-w-full">
                        Galaxy Book3 Pro, 16” 32GB RAM 1TB SSD
                      </h1>
                    </Link>
                  </div>
                  <div>
                    <p className="text-red-400 lg:text-2xl">-15%</p>
                    <p className="text-3xl lg:text-4xl">$2,25,000/-</p>
                    <p className="line-through lg:text-xl">MRP:$2,50,000/-</p>
                  </div>
                  <button className=" flex flex-row justify-center items-center h-12 w-44 md:h-14 md:w-72 lg:w-2/3 lg:h-16 bg-violet-300 rounded-md">
                    <Image
                      src="/assets/black-buy.png"
                      width={30}
                      height={30}
                      alt="Buy"
                      className="w-[32px] h-[32px] mr-2"
                    />
                    <p className="font-medium">Buy Now</p>
                  </button>
                  <button className=" flex flex-row justify-center items-center h-12 w-44 md:h-14 md:w-72 lg:w-2/3 lg:h-16 bg-black rounded-md">
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
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsDisplay;
