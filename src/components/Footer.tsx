'use client'

import * as React from 'react'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useSelector } from 'react-redux'
import store from '@/redux/store'

export default function SimpleBottomNavigation () {
  const FooterElements = [
    'Privacy Policy',
    'Terms of Service',
    'Careers',
    'Copyright'
  ]
  const selectedTheme = useSelector(
    (state: ReturnType<typeof store.getState>) => state.data.theme
  )

  const globalStyles = useSelector(
    (state: ReturnType<typeof store.getState>) => state.data.styles
  )
  return (
    <>
      <footer>
        <div className={globalStyles[selectedTheme].footerGradientBackground}>
          <div className='font-bold pt-8'>
            <BottomNavigation showLabels>
              {FooterElements.map(item => (
                <BottomNavigationAction key={item} label={item} />
              ))}
            </BottomNavigation>
          </div>
        </div>
        <div className='w-screen h-1 after:h-2 after:absolute after:bottom-0'>
          <div
            className={globalStyles[selectedTheme].footerGradientBackground}
          ></div>
        </div>
      </footer>
    </>
  )
}
