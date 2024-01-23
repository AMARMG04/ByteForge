"use client"
import React, { useState, useEffect } from 'react'
import AddToCart from '../components/AddToCart'
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../firebase/config";



const getData = async (userId: string) => {
  const res = await fetch("http://localhost:3000/api/cart", {
    method: "POST",
    body: JSON.stringify({
      userID: userId,
    }),
  });

  const result = await res.json();
  return result;
}

const page = async () => {
  const [userId, setUserId] = useState("");
  const [cartData, setCartData] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async(user) => {
      if (user) {
        setUserId(user.uid);
        const data = await getData(user.uid);
        setCartData(data);
      } else {
        setUserId("");
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <div>
        {cartData ? (
        <AddToCart data={cartData} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default page
