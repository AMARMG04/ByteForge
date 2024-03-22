"use server";

export const orderDetailsUpdation = async (
  orderData: any,
  cartItems: any,
  user: any
) => {

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

  const data = await response.json();
  return data;
};
