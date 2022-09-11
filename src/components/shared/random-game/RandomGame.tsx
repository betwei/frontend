import { useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import Image from 'next/image'
import { toDataURL } from 'qrcode'
import { FaCopy } from 'react-icons/fa'
import { AiFillLike } from 'react-icons/ai'

// Types
import { IRandomGame } from '../../../interfaces/randomGame.interface'
import { IModal } from '../../../interfaces/modal.interface'

// Components
import Card from '../card/Card'
import Button from '../buttons/Button'

// Hooks
import useContract from '../../../hooks/useContract'
import { useShowModal } from '../../../hooks/useModal'
import useLoader from '../../../hooks/useLoader'

// Utils
import truncatedAddress from '../../../utils/truncatedAddress'

import styles from './RandomGame.module.scss'

function RandomGame({ game, className, onChangeGame }: IRandomGame) {
  const states = ['Abierto', 'Cerrado', 'Calculando', 'Finalizado']
  const { account } = useWeb3React()
  const contract = useContract()
  const { setLoader } = useLoader()
  const [urlImg, setUrlImg] = useState('')
  const [url, setUrl] = useState('')
  const [modalVals, setModalVals] = useState({} as IModal)
  const [isCopyToChipboard, setIsCopyToChipboard] = useState(false)

  const modal = useShowModal(modalVals)
  const canEroll = () => (
    !game.members?.find(m => m === account) &&
    (game.status === '0' || game.status === '1'))

  const handleUpdateGame = async (type: 'startGame' | 'closeGame' | 'enrollToGame') => {
    setLoader(true)
    contract.methods[type](game.idGame)
      .send(type === 'enrollToGame'
        ? { from: account, value: game.neededAmount }
        : { from: account })
      .on('transactionHash', console.log)
      .on('receipt', () => setModalVals({
        type: 'success',
        title: 'Actualización Juego',
        children: 'El juego fue actualizado con éxito.',
        onClose: () => onChangeGame && onChangeGame(game.idGame)
      }))
      .on('error', () => setModalVals({
        type: 'error',
        title: 'Actualización Juego',
        children: 'No fue posible actualizar el juego, por favor intentelo mas tarde.'
      }))
  }

  const getUrlShare = () => {
    const params = (new URLSearchParams({ idGame: game.idGame || '' })).toString()
    return `${window.location.href}?${params}`
  }

  const handleCopyToChipboard = () => {
    navigator.clipboard.writeText(getUrlShare())
    setIsCopyToChipboard(true)
  }

  useEffect(() => {
    setLoader(false)
    if (modalVals.title && modalVals.children) modal()
  }, [modalVals])

  useEffect(() => {
    const newUrl = getUrlShare()
    const params = (new URLSearchParams({ text: newUrl })).toString()
    setUrl(`https://api.whatsapp.com/send?${params}`)
    toDataURL(newUrl, (err: any, url: string) => {
      if (!err) setUrlImg(url)
    })
  }, [game.idGame, url])

  return (
    <Card
      header={game.description}
      classNameCard={className}
      footer={<div className={styles.random_game__footer}>
        {game.owner === account
          ? <>
            <Button
              color='primary'
              disabled={game.status !== '0' || game.owner !== account}
              onClick={() => handleUpdateGame('closeGame')}>
              Cerrar Juego
            </Button>
            <Button
              color='contrast1'
              disabled={game.status !== '1' || game.owner !== account}
              onClick={() => handleUpdateGame('startGame')}>
              Iniciar Juego
            </Button>
          </>
          : <>
            <Button
              color='contrast1'
              disabled={!canEroll()}
              onClick={() => handleUpdateGame('enrollToGame')}>
              Enrolarse
            </Button>
          </>}
      </div>}>
      <div className={styles.random_game}>
        <div className={styles.random_game__info}>
          <span>
            <b>Estado:</b> <i>{states[game.status ? parseInt(game.status) : 0]}</i>
          </span>
          <span>
            <b>Balance:</b> <i>{(game.balance || 0) / Math.pow(10, 18)} ETH</i>
          </span>
          <span>
            <b>Apuesta:</b> <i>{(game.neededAmount || 0) / Math.pow(10, 18)} ETH</i>
          </span>
          <span>
            <b>cantidad de participantes:</b> <i>{game.duration}</i>
          </span>
          {game.winners && game.winners?.length > 0 && <span>
            <b>Ganadores:</b> <i>
              {game.winners?.map(w => truncatedAddress(w)).join(', ')}
            </i>
          </span>}
        </div>
        <div
          className={`
            ${styles.random_game__qr}
            ${((game.status !== '0' && game.status !== '1') || game.owner !== account)
              ? 'opacity-5' : ''}`}>
          {urlImg !== '' && <Image
            src={urlImg}
            width={100}
            height={100}
            alt={game.description} />}
          {(url && (game.status === '0' || game.status === '1'))
            ? <div className='flex gap-3 justify-center'>
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
      </div>
    </Card>
  )
}

export default RandomGame
