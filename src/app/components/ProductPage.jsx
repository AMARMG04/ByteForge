import React from "react";
import Image from "next/image";
import ConfigurationSelector from "../components/ConfigurationSelector";
import DisplayImage from "../components/DisplayImage";
import AddToCartButton from "../components/AddToCartButton";
import BuyNowButton from "../components/BuyNowButton";
import Link from "next/link";
import { format } from "path";

const ProductPage = ({ item }) => {
  const slides = item[0].images;

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
          <DisplayImage slides={slides} />

          <hr />

          <div className="flex flex-col gap-2 w-full">
            <h1 className="font-medium text-sm lg:text-lg">{item[0].brand}</h1>
            <h1 className="font-medium text-xl max-w-full md:max-w-full lg:text-3xl lg:max-w-full">
              {item[0].description}
            </h1>
            {/* <p className="mt-4">
              ✩✩✩✩✩ (0){" "}
              <span className="text-purple-900 underline ml-4">
                Write a review
              </span>
            </p> */}


            {
              item[0].configuration_available === "yes" ? <div>
              <p className="text-xl font-medium mt-5">Select Variant</p>
              <ConfigurationSelector config={item[0]} />
              </div>:""

            }



            <hr />

            <div className="">
              <p className="text-red-400 lg:text-2xl">
                -{item[0].discount_percentage}%
              </p>
              {/* <p className="text-3xl lg:text-4xl">₹{item[0].mrp}/-</p> */}
              <p className="text-3xl lg:text-4xl">{formatCurrency(item[0].discountedPrice)}</p>
              <p className="line-through lg:text-xl">{formatCurrency(item[0].mrp)}</p>
            </div>

            <div className="flex flex-col gap-5 justify-start items-start">
              <Link className="flex flex-row justify-center items-center w-full xl:max-w-md"
                href={{
                  pathname: "/checkout",
                  query: {
                    orderSummary: JSON.stringify(
                      {
                        productName: item[0].name,
                        quantity: 1,
                        productPrice: item[0].mrp,
                      },
                    ),
                  },
                }}
              >
              <BuyNowButton />
              </Link>

              <AddToCartButton product={item[0]} />
            </div>
          </div>
        </div>
        <hr />

        <div className="m-4">
          <h1 className="text-3xl font-medium">Features</h1>
          <ol className=" list-disc p-4">
            {item[0].features.map((feature, index) => (
              <li key={index} className="text-lg">
                {feature}
              </li>
            ))}
          </ol>
        </div>

        <hr />

        <div className="m-4">
          <h1 className="text-3xl font-medium">Specifications</h1>
          <div className="overflow-x-auto py-2">
            <table className="w-full bg-black text-white rounded-2xl">
              <tbody className="">
                {Object.keys(item[0].specifications).map((key) => (
                  <tr key={key}>
                    <td className="py-4 px-4 font-medium">{key}</td>
                    <td className="py-4 px-4 font-light">
                      {item[0].specifications[key]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
