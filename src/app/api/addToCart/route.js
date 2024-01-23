import { NextResponse } from "next/server";
import { connectToDatabase, disconnectFromDatabase } from "@/app/lib/database";

export const POST = async (req, res) => {
  if (req.method === "POST") {
    try {
      const data = await req.json();

      const productID = data.productID;
      const userID = data.userID;
      const productBrand = data.productBrand;
      const productName = data.productName;
      const productPrice = data.productPrice;
      const productImage = data.productImage;

      // Connect to MongoDB
      const client = await connectToDatabase();
      const db = client.db("byteforge");

      // Check if user has already added product to cart
      const cart = await db
        .collection("cart")
        .find({
          productId: productID,
          userId: userID,
        })
        .toArray();
      if (cart.length > 0) {
        return NextResponse.json({
          status: 400,
          error: "Product already in cart",
        });
      } else {
        await db.collection("cart").insertOne({
          productId: productID,
          userId: userID,
          productBrand: productBrand,
          productName: productName,
          productPrice: productPrice,
          productImage: productImage,
          quantity: 1,
        });
      }

      return NextResponse.json(
        {
          status: 200,
        },
        {
          message: "Product added to cart",
        }
      );
    } catch (error) {
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
