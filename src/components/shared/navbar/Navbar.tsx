import { useCallback, useEffect } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'

// Components
import Button from '../buttons/Button'
import Logo from '../logo/Logo'

// Web3 connectors
import { connector } from '../../../config/web3'

import styles from './Navbar.module.scss'
import { AiOutlineLogout } from 'react-icons/ai'

export default function Navbar() {
  const { active, activate, deactivate, account, error } = useWeb3React()
  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', 'true')
  }, [activate])

  const disconnect = () => {
    deactivate()
    localStorage.removeItem('previouslyConnected')
  }

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') connect()
  }, [connect])

  return (
    <div className={styles.Navbar}>
      <Logo></Logo>
      <ul>
        <li>Inicio</li>
        <li>Partidos</li>
        <li>Acerca de</li>
        <li>Faq</li>
      </ul>
      {active
        ? <div className={styles.account}>
            <span className="truncate" title={account || ''}>
              {account}
            </span>
            <AiOutlineLogout
              size='25'
              className='cursor-pointer hover:opacity-50'
              onClick={disconnect}
              title='Desconectarse' />
          </div>
        : <Button onClick={connect}>
            {isUnsupportedChain ? 'Red no soportada' : 'Conectar Wallet'}
          </Button>
      }
    </div>
  )
}
