import { NextResponse } from 'next/server';
import { connectToDatabase, disconnectFromDatabase } from '@/app/lib/database';

export const POST = async(req, res) =>{
  if (req.method === "POST") {
    try {
      const data = await req.json();

      const phoneNumber = data.phoneNumber;
      const userID = data.userID;

      // Connect to MongoDB
        const client = await connectToDatabase();
        const db = client.db('byteforge');

      // Check if user with given UID already exists
      const existingUser = await db.collection("users").findOne({ userId: userID });

      if (existingUser) {
        return new NextResponse({
          status: 409,
          body: { error: "User already exists in the database" },
        });
      }

      // Add user data to MongoDB
      await db.collection("users").insertOne({
        mobile: phoneNumber,
        userId: userID,
      });

      return new NextResponse({
        status: 200,
        body: { success: true },
      });
    } catch (error) {
      console.error(error);
      return new NextResponse({
        status: 500,
        body: { error: "Internal Server Error" },
      });
    }
  } else {
    return new NextResponse({
      status: 405,
      body: { error: "Method Not Allowed" },
    });
  }
}
