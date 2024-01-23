"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase/config";

const Navbar = () => {
  const auth = getAuth(app);
  const router = useRouter();

  const [showMenu, setShowMenu] = useState(false);

  const handleProfileClick = () => {
    setShowMenu(!showMenu);
  };

  const [loggedIn, setLoggedIn] = useState(false);
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setLoggedIn(true);
    }
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      setLoggedIn(false);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const menuLinks = [
    { text: "Monitors", url: "/products/monitors" },
    { text: "Processors", url: "/products/processors" },
    { text: "Motherboard", url: "/products/motherboard" },
    { text: "Accessories", url: "/products/accessories" },
    { text: "Audio", url: "/products/audio" },
  ];

  const [navState, setNavState] = useState(false);
  const [isInputFocused, setInputFocus] = useState(false);

  const handleNav = () => {
    setNavState(!navState);
  };

  useEffect(() => {
    const handleBodyOverflow = () => {
      document.body.style.overflow =
        navState || isInputFocused ? "hidden" : "auto";
    };

    handleBodyOverflow();

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [navState, isInputFocused]);

  const handleInputFocus = () => {
    setInputFocus(true);
  };

  const handleInputBlur = () => {
    setInputFocus(false);
  };

  return (
    <div className=" max-w-screen-2xl bg-[#100F0F] h-32 lg:h-[100px] xl:max-w-full">
      <div className="w-full flex flex-col gap-4 mx-auto">
        <div className="flex flex-row justify-between mt-6 mx-2 z-10 lg:items-center lg:mt-10 lg:justify-between">
          {navState ? (
            <Image
              src="/assets/close.png"
              width={30}
              height={30}
              alt="Menu"
              onClick={handleNav}
              className=" w-[24px] h-[24px] lg:hidden"
            />
          ) : (
            <Image
              src="/assets/menu.png"
              width={30}
              height={30}
              alt="Menu"
              onClick={handleNav}
              className=" w-[24px] h-[24px] lg:hidden"
            />
          )}
          <div className="flex flex-row gap-20">
            <Link href="/">
              <Image
                src="/assets/logo.svg"
                width={150}
                height={150}
                alt="Logo"
                className="ml-2"
              />
            </Link>

            <div className="hidden lg:flex">
              <ul className="flex flex-row gap-10 ">
                {menuLinks.map((link, index) => (
                  <li key={index} className="text-white hover:text-gray-500">
                    <Link href={link.url}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            className={
              navState
                ? "text-white z-10 absolute top-[60px] left-0 right-0 bottom-0 flex justify-center w-full h-[100%]  bg-[#100F0F] text-center ease-in duration-200"
                : "text-white z-10 absolute top-[60px] left-[-100%] right-0 bottom-0 flex justify-center w-full h-screen bg-[#100F0F] text-center ease-in duration-200"
            }
          >
            <ul>
              {menuLinks.map((link, index) => (
                <li
                  key={index}
                  className="px-20 py-6 text-2xl shadow-sm shadow-emerald-400 my-8 rounded-md md:px-44 md:py-20"
                >
                  <Link href={link.url}>{link.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-row">
            <Link href="/cart">
              <Image
                src="/assets/cart.png"
                width={30}
                height={30}
                alt="cart"
                className=" w-[24px] h-[24px]"
              />
            </Link>
            
            {
              loggedIn ? (
                <div>
                  <Image
                    src="/assets/profile.png"
                    width={30}
                    height={30}
                    alt="profile"
                    className="ml-2 w-[24px] h-[24px]"
                    onClick={handleProfileClick}
                  />
                  {showMenu ? (
                    <div className="absolute top-[100px] right-0 bg-white w-[200px] h-[150px] shadow-md rounded-sm flex flex-col justify-center items-center gap-2">
                      <div className="flex flex-row gap-2">
                        <Image
                          src="/assets/personal.png"
                          width={30}
                          height={30}
                          alt="profile"
                          className="ml-2 w-[24px] h-[24px]"
                          onClick={handleProfileClick}
                        />
                        <Link href='/profile' className="text-lg">
                          <p>Profile</p>
                        </Link>
                      </div>
                      <div className="w-full h-[1px] bg-black"></div>
                      <div className="flex flex-row gap-2">
                        <Image
                          src="/assets/orders.png"
                          width={30}
                          height={30}
                          alt="profile"
                          className="ml-2 w-[24px] h-[24px]"
                          onClick={handleProfileClick}
                        />
                        <Link href='/orders' className="text-lg">
                          <p>Orders</p>
                        </Link>
                      </div>
                      <div className="w-full h-[1px] bg-black"></div>
                      <div className="flex flex-row gap-2 justify-around items-center">
                      <Image
                          src="/assets/logout.png"
                          width={30}
                          height={30}
                          alt="profile"
                          className="w-[20px] h-[20px]"
                          onClick={handleProfileClick}
                        />
                        <button
                          onClick={handleLogout}
                          className="text-lg"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ) : (
                <Link href='/auth'>
                  <Image
                    src="/assets/profile.png"
                    width={30}
                    height={30}
                    alt="profile"
                    className="ml-2 w-[24px] h-[24px]"
                    onClick={handleProfileClick}
                  />
                </Link>
              )
            }

            
          </div>
        </div>
        <div className="relative flex items-center mx-2 lg:hidden">
          <Image
            src="/assets/search.png"
            width={28}
            height={28}
            alt="Menu"
            className="absolute ml-4"
          />

          <input
            type="text"
            className="w-full h-10 pl-14 placeholder-gray-600"
            placeholder="Search for monitors, processors etc.."
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          {isInputFocused && (
            <div
              className="z-10 fixed top-[120px] left-0 right-0 bottom-0 bg-white"
              onClick={handleInputBlur}
            ></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
