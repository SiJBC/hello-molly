'use client'
import * as React from 'react'
import ThemeRegistry from '@/ThemeRegistry/ThemeRegistry'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import store from '@/redux/store'
import './globals.css'

export default function RootLayout (props: any) {
  const { children } = props
  const queryClient = new QueryClient()
  return (
    <html lang='en'>
      <body>
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <ThemeRegistry options={{ key: 'mui' }}>
              {
                <>
                  <Nav></Nav>
                  <div className='relative'>{children}</div>
                  <Footer></Footer>
                </>
              }
            </ThemeRegistry>
          </QueryClientProvider>
        </Provider>
      </body>
    </html>
  )
}
