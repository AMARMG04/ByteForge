"use client"
import React, {useState} from "react";
import Image from "next/image";

const DisplayImage = ({ slides }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const handleImageClick = (index) => {
        setSelectedImageIndex(index);
      };
  return (
    <div className="flex flex-row gap-6 lg:w-full">
      <div className="flex flex-col gap-6">
        {slides &&
          slides.map((slide, index) => (
            <div key={index} className="" onClick={() => handleImageClick(index)} style={{cursor: "pointer"}}>
              <Image
                src={slide}
                width={100}
                height={100}
                alt='product images'
                className={`w-[58px] h-[58px] rounded-lg object-cover border-2 border-gray-300 ${
                    selectedImageIndex === index ? "border-red-900" : ""
                  }`}
              />
            </div>
          ))}
      </div>
      <div className="relative md:mx-auto lg:mx-0 w-full">
        <Image
          src={slides[selectedImageIndex]}
          alt="Logo"
          fill
          sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 400px"
          className="object-scale-down"
        />
      </div>
    </div>
  );
};

export default DisplayImage;
