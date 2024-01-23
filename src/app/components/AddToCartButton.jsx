"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../firebase/config";


const addToCart = async (productId, productBrand, productName, productPrice, productImage, userId) => {

  const res = await fetch("/api/addToCart", {
    method: "POST",
    body: JSON.stringify({
        productID: productId,
        userID: userId,
        productBrand: productBrand,
        productName: productName,
        productPrice: productPrice,
        productImage: productImage,
    }),
  });

  const result = await res.json();
  if(result.status === 200) {
    return result.message;
  }

  return result.error;
};

const AddToCartButton = ({ product }) => {
  const [userId, setUserId] = useState(null);
  const productId=product._id;
  const productBrand = product.brand;
  const productName=product.name;
  const productPrice=product.mrp;
  const productImage=product.images[0];



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

  const handleButtonClick = async () => {
    if (userId) {
        const response = await addToCart(productId, productBrand, productName, productPrice, productImage, userId);
        console.log(response);
    } else {
      alert("Please login to add to cart");
    }
  }
  return (
    <button className=" flex flex-row justify-center items-center py-3 w-full lg:py-5 xl:max-w-lg bg-black rounded-md" onClick={handleButtonClick}>
      <Image
        src="/assets/cart.png"
        width={30}
        height={30}
        alt="Cart"
        className="w-[32px] h-[32px] mr-2"
      />
      <p className="font-medium text-white">Add to cart</p>
    </button>
  );
};

export default AddToCartButton;
