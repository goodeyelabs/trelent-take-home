import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Providers from '../providers'
import GTM from '@/tools/gtm'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <GTM />
      <Component {...pageProps} />
    </Providers>
  )
}
