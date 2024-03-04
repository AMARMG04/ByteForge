
import Image from 'next/image'
import Carousel from './components/Carousel'
import Navbar from './components/Navbar'
import FrequentlyBought from './components/FrequentlyBought'
import Link from 'next/link'


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

      <section className='bg-gradient-to-r from-blue-800 to-indigo-900 flex flex-col text-white p-4 gap-8'>
        <div className='flex flex-col gap-10 lg:flex-row lg:justify-between'>
          <div className='mt-4'>
            <Link href='/'>
            <Image
              src="/assets/logo.svg"
              width={150}
              height={150}
              alt='Logo'
              className=''
              />
              </Link>
          </div>
          
          <div className='flex flex-col gap-20 lg:flex-row'>
          <div>
            <h2 className='text-xl text-gray-400 font-medium mb-2'>Shop</h2>
            <ul className='font-light text-lg'>
              <Link href='/products/monitors'><li>Monitors</li></Link>
              <Link href='/products/processors'><li>Processors</li></Link>
              <Link href='/products/motherboard'><li>Motherboard</li></Link>
              <Link href='/products/accessories'><li>Accessories</li></Link>
              <Link href='/products/audio'><li>Audio</li></Link>
            </ul>
          </div>
          <div className='flex flex-col gap-10 lg:mr-10'>
            <div className='flex flex-col gap-10 lg:flex-row'>
              <div>
                <h2 className='text-xl text-gray-400 font-medium mb-2'>Contact</h2>
                <p className=' font-light text-lg'>+91 7868049915</p>
              </div>
              <div>
                <h2 className='text-xl text-gray-400 font-medium mb-2'>Email ID</h2>
                <p className=' font-light text-lg'>byteforge@gmail.com</p>
              </div>
            </div>
            <div>
              <h2 className='text-xl text-gray-400 font-medium mb-2'>Address</h2>
              <p className='font-light text-lg'>No.6A, Old Chennai Bypass Road, Tiruttani -631209.</p>
            </div>
          </div>
          </div>

        </div>
        <hr />
        <p className='font-light text-lg mb-4'>Copyright© 2024 Byte Forge All Rights Reserved.</p>
      </section>

    </>
  )
}
