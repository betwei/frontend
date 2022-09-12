import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { useRouter } from 'next/router'

// Components
import Button from '../atoms/buttons/Button'
import Logo from '../atoms/logo/Logo'
import Address from '../atoms/addres/Address'

// Web3 connectors
import { connector } from '../../../config/web3'

import styles from './Navbar.module.scss'

export default function Navbar() {
  const router = useRouter()
  const { active, activate, error } = useWeb3React()
  const isUnsupportedChain = error instanceof UnsupportedChainIdError
  const [openHome, setOpenHome] = useState(false)

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
    <div className={`${styles.Navbar} drop-shadow-md px-1 md:px-8 lg:px-20`}>
      <Logo />
      <ul>
        <li {...isActive(['/', '/#hero', '/#game-over', '/#about'])}>
          <span onClick={() => setOpenHome(!openHome)}>
            Inicio
          </span>
          {openHome && <div
            className='relative ml-3'
            onMouseEnter={() => setOpenHome(true)}
            onMouseLeave={() => setOpenHome(false)}>
            <div className='absolute left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
              <Link href='/#hero'>
                <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-slate-300'>
                  Inicio
                </a>
              </Link>
              <Link href='/#game-over'>
                <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-slate-300'>
                  Partidos
                </a>
              </Link>
              <Link href='/#about'>
                <a className='block px-4 py-2 text-sm text-gray-700 hover:bg-slate-300'>
                  Acerca de
                </a>
              </Link>
            </div>
          </div>}
        </li>
        {active && <>
          <li {...isActive('/play')}>
            <Link href='/play'>Jugar</Link>
          </li>
        </>}
      </ul>
      {active
        ? <Address />
        : <Button className='w-24 truncate whitespace-nowrap' onClick={connect}>
          {isUnsupportedChain
            ? 'Red no soportada'
            : <>
              <span className='hidden md:block'>Conectar Wallet</span>
              <span className='block md:hidden'>Conectar</span>
            </>}
        </Button>
      }
    </div>
  )
}
