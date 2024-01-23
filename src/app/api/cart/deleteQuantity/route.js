// pages/api/most-frequently-bought.js
import { NextResponse } from "next/server";
import { connectToDatabase, disconnectFromDatabase } from "@/app/lib/database";
const { ObjectId } = require('mongodb');

export const DELETE = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const data = await req.json();
      const productId = data.productId;
      const objectIdProductId = new ObjectId(productId);

      const client = await connectToDatabase();
      const db = client.db("byteforge");

      const cart_items = await db
        .collection("cart")
        .deleteOne({ _id:objectIdProductId });


      return NextResponse.json({
        status: 200,
        cart_items: cart_items,
      });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ status: 500, error: "Internal Server Error" });
    }
  }
};
