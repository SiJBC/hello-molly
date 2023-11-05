'use client'

import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

export default function SimpleBottomNavigation () {
  const FooterElements = [
    'Privacy Policy',
    'Terms of Service',
    'Careers',
    'Copyright'
  ]

  return (
    <>
      <footer>
        <div className='mt-72 lg:mt-0 w-screen bg-gradient-to-r from-blue-500 to-indigo-900 h-[2px] padding-0'>
          <div className='font-bold pt-8'>
            <BottomNavigation showLabels>
              {FooterElements.map(item => (
                <BottomNavigationAction key={item} label={item} />
              ))}
            </BottomNavigation>
          </div>
        </div>
        <div className='w-screen bg-gradient-to-l from-blue-500  h-1 after:h-2 after:absolute after:bottom-0'></div>
      </footer>
    </>
  )
}
