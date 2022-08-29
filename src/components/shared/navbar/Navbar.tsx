import { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'

// Components
import Button from '../buttons/Button'
import Logo from '../logo/Logo'
import Address from '../addres/Address'

// Web3 connectors
import { connector } from '../../../config/web3'

import styles from './Navbar.module.scss'

export default function Navbar() {
  const { active, activate, error } = useWeb3React()
  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', 'true')
  }, [activate])

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') connect()
  }, [connect])

  return (
    <div className={styles.Navbar}>
      <Logo></Logo>
      <ul>
        <li>
          <Link href='/#hero'>Inicio</Link>
        </li>
        <li>
          <Link href='/#game-over'>Partidos</Link>
        </li>
        <li>
          <Link href='#about'>Acerca de</Link>
        </li>
        <li>
          <Link href='#'>Faq</Link>
        </li>
      </ul>
      {active
        ? <Address />
        : <Button onClick={connect}>
            {isUnsupportedChain ? 'Red no soportada' : 'Conectar Wallet'}
          </Button>
      }
    </div>
  )
}
