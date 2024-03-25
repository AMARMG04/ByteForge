"use server";
import React from "react";
import AppleReceiptEmail from "@/app/email/AppleReceiptEmail";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const orderDetailsUpdation = async (
  orderData: any,
  cartItems: any,
  user: any
) => {

  const orderdetails = {
    orderData,
    cartItems,
    user,
  };

  const date = new Date();
  const options:any = { month: 'long', day: '2-digit', year: 'numeric' };
  const formattedDate = date.toLocaleDateString('en-US', options);

  const response = await fetch("http://localhost:3000/api/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      orderData,
      cartItems,
      user,
    }),
  });

  await resend.emails.send({
    from: "Kalvi Computers <OrderConfirmation@kalvicomputers.com>",
    to: orderdetails.user.email,
    subject: "Order Confirmation",
    react: React.createElement(
      AppleReceiptEmail, {data: orderdetails, date: formattedDate}
    )
  })

  const data = await response.json();
  return data;
};
