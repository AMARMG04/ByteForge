"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import AddToCartButton from "./AddToCartButton";
import BuyNowButton from "./BuyNowButton";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../firebase/config";

const ProductsDisplay = ({ monitors, filters }) => {
  const filteredData = filters.options;
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const [showFilters, setShowFilters] = useState(false);

  const [selectedFilters, setSelectedFilters] = useState({});

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

    return formattedAmount.replace("₹", "Rs.");
  };

  // Function to toggle a filter
  const toggleFilter = (category, option) => {
    setSelectedFilters((prevFilters) => {
      const newFilters = { ...prevFilters };

      // Toggle the selected option for the given category
      if (newFilters[category]) {
        if (newFilters[category].includes(option)) {
          newFilters[category] = newFilters[category].filter(
            (item) => item !== option
          );
        } else {
          newFilters[category] = [...newFilters[category], option];
        }
      } else {
        newFilters[category] = [option];
      }

      return newFilters;
    });
  };

  // Function to check if a product matches the selected filters
  const isProductFiltered = (product) => {
    for (const [category, options] of Object.entries(selectedFilters)) {
      if (
        category === "Brand" &&
        options.length > 0 &&
        !options.includes(product[category.toLowerCase()])
      ) {
        return false;
      } else if (category !== "Brand" && options.length > 0) {
        // Check if the category is inside the specifications object
        if (!product.specifications || !product.specifications[category]) {
          return false;
        }

        // Check if any of the selected options match the product's category
        const productOptions = product.specifications[category];
        if (
          !options.some((selectedOption) =>
            productOptions.includes(selectedOption)
          )
        ) {
          return false;
        }
      }
    }
    return true;
  };

  const filteredMonitors = monitors.filter(isProductFiltered);

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };
  return (
    <>
      <div className="mx-2 flex flex-col gap-6 mt-10">
        <div className="flex flex-row gap-2 lg:hidden" onClick={toggleFilters}>
          <Image
            src="/assets/filter.png"
            width={30}
            height={30}
            alt="Filter"
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
              {Object.entries(filteredData).map(
                ([category, options], index) => (
                  <div key={index} className="mb-6">
                    <h4 className="font-medium text-xl mb-2">{category}</h4>
                    <div className="flex flex-col gap-2">
                      {options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`checkbox-${index}-${optionIndex}`}
                            onChange={() => toggleFilter(category, option)}
                            checked={selectedFilters[category]?.includes(
                              option
                            )}
                            className="mr-2 h-5 w-5 border rounded border-gray-700 checked:bg-transparent checked:border-gray-600 focus:outline-none focus:border-gray-600 focus:ring focus:ring-gray-300"
                          />
                          <label htmlFor={`checkbox-${index}-${optionIndex}`}>
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}
        <div className="lg:flex lg:flex-row lg:gap-10">
          <div className="hidden lg:flex border-2 rounded-md border-black w-72 h-fit">
            <div className="mx-6">
              <h1 className="text-2xl my-4 font-semibold">Filters</h1>
              {Object.entries(filteredData).map(
                ([category, options], index) => (
                  <div key={index} className="mb-6">
                    <h4 className="font-medium text-xl mb-2">{category}</h4>
                    <div className="flex flex-col gap-2">
                      {options.map((option, optionIndex) => (
                        <div key={optionIndex} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`checkbox-${index}-${optionIndex}`}
                            onChange={() => toggleFilter(category, option)}
                            checked={selectedFilters[category]?.includes(
                              option
                            )}
                            className="mr-2 h-5 w-5 border rounded border-gray-700 checked:bg-transparent checked:border-gray-600 focus:outline-none focus:border-gray-600 focus:ring focus:ring-gray-300"
                          />
                          <label htmlFor={`checkbox-${index}-${optionIndex}`}>
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
          <div className="flex flex-col gap-10 my-10 lg:w-full">
            <h1 className="text-2xl font-semibold">
              Products({filteredMonitors.length})
            </h1>
            {filteredMonitors.map((monitor, index) => (
              <div
                key={index}
                className="flex flex-row gap-4 shadow-[0_5px_60px_-15px_rgba(0,0,0,0.3)] rounded-[10px] lg:gap-10 max-h-[400px] lg:max-w-[1100px]"
              >
                <div
                  className="relative basis-1/3"
                  style={{ position: "relative" }}
                >
                  {/* <Link
                    href={{
                      pathname: `/products/monitors/${monitor.name}`, // Your checkout page path
                      query: {
                        productDetails: JSON.stringify(monitor),
                        userId: userId,
                      },
                    }}
                  > */}
                  <Link href={`/products/monitors/${monitor.name}`}>
                    <Image
                      src={monitor.images[0]}
                      sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 400px"
                      fill
                      alt="Product Image"
                      className="rounded-l-[10px] border-r-2 border-gray-300 object-contain p-4 md:p-10"
                    />
                  </Link>
                </div>

                <div className="flex flex-col gap-2 my-4 basis-2/3 pr-4 pb-2">
                  <div className="">
                    <h1 className="font-medium text-sm lg:text-lg ">
                      {monitor.brand}
                    </h1>
                    {/* <Link
                      href={{
                        pathname: `/products/monitors/${monitor.name}`, // Your checkout page path
                        query: {
                          productDetails: JSON.stringify(monitor),
                          userId: userId,
                        },
                      }}
                    > */}
                    <Link href={`/products/monitors/${monitor.name}`}>
                      <h1 className="font-medium text-xl max-w-[200px] md:max-w-md lg:text-2xl lg:max-w-full">
                        {monitor.name}
                      </h1>
                    </Link>
                  </div>
                  <div>
                    <p className="text-red-400 lg:text-2xl">
                      -{monitor.discount_percentage}%
                    </p>
                    <p className="text-2xl font-medium lg:text-4xl">
                      {formatCurrency(monitor.discountedPrice)}
                    </p>
                    <p className="line-through font-medium lg:text-xl">
                      {formatCurrency(monitor.mrp)}/-
                    </p>
                  </div>
                  <div className="w-full flex flex-col gap-3">
                    <Link
                      href={{
                        pathname: "/checkout", // Your checkout page path
                        query: {
                          orderSummary: JSON.stringify([
                            {
                              userId: userId,
                              productId: monitor._id,
                              productBrand: monitor.brand,
                              productName: monitor.name,
                              productPrice: monitor.discountedPrice,
                              quantity: 1,
                            },
                          ]),
                        },
                      }}
                    >
                      <BuyNowButton />
                    </Link>

                    <AddToCartButton product={monitor} />
                  </div>
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
