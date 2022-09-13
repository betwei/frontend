/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { toDataURL } from 'qrcode'
import { FaCopy } from 'react-icons/fa'
import { AiFillLike } from 'react-icons/ai'

// Types
import { IShareGame } from '../../../interfaces/shareGame.interface'

import styles from './ShareGame.module.scss'

function ShareGame({ game, className }: IShareGame) {
  const { account } = useWeb3React()
  const [urlImg, setUrlImg] = useState('')
  const [isCopyToChipboard, setIsCopyToChipboard] = useState(false)
  const [url, setUrl] = useState('')

  const getUrlShare = () => {
    const params = (new URLSearchParams({ idGame: game.idGame || '' })).toString()
    return `${window.location.href}?${params}`
  }

  const handleCopyToChipboard = () => {
    navigator.clipboard.writeText(getUrlShare())
    setIsCopyToChipboard(true)
  }

  useEffect(() => {
    const newUrl = getUrlShare()
    const params = (new URLSearchParams({ text: newUrl })).toString()
    setUrl(`https://api.whatsapp.com/send?${params}`)
    toDataURL(newUrl, (err: any, url: string) => {
      if (!err) setUrlImg(url)
    })
  }, [game.idGame, url])

  return (
    <div
      className={`m-auto
            ${styles.share_game__qr}
            ${((game.status !== '0') || game.owner !== account)
          ? 'opacity-5' : ''} ${className}`}>
      {urlImg !== '' && <img
        src={urlImg}
        className='w-9 h-9 md:w-20 md:h-20 m-auto'
        alt={game.description} />}
      {(url && (game.status === '0'))
        ? <div className='flex gap-1 md:gap-3 justify-center text-xs md:text-sm'>
          <a
            href={url}
            target='_blank'
            rel='noopener noreferrer'>
            Compartir por whatsapp
          </a>
          {!isCopyToChipboard
            ? <FaCopy size={20}
              className='cursor-pointer hover:animate-pulse'
              onClick={handleCopyToChipboard} />
            : <AiFillLike size={20}
              className='cursor-pointer animate-pulse'
              title={`${getUrlShare()} copiado...`}
              onMouseLeave={() => setIsCopyToChipboard(false)} />}
        </div>
        : <i>Compartir por whatsapp</i>}
    </div>
  )
}

export default ShareGame
