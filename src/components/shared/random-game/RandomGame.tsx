import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

// Types
import { IRandomGame } from '../../../interfaces/randomGame.interface'
import { IModal } from '../../../interfaces/modal.interface'

// Components
import Card from '../card/Card'
import Button from '../atoms/buttons/Button'
import NFTMetadata from '../nfg-metadata/NFTMetadata'
import ShareGame from '../share-game/ShareGame'

// Hooks
import { useShowModal } from '../../../hooks/useModal'
import useContract from '../../../hooks/useContract'
import useLoader from '../../../hooks/useLoader'

// Utils
import truncatedAddress from '../../../utils/truncatedAddress'

import styles from './RandomGame.module.scss'

function RandomGame({ game, className, onChangeGame }: IRandomGame) {
  const states = ['Abierto', 'Cerrado', 'Calculando', 'Finalizado']
  const { account } = useWeb3React()
  const contract = useContract()
  const { setLoader } = useLoader()
  const [modalVals, setModalVals] = useState({} as IModal)
  const [hasClaimReward, setHasClaimReward] = useState(false)

  const modal = useShowModal(modalVals)
  const canEroll = () => (
    !game.members?.find(m => m === account) &&
    (game.status === '0' || game.status === '1'))

  const handleUpdateGame = async (
    type: 'startGame' | 'closeGame' | 'enrollToGame' | 'withdrawGame'
  ) => {
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

  const getHasClaimReward = useCallback(async () => {
    if (contract) setHasClaimReward(await contract.methods.hasClaimReward(game.idGame, account).call())
  }, [contract, game, account])

  useEffect(() => {
    getHasClaimReward()
  }, [getHasClaimReward])

  useEffect(() => {
    setLoader(false)
    if (modalVals.title && modalVals.children) modal()
  }, [modalVals])

  return (
    <Card
      header={`${game.description} (Tipo ${game.gameType === '0' ? 'Aleatorio' : 'Sorteo NFT'})`}
      classNameCard={className}
      footer={<div className={styles.random_game__footer}>
        {game.winnersIndexed?.find(w => w === account)
          ? <Button
            className='h-11 md:h-7'
            color='primary'
            disabled={!hasClaimReward}
            onClick={() => handleUpdateGame('withdrawGame')}>
            {game.gameType === '0' ? 'Retirar balance' : 'Transferir NFT'}
          </Button>
          : (
            game.owner === account
              ? <>
                <Button
                  className='h-11 md:h-7'
                  color='primary'
                  disabled={game.status !== '0' || game.owner !== account}
                  onClick={() => handleUpdateGame('closeGame')}>
                  Cerrar Juego
                </Button>
                <Button
                  className='h-11 md:h-7'
                  color='contrast1'
                  disabled={game.status !== '1' || game.owner !== account}
                  onClick={() => handleUpdateGame('startGame')}>
                  Iniciar Juego
                </Button>
              </>
              : <>
                <Button
                  className='h-11 md:h-7'
                  color='contrast1'
                  disabled={!canEroll()}
                  onClick={() => handleUpdateGame('enrollToGame')}>
                  Enrolarse
                </Button>
              </>
          )}
      </div>}>
      <div className={`${styles.random_game} grid grid-cols-3 md:grid-cols-2`}>
        <div className={`${styles.random_game__info} col-span-2 md:col-span-1`}>
          <span>
            <b>Estado:</b> <i>{states[game.status ? parseInt(game.status) : 0]}</i>
          </span>
          {game.gameType === '0' && <>
            <span>
              <b>Balance:</b> <i>{(game.balance || 0) / Math.pow(10, 18)} ETH</i>
            </span>
            <span>
              <b>Apuesta:</b> <i>{(game.neededAmount || 0) / Math.pow(10, 18)} ETH</i>
            </span>
          </>}
          <span>
            <b>Max participantes:</b> <i>{game.duration}</i>
          </span>
          {game.winnersIndexed && game.winnersIndexed?.length > 0 && <span>
            <b>Ganadores:</b> <i>
              {game.winnersIndexed?.map(w => truncatedAddress(w)).join(', ')}
            </i>
          </span>}
          {game.gameType !== '0' && <ShareGame className='mt-10' game={game} />}
        </div>
        {game.gameType === '0'
          ? <ShareGame game={game} />
          : (game && game.idGame && <NFTMetadata game={game} />)}
      </div>
    </Card>
  )
}

export default RandomGame
