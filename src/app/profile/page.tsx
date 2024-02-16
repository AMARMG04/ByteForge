"use client"

import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { app } from "../firebase/config";

const page = () => {

    const [userId, setUserId] = useState("");

    useEffect(() => {
        const auth = getAuth(app);
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) {
            setUserId(user.uid);
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
        <Navbar />
        <div className='lg:flex lg:flex-col lg:justify-center lg:items-center'>
            <h1 className='text-3xl font-medium m-4'>Your Account</h1>
            <div className='m-4 flex flex-col gap-4 lg:flex-row lg:justify-center lg:w-[800px]'>
                <Link href={`/profile/personal_details?userId=${userId}`}>
                    <div className='flex flex-col items-center justify-center h-28 bg-white text-black shadow-lg border-4 border-gray-500 text-xl font-medium rounded-md lg:w-[400px]'>
                        <h1>Personal Details</h1>
                    </div>
                </Link>
                <div className='flex flex-col items-center justify-center h-28 bg-white text-black shadow-lg border-4 border-gray-500 text-xl font-medium rounded-md lg:w-[400px]'>
                    <h1>Order History</h1>
                </div>
            </div>

        </div>
    </div>
  )
}

export default page
