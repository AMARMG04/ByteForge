"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

const slides = [
  "/assets/Laptop.png",
  "/assets/CPU.jpg",
  "/assets/CPU2.jpg",
];

const Carousel = () => {
  const [current, setCurrent] = useState(0);
  const prev = () => setCurrent((current) => current === 0 ? slides.length - 1 : current-1);
  const next = () => setCurrent((current) => current === slides.length - 1 ? 0 : current+1);

  useEffect(()=>{
      const slideInterval = setInterval(next, 5000)
      return () => clearInterval(slideInterval)
  },[])
  return (
    <>
      <div className="overflow-hidden relative">
        <div className="flex max-h-96 md:w-full lg:max-h-[600px]">
            <Image
              src={slides[current]}
              width={1000}
              height={500}
              alt="Slides"
              className='object-cover rounded-[10px] ease-in lg:w-[3000px]'
            />

        </div>
        <div className="absolute inset-0 flex flex-row justify-between px-4">
          <button onClick={prev}>
          <Image
            src="/assets/arrow.svg"
            width={40}
            height={40}
            alt="arrow left"
            className="rotate-180 shadow-xl rounded-full"
          />
          </button>
          <button onClick={next}>
          <Image
            src="/assets/arrow.svg"
            width={40}
            height={40}
            alt="arrow right"
            className="shadow-xl rounded-full"
          />
          </button>
        </div>

        <div className="absolute bottom-4 right-0 left-0">
          <div className="flex items-center justify-center gap-2">
              {slides.map((_,i)=>(
                <div key = {i} className={
                  `transition-all w-3 h-3 bg-white rounded-full ${current===i ? "p-1" : "bg-opacity-50"}`
                }></div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
