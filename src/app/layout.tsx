import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import './globals.css'
import { ToastContainer } from './toast';
// import Toast from './toast';




const inter = Inter_Tight({
  subsets: ['latin'],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'Byte Forge',
  description: 'Generated by theweekendcoders.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body className={`${inter.className} bg-white mx-auto h-screen sm:max-w-screen-sm md:max-w-screen-md lg:max-w-screen-lg xl:max-w-full`}>
          {children}
      <ToastContainer />
      </body>



    </html>
  )
}
