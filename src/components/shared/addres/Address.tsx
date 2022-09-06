import { useWeb3React } from '@web3-react/core'
import { AiOutlineLogout } from 'react-icons/ai'

// Utils
import useTruncatedAddress from '../../../utils/truncatedAddress'

import styles from './Address.module.scss'

function Address() {
  const { account, deactivate } = useWeb3React()

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }
  return (
    <div className={styles.address}>
      <span title={account || ''}>
        {useTruncatedAddress(account || '')}
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
