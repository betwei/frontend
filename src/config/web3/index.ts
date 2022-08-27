import Web3 from 'web3'
import { InjectedConnector } from '@web3-react/injected-connector'
import { Provider } from 'web3-react/dist/manager'

const connector = new InjectedConnector({
  supportedChainIds: [
    4, // Rinkeby
  ],
})

const getLibrary = (provider: Provider) => {
  return new Web3(provider)
}

export { connector, getLibrary }
