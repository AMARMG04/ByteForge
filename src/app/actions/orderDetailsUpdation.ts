"use server"

export const orderDetailsUpdation = async() => {
    const response = await fetch("http://localhost:3000/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({  }),
    })
  
    const data = await response.json();
    return data;

    
  }