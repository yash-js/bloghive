import Image from 'next/image'
import React from 'react'
import KindeLogo from '@/public/logos/kinde.svg'
import NextJsLogo from '@/public/logos/nextjs.svg'
import VercelLogo from '@/public/logos/vercel.svg'

const Logos = () => {
  return (
    <div className='py-10 '>
      <h2 className='text-center text-lg font-semibold leading-7'>
        Trusted by the best companies in the world!
      </h2>
      <div className="mt-10 grid max-w-lg mx-auto grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5 ">
        <Image
          src={KindeLogo}
          alt='logo'
          className='dark:invert col-span-2 max-h-12 w-full object-contain lg:col-span-1'
        />
        <Image
          src={NextJsLogo}
          alt='logo'
          className='dark:invert col-span-2 max-h-12 w-full object-contain lg:col-span-1'
        />
        <Image
          src={VercelLogo}
          alt='logo'
          className='dark:invert col-span-2 max-h-12 w-full object-contain lg:col-span-1'
        />
        <Image
          src={NextJsLogo}
          alt='logo'
          className='dark:invert col-span-2 max-h-12 w-full object-contain lg:col-span-1'
        />
        <Image
          src={KindeLogo}
          alt='logo'
          className='dark:invert col-span-2 max-h-12 w-full object-contain lg:col-span-1'
        />
      </div>
    </div>
  )
}

export default Logos