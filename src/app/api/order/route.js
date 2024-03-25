import { NextResponse } from "next/server";
import { connectToDatabase, disconnectFromDatabase } from "@/app/lib/database";



export const POST = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await req.json();
      // console.log(data)
      // Connect to MongoDB
      const client = await connectToDatabase();
      const db = client.db("byteforge");
      const date = new Date();
      const options = { month: 'long', day: '2-digit', year: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);


    
      const orders = await db.collection("orders").insertOne(
        {
            userID:data.user.userId,
            paymentDetails:data.orderData,
            orderedItems:data.cartItems,
            userDetails:data.user,
            orderDate:formattedDate,
        }
      );

      const orderHistory = await db.collection("orderHistory").insertOne({
          userID:data.user.userId,
          paymentDetails:data.orderData,
          orderedItems:data.cartItems,
          orderID:data.orderData.razorpay_order_id,
          orderDate:formattedDate,
      })

     


      return NextResponse.json({status: 200,},{message: "Order Details Updated",});
    } 
    catch (error) {
      console.error(error);
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" }, { status: 500 });
  }
};
