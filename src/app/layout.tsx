'use client'
import * as React from 'react'
import ThemeRegistry from '@/components/ThemeRegistry/ThemeRegistry'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './globals.css'

export default function RootLayout (props: any) {
  const { children } = props
  const queryClient = new QueryClient()
  return (
    <html lang='en'>
      <body>
        <QueryClientProvider client={queryClient}>
          <ThemeRegistry options={{ key: 'mui' }}>
            {
              <>
                <Nav></Nav>
                {children}
                <Footer></Footer>
              </>
            }
          </ThemeRegistry>
        </QueryClientProvider>
      </body>
    </html>
  )
}
