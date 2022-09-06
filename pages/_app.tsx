import { Web3ReactProvider } from '@web3-react/core'
import { AppProps } from 'next/app'

// Components
import Layout from '../src/components/Layout/Layout'
import Loader from '../src/components/shared/loader/Loader'
import Modal from '../src/components/shared/modal/Modal'

// Web3 connection
import { getLibrary } from '../src/config/web3'

// Contexts
import GlobalContext from '../src/context/GlobalContext'
import { useGlobalContext } from '../src/context/GlobalContext/useContext'

import '../styles/globals.scss'

function App({ Component, pageProps }: AppProps) {
  const ctx = useGlobalContext()
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <GlobalContext.Provider value={ctx}>
        <Layout>
          {ctx.loader && <Loader />}
          <Component {...pageProps} />
          <Modal {...ctx.modal} />
        </Layout>
      </GlobalContext.Provider>
    </Web3ReactProvider>
  )
}

export default App
