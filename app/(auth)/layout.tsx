import Image from 'next/image'
import React from 'react'

function layout({children}:{
    children: React.ReactNode}) {

  return (
    <div className="flex  h-screen">
      <div className="relative flex-1 hidden w-0 lg:block">
        <Image
          src={
            "https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
          }
          alt="Login"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="flex items-center w-full h-full max-w-sm mx-auto lg:w-96">
          {children}
        </div>
      </div>
    </div>
  )
}

export default layout
