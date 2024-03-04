import React from "react";
import ConfigurationSelector from "../components/ConfigurationSelector";
import DisplayImage from "../components/DisplayImage";
import AddToCartButton from "../components/AddToCartButton";
import BuyNowButton from "../components/BuyNowButton";
import Link from "next/link";


const ProductPage = ({ item, user }) => {
  const slides = item.images;

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
       
        <div className="flex flex-col gap-6 p-4 lg:flex-row lg:gap-4">
          <DisplayImage slides={slides} />

          <hr />

          <div className="flex flex-col gap-2 w-full">
            <h1 className="font-medium text-sm lg:text-lg">{item.brand}</h1>
            <h1 className="font-medium text-xl max-w-full md:max-w-full lg:text-3xl lg:max-w-full">
              {item.description}
            </h1>
            {/* <p className="mt-4">
              ✩✩✩✩✩ (0){" "}
              <span className="text-purple-900 underline ml-4">
                Write a review
              </span>
            </p> */}


            {
              item.configuration_available === "yes" ? <div>
              <p className="text-xl font-medium mt-5">Select Variant</p>
              <ConfigurationSelector config={item} />
              </div>:""

            }



            <hr />

            <div className="flex flex-col gap-2">
              {(item.quantity === 0) ? <p className="text-red-400 lg:text-xl font-medium">Out of Stock</p> : (item.quantity >= 5) ? <p className="text-green-500 font-medium text-xl">In Stock</p> : <p className="text-red-500 font-medium text-xl">Only {item.quantity} left in stock, hurry up!</p>}
              <div>
              <p className="text-red-400 lg:text-2xl">
                -{item.discount_percentage}%
              </p>
              <p className="text-3xl lg:text-4xl">{formatCurrency(item.discountedPrice)}</p>
              <p className="line-through lg:text-xl">{formatCurrency(item.mrp)}</p>
              </div>
            </div>

            <div className="flex flex-col gap-5 justify-start items-start">
              <Link className="flex flex-row justify-center items-center w-full xl:max-w-md"
                href={{
                  pathname: "/checkout",
                  query: {
                    orderSummary: JSON.stringify([{
                      userId: user,
                      productId: item._id,
                      productBrand: item.brand,
                      productName: item.name,
                      productPrice: item.discountedPrice,
                      quantity:1
                    }]),
                  },
                }}
              >
              <BuyNowButton />
              </Link>

              <AddToCartButton product={item} />
            </div>
          </div>
        </div>
        <hr />

        <div className="m-4">
          <h1 className="text-3xl font-medium">Features</h1>
          <ol className=" list-disc p-4">
            {item.features.map((feature, index) => (
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
                {Object.keys(item.specifications).map((key) => (
                  <tr key={key}>
                    <td className="py-4 px-4 font-medium">{key}</td>
                    <td className="py-4 px-4 font-light">
                      {item.specifications[key]}
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
