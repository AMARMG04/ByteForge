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
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     setLoggedIn(true);
  //   }
  // });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    // Cleanup function to unsubscribe from onAuthStateChanged
    return () => unsubscribe();
  }, [auth]);

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
    <div className=" max-w-screen-2xl bg-black h-32 lg:h-[100px] xl:max-w-full">
      <div className="w-full flex flex-col gap-4 mx-auto">
        <div className="flex flex-row justify-between mt-6 mx-2 z-10 lg:items-center lg:mt-8 lg:justify-between">
          <Image
            src="/assets/menu.png"
            width={30}
            height={30}
            alt="Menu"
            onClick={handleNav}
            className=" w-[24px] h-[24px] lg:hidden"
          />
          <div className="flex flex-row items-center gap-20">
            <Link href="/">
              <Image
                src="/assets/logo.svg"
                width={200}
                height={150}
                alt="Logo"
                className="ml-2"
              />
            </Link>

            <div className="hidden lg:flex">
              <ul className="flex flex-row gap-10 ">
                {menuLinks.map((link, index) => (
                  <li
                    key={index}
                    className="text-white font-medium hover:text-gray-500"
                  >
                    <Link href={link.url}>{link.text}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative items-center mx-2 hidden lg:flex">
              <Image
                src="/assets/search.png"
                width={28}
                height={28}
                alt="Menu"
                className="absolute ml-4"
              />

              <input
                type="text"
                className="lg:w-[200px] xl:w-[400px] h-11 pl-14 placeholder-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search for monitors, processors etc.."
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              {/* {isInputFocused && (
            <div
              className="z-10 fixed top-[120px] left-0 right-0 bottom-0 bg-white"
              onClick={handleInputBlur}
            ></div>
          )} */}
            </div>
          </div>

          <div
            className={
              navState
                ? "text-white z-10 absolute top-0 left-0 right-0 bottom-0 pt-8 w-full h-[100%] backdrop-blur-2xl bg-black/40 text-center ease-in duration-150"
                : "text-white z-10 absolute top-0 left-[-100%] right-0 bottom-0 pt-8 w-full h-screen backdrop-blur-2xl bg-black/40 text-center ease-in duration-150"
            }
          >
            <Image
              src="/assets/close.png"
              width={30}
              height={30}
              alt="close"
              onClick={handleNav}
              className=" w-[32px] h-[32px] ml-8 lg:hidden"
            />
            <div className="flex justify-center w-full">
              <ul>
                {menuLinks.map((link, index) => (
                  <Link href={link.url} key={index}>
                    <li
                      key={index}
                      className="text-white px-20 py-6 text-2xl shadow-sm shadow-violet-800 my-8 rounded-md md:px-44 md:py-20"
                    >
                      {link.text}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
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

            {loggedIn ? (
              <div>
                <Image
                  src="/assets/profile.png"
                  width={30}
                  height={30}
                  alt="profile"
                  className="ml-2 w-[24px] h-[24px] hover:cursor-pointer"
                  onClick={handleProfileClick}
                />

                <div
                  className={
                    showMenu
                      ? "absolute bottom-0 right-0 top-0 z-10 h-[100%] flex flex-col gap-4 text-white backdrop-blur-2xl bg-black/40 w-[300px] pr-4 pt-10 ease-in duration-200"
                      : "absolute bottom-0 right-[-100%] top-0 z-10 h-screen flex flex-col gap-4 text-white backdrop-blur-2xl bg-black/40 w-[300px] pr-4 pt-10 ease-in duration-200"
                  }
                >
                  <div className="flex flex-row items-end justify-end">
                    <Image
                      src="/assets/close_button.svg"
                      width={32}
                      height={32}
                      alt="profile"
                      className="mb-4 hover:cursor-pointer"
                      onClick={handleProfileClick}
                    />
                  </div>
                  <div className="flex flex-col gap-8 items-center">
                    <div className="flex flex-row gap-4 transform transition duration-300 hover:scale-110">
                      <Image
                        src="/assets/person.png"
                        width={36}
                        height={36}
                        alt="profile"
                        className=""
                        onClick={handleProfileClick}
                      />
                      <Link href="/profile" className="text-3xl">
                        <p className="text-left ">Profile</p>
                      </Link>
                    </div>

                    <div className="flex flex-row gap-4 transform transition duration-300 hover:scale-110">
                      <Image
                        src="/assets/cart.png"
                        width={36}
                        height={36}
                        alt="profile"
                        className=""
                        onClick={handleProfileClick}
                      />
                      <Link href="/orders" className="text-3xl">
                        <p className="text-left">Orders</p>
                      </Link>
                    </div>

                    <div className="flex flex-row gap-4 transform transition duration-300 hover:scale-110">
                      <Image
                        src="/assets/logout.png"
                        width={36}
                        height={36}
                        alt="profile"
                        className=""
                      />
                      <button
                        onClick={handleLogout}
                        className="text-3xl text-left"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/auth">
                <Image
                  src="/assets/profile.png"
                  width={30}
                  height={30}
                  alt="profile"
                  className="ml-2 w-[24px] h-[24px]"
                  onClick={handleProfileClick}
                />
              </Link>
            )}
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
            className="w-full h-11 pl-14 placeholder-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
