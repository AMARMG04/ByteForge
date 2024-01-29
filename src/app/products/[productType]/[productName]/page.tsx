import React from 'react'
import ProductPage from '@/app/components/ProductPage'
import Navbar from '@/app/components/Navbar'


const getData = async (product: string) => {
  const res = await fetch(`http://localhost:3000/api/products/[productType]/${product}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error("Something Went Wrong")
  }
  return res.json();
};

const page = async ({ params }: any) => {
  const product = params.productName;
  const item = await getData(product);

  return (
    <div>
      <Navbar />
      <ProductPage item={item}/>
    </div>
  )
}

export default page
