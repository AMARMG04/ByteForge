// pages/api/most-frequently-bought.js
import { NextResponse } from 'next/server';
import { connectToDatabase, disconnectFromDatabase } from '@/app/lib/database';

export const GET = async (request, {params}) => {
    const product = params.productName;

  try {
    const client = await connectToDatabase();
    const db = client.db('byteforge');
    const item = await db.collection('products').find({name:product}).toArray()
    return NextResponse.json(item);
  } catch (error) {
    console.error(error);
    return NextResponse.error(new Error('Failed to fetch data'));
  }
};
