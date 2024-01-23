// pages/api/most-frequently-bought.js
import { NextResponse } from "next/server";
import { connectToDatabase, disconnectFromDatabase } from "@/app/lib/database";

export const POST = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await req.json();
      console.log(data);
      const userId = data.userID;
      const productId = data.productId;
      const newQuantity = data.newQuantity;
      
      const client = await connectToDatabase();
      const db = client.db("byteforge");

      const cart_items = await db.collection('cart').updateOne(
        { productId: productId},
        { $set: { quantity: newQuantity } }
      );


      return NextResponse.json({
        status: 200,
        quantity: newQuantity,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ status: 500, error: "Internal Server Error" });
    }
  }
};
