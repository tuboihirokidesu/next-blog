import React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { ThemeProvider } from 'next-themes'
import Sidebar from '../components/BlogNavbar'

function MyApp({ Component, pageProps }: AppProps): React.ReactNode {
  return (
    <>
      <Head>
        <title>My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ThemeProvider attribute="class">
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}

export default MyApp
