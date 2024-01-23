// pages/api/most-frequently-bought.js
import { NextResponse } from "next/server";
import { connectToDatabase, disconnectFromDatabase } from "@/app/lib/database";

export const POST = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await req.json();
      const userId = data.userID;
      const client = await connectToDatabase();
      const db = client.db("byteforge");
      const cart_items = await db
        .collection("cart")
        .find({ userId: userId })
        .toArray();
      // return NextResponse.json(cart_items);
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
