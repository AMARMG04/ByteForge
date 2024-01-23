"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "../firebase/config";

const Form = () => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isValidNumber, setIsValidNumber] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [uid, setUid] = useState(null);


  const auth = getAuth(app);
  const router = useRouter();

  useEffect(() => {
    window.RecaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "normal",
        callback: (response) => {},
        "expired-callback": () => {},
      }
    );
  }, [auth]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
        
      } else {
        setUid(null);
      }
    });

    return () => {
      unsubscribe(); // Unsubscribe from onAuthStateChanged when the component unmounts
    };
  }, [auth]);

  useEffect(() => {
    if (uid && isValidNumber) {

      const postData = {
        phoneNumber: mobileNumber,
        userID: uid,
      };

      fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      })
        .then((response) => {
          if (response.ok) {
            console.log("User data added to MongoDB");
          } else {
            console.error("Failed to add user data to MongoDB");
          }
        })
        .catch((error) => {
          console.error("API request error:", error);
        })
        .finally(() => {
          router.push("/"); // Move to the desired route
        });
    }
  }, [uid, mobileNumber, isValidNumber, router]);

  const isValidIndianPhoneNumber = (number) => {
    // Regular expression for Indian phone numbers
    const indianPhoneNumberRegex = /^[6-9]\d{9}$/;

    return indianPhoneNumberRegex.test(number);
  };



  const handleNumberChange = (e) => {
    const enteredNumber = e.target.value;
    const isValidNumber = isValidIndianPhoneNumber(enteredNumber);
    setIsValidNumber(isValidNumber);
    setMobileNumber(enteredNumber);
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };



  const handleGetOTP = () => {
    if (isValidNumber) {
      setStep(2); // Move to the next step (OTP entering page)
    } else {
      // Handle invalid number case
      alert("Please enter a valid Indian mobile number");
    }
  };

  const handleSendOTP = async () => {
    try {
      const formattedPhoneNumber = `+91${mobileNumber}`;
      const confirmation = await signInWithPhoneNumber(
        auth,
        formattedPhoneNumber,
        window.RecaptchaVerifier
      );
      setConfirmationResult(confirmation);
      setOtpSent(true);
      setStep(2);
      alert("OTP sent");
    } catch (error) {
      console.error(error);
    }
  };

  const handleOTPSubmit = async () => {
    try {
      
      await confirmationResult.confirm(otp);
      setOtp("");


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div className="grid grid-cols-1 gap-6 mt-5">
          <label className="flex flex-col gap-4">
            <span className="text-4xl w-64 block font-medium lg:text-4xl lg:w-full text-black">
              Enter Your Mobile Number
            </span>
            <p>We will send you a confirmation code.</p>
            <input
              type="tel"
              value={mobileNumber}
              onChange={handleNumberChange}
              className="block border-2 border-gray-300 w-full h-14 rounded p-2 text-xl tracking-wide"
              placeholder=""
            />
          </label>
          {!otpSent ? <div id="recaptcha-container"></div> : null}
          <button
            onClick={handleSendOTP}
            className="w-full bg-black text-white h-14 rounded"
          >
            Get OTP
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="grid grid-cols-1 gap-6 mt-5">
          <label className="flex flex-col gap-4">
            <span className="text-4xl w-64 block font-medium lg:text-4xl text-black">
              Enter OTP
            </span>
            <p>Enter the OTP sent to your mobile number.</p>
            <input
              type="text"
              value={otp}
              onChange={handleOtpChange}
              className="block border-2 border-gray-300 w-full h-14 rounded p-2 text-xl tracking-wide"
              placeholder="Enter OTP"
            />
            <p>
              Didn't receive OTP yet?
              <span className="ml-2 underline underline-offset-2">Resend</span>
            </p>
          </label>
          <button
            onClick={otpSent ? handleOTPSubmit : handleSendOTP}
            className="w-full bg-black text-white h-14 rounded"
          >
            Verify
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
