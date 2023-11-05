'use client'

import * as React from 'react'

type HeroCenterProps = {
  search: React.ReactNode
}

export default function HeroCenter ({ search }: HeroCenterProps) {
  return (
    <header>
      <div
        className='w-full bg-center bg-cover '
        style={{
          backgroundImage: 'url(/img_hero_blue.png)'
        }}
      >
        <div className='flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 py-12'>
          <div className='text-center'>
            <div className='container px-4 mx-auto'>
              <div className='max-w-4xl mx-auto text-center'>
                <span className='text-gray-200 font-semibold uppercase tracking-widest'>
                  Explore The Organization Hierarchy
                </span>
                <h2 className='mt-8 mb-6 text-4xl lg:text-5xl font-bold text-gray-100'>
                  Find Your Next Talent
                </h2>
                <a
                  className='inline-block w-full md:w-auto mb-4 md:mr-6 py-5 px-8 text-sm font-bold uppercase border-2 border-transparent bg-gray-200 rounded hover:bg-gray-100 text-gray-800 transition duration-200'
                  href='#'
                >
                  {search}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
