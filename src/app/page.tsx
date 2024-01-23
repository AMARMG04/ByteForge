
import Image from 'next/image'
import Carousel from './components/Carousel'
import Navbar from './components/Navbar'
import FrequentlyBought from './components/FrequentlyBought'


const getData = async () => {
  const res = await fetch("http://localhost:3000/api/mostFrequentlyBought", { cache: "no-store" });
  if(!res.ok){
      throw new Error("Something Went Wrong")
  }
  return res.json();
};


export default async function Home() {

  const mostFB = await getData();
  return (
    <>
      <Navbar />
      <section className='p-2 mb-10 sm:max-w-sm md:max-w-full lg:max-w-full'>
        <Carousel />
      </section>

      <section className='my-6 text-center'>
        <h1 className='text-2xl font-medium lg:text-3xl'>Most Frequently Bought</h1>
        <FrequentlyBought mostFB={mostFB} />
      </section>

      <section className='bg-[#100F0F] flex flex-col text-white p-4 gap-8'>
        <div className='flex flex-col gap-10 lg:flex-row lg:justify-between'>
          <div className='mt-4'>
            <Image
              src="/assets/logo.svg"
              width={150}
              height={150}
              alt='Logo'
              className=''
            />
          </div>
          <div>
            <h2 className='text-[24px] font-medium mb-2'>Shop</h2>
            <ul className='text-[#898989] font-light text-[20px]'>
              <li>Monitors</li>
              <li>Processors</li>
              <li>CPU</li>
              <li>Accessories</li>
              <li>Audio</li>
            </ul>
          </div>
          <div className='flex flex-col gap-10 lg:mr-10'>
            <div className='flex flex-col gap-10 lg:flex-row'>
              <div>
                <h2 className='text-[24px] font-medium mb-2'>Contact</h2>
                <p className='text-[#898989] font-light text-[20px]'>9876543210</p>
              </div>
              <div>
                <h2 className='text-[24px] font-medium mb-2'>Email ID</h2>
                <p className='text-[#898989] font-light text-[20px]'>kalvi.trt@gmail.com</p>
              </div>
            </div>
            <div>
              <h2 className='text-[24px] font-medium mb-2'>Address</h2>
              <p className='text-[#898989] font-light text-[20px]'>No.6A, Old Chennai Bypass Road, Tiruttani -631209.</p>
            </div>
          </div>

        </div>
        <hr />
        <p className='font-light text-[20px] mb-4'>Copyright© 2023 Byte Forge All Rights Reserved.</p>
      </section>

    </>
  )
}
