"use client";

import React, { useEffect } from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Form from '../components/Form'
import {getAuth, onAuthStateChanged} from 'firebase/auth'
import { app } from '../firebase/config';
import { useRouter } from 'next/navigation'


const Login = () => {
  const router = useRouter();
  const auth = getAuth(app);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => { 
      if (user) {
        router.push('/')
      }
    })
  }, [auth, router]);

  return (
    <>
      <Navbar />
      <div className='lg:flex lg:flex-col lg:items-center lg:justify-center lg:mt-44'>
        <div className='m-2 lg:w-1/3'>
        <Form />
        </div>
      </div>
    </>
  )
}

export default Login
