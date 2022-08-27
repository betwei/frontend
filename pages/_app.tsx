import { Web3ReactProvider } from '@web3-react/core'
import { AppProps } from 'next/app'

// Web3 connection
import { getLibrary } from '../src/config/web3'

import '../styles/globals.scss'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Component {...pageProps} />
    </Web3ReactProvider>
  )
}

export default MyApp
