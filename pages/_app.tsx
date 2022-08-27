import { Web3ReactProvider } from '@web3-react/core'
import { AppProps } from 'next/app'

// Components
import Layout from '../src/components/Layout/Layout'

// Web3 connection
import { getLibrary } from '../src/config/web3'

import '../styles/globals.scss'

function App({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Web3ReactProvider>
  )
}

export default App
