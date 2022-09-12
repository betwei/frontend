import { useWeb3React } from '@web3-react/core'
import { AiOutlineLogout } from 'react-icons/ai'

// Utils
import useTruncatedAddress from '../../../../utils/truncatedAddress'

import styles from './Address.module.scss'

function Address() {
  const { account, deactivate } = useWeb3React()

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }
  return (
    <div className={`${styles.address} w-24 md:w-36`}>
      <span className='hidden md:block' title={account || ''}>
        {useTruncatedAddress(account || '')}
      </span>
      <span className='block md:hidden' title={account || ''}>
        {useTruncatedAddress(account || '', 2)}
      </span>
      <AiOutlineLogout
        size='25'
        className='cursor-pointer hover:opacity-50'
        onClick={disconnect}
        title='Desconectarse' />
    </div>
  )
}

export default Address
