import * as React from 'react'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata = {
  title: 'Next.js App Router + Material UI v5',
  description: 'Next.js App Router + Material UI v5'
}

export default function RootLayout (props: any) {
  const { children } = props
  return (
    <html lang='en'>
      <body>
        <ThemeRegistry options={{ key: 'mui' }}>
          {
            <>
              <Nav></Nav>
              {children}
              <Footer></Footer>
            </>
          }
        </ThemeRegistry>
      </body>
    </html>
  )
}
