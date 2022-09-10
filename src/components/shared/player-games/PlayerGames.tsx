import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

// Contract
import useContract from '../../../hooks/useContract'

// Types
import { IPlayerGames } from '../../../interfaces/playerGames.interface'
import { IRandomGame } from '../../../interfaces/randomForm.interface'

// Components
import Card from '../card/Card'

import styles from './PlayerGames.module.scss'
import FormatNumber from '../format-number/FormatNumber'

function PlayerGames({ onSelectedGame, className }: IPlayerGames) {
  const { account } = useWeb3React()
  const contract = useContract()
  const [loading, setLoading] = useState(false)

  const [games, setGames] = useState([] as IRandomGame[])

  const getData = useCallback(async () => {
    setGames([])
    setLoading(true)
    if (contract) {
      const res = await contract.methods.playerGames(account).call()
      const gs = []
      for (let [i, game] of res.entries())
        gs[i] = {
          ...(await contract.methods.viewGame(game).call()),
          idGame: game,
          winners: await contract.methods.winners(game).call()
        }
      setGames(gs)
      setLoading(false)
    }
  }, [contract, account])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    const newGameEvent = contract ? contract.events.NewGameCreated(null, getData) : null
    return () => {
      if (newGameEvent) newGameEvent.removeAllListeners('NewGameCreated')
    }
  }, [contract, getData])

  return (
    <Card
      header='Tus juegos'
      classNameCard={className}
      classNameMain='overflow-y-auto h-32'
      loading={loading}>
      <div className={styles.player_games__items}>
        {games.sort((a, b) => parseInt(b.idGame || '0') - parseInt(a.idGame || '0'))
          .map((g, i) => (
            <span key={i}
              className='truncate'
              onClick={() => onSelectedGame && onSelectedGame(g.idGame || '0')}>
              (<FormatNumber number={g.idGame} />) {g.description}<br />
            </span>
          ))}
      </div>
    </Card>
  )
}

export default PlayerGames
