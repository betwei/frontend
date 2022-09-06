import { useEffect, useState } from 'react'
import { toDataURL } from 'qrcode'
import Image from 'next/image'
import { useWeb3React } from '@web3-react/core'

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

import styles from './RandomGame.module.scss'

function RandomGame({ game, className, onChangeGame }: IRandomGame) {
  const states = ['Abierto', 'Cerrado', 'Calculando', 'Finalizado']
  const { account } = useWeb3React()
  const contract = useContract()
  const { setLoader } = useLoader()
  const [urlImg, setUrlImg] = useState('')
  const [url, setUrl] = useState('')
  const [modalVals, setModalVals] = useState({} as IModal)

  const modal = useShowModal(modalVals)

  const handleUpdateGame = async (type: 'start' | 'close') => {
    setLoader(true)
    contract.methods[type === 'start' ? 'startGame' : 'closeGame'](game.idGame)
      .send({ from: account }).on('transactionHash', console.log)
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

  useEffect(() => {
    setLoader(false)
    if (modalVals.title && modalVals.children) modal()
  }, [modalVals])

  useEffect(() => {
    let params = (new URLSearchParams({ idGame: game.idGame || '' })).toString()
    const newUrl = `${window.location.href}?${params}`
    params = (new URLSearchParams({ text: newUrl })).toString()
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
        <Button
          color='primary'
          disabled={game.status !== '0' || game.owner !== account}
          onClick={() => handleUpdateGame('close')}>
          Cerrar Juego
        </Button>
        <Button
          color='contrast1'
          disabled={game.status !== '1' || game.owner !== account}
          onClick={() => handleUpdateGame('start')}>
          Iniciar Juego
        </Button>
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
        </div>
        <div
          className={`
            ${styles.random_game__qr}
            ${(game.status !== '0' && game.status !== '1') ? 'opacity-5' : ''}`}>
          {urlImg !== '' && <Image
            src={urlImg}
            width={100}
            height={100}
            alt={game.description} />}
          {(url && (game.status === '0' || game.status === '1'))
            ? <a
              href={url}
              target='_blank'
              rel='noopener noreferrer'>
              Compartir por whatsapp
            </a>
            : <i>Compartir por whatsapp</i>}
        </div>
      </div>
    </Card>
  )
}

export default RandomGame
