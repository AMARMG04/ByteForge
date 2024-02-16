import React from 'react'
import ProductsDisplay from '@/app/components/ProductsDisplay'
import Navbar from '@/app/components/Navbar'

const getProductData = async (product:string) => {
  const res = await fetch(`http://localhost:3000/api/products/${product}`, { cache: "no-store" });
  if(!res.ok){
      throw new Error("Something Went Wrong")
  }
  return res.json();
};


const page = async({params}:any) => {
  const product = params.productType;
  
  const data = await getProductData(product);
  return (
    <div>
        <Navbar />
        <ProductsDisplay monitors={data.monitors} filters={data.filters[0]} />
    </div>
  )
}

export default page
