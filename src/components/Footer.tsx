'use client'

import * as React from 'react'
import Box from '@mui/material/Box'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'

export default function SimpleBottomNavigation () {
  const [value, setValue] = React.useState(0)

  const FooterElements = [
    'Privacy Policy',
    'Terms of Service',
    'Careers',
    'Copyright'
  ]

  return (
    <>
      <div className='w-screen bg-gradient-to-r from-blue-500 to-indigo-900 h-1 after:h-32 after:absolute after:-top-10'></div>
      <div className='w-screen bg-gradient-to-r from-blue-500 to-indigo-900 h-16 after:h-32 after:absolute after:-top-10'>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue)
          }}
        >
          {FooterElements.map(item => (
            <BottomNavigationAction key={item} label={item} />
          ))}
        </BottomNavigation>
      </div>
    </>
  )
}
