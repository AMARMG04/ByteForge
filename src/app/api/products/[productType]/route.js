// pages/api/most-frequently-bought.js
import { NextResponse } from 'next/server';
import { connectToDatabase, disconnectFromDatabase } from '@/app/lib/database';

export const GET = async (request, {params}) => {
    const product = params.productType;
  try {
    const client = await connectToDatabase();
    const db = client.db('byteforge');
    const monitors = await db.collection('products').find({ category: product }).toArray()
    const filters = await db.collection('filters').find({ category: product }).toArray()
    const responseData = {monitors, filters};
    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.error(new Error('Failed to fetch data'));
  }
};
