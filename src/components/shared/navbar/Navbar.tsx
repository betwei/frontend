import { useCallback, useEffect } from 'react'
import Link from 'next/link'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'

// Components
import Button from '../buttons/Button'
import Logo from '../logo/Logo'
import Address from '../addres/Address'

// Web3 connectors
import { connector } from '../../../config/web3'

import styles from './Navbar.module.scss'

export default function Navbar() {
  const router = useRouter()
  const { active, activate, error } = useWeb3React()
  const isUnsupportedChain = error instanceof UnsupportedChainIdError

  const connect = useCallback(() => {
    activate(connector)
    localStorage.setItem('previouslyConnected', 'true')
  }, [activate])

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') connect()
  }, [connect])

  const isActive = (path: string | string[]) => {
    if ((typeof path === 'string' ? [path] : path).find(p => p === router.asPath))
      return { className: 'active' }
  }

  return (
    <div className={`${styles.Navbar} drop-shadow-md`}>
      <Logo />
      <ul>
        <li {...isActive(['/#hero', '/'])}>
          <Link href='/#hero'>Inicio</Link>
        </li>
        <li {...isActive('/#game-over')}>
          <Link href='/#game-over'>Partidos</Link>
        </li>
        <li {...isActive('/#about')}>
          <Link href='/#about'>Acerca de</Link>
        </li>
        {active && <>
          <li {...isActive('/play')}>
            <Link href='/play'>Jugar</Link>
          </li>
        </>}
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
