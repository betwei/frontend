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
import formatNumber from '../../../utils/formatNumber'

function PlayerGames({ onSelectedGame, className }: IPlayerGames) {
  const { account } = useWeb3React()
  const contract = useContract()
  const [events, setEvents] = useState({} as any)

  const [games, setGames] = useState([] as IRandomGame[])

  const getData = useCallback(async () => {
    setGames([])
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
      setEvents({
        cNewGameCreated: contract.events.NewGameCreated(null, getData),
        FinishGame: contract.events.FinishGame(null, getData)
      })
    }
  }, [contract, account])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    return () => {
      if (events) Object.keys(events)
        .forEach(event => events[event].removeAllListeners(event))
    }
  }, [events])

  return (
    <Card
      header='Tus juegos'
      classNameCard={className}
      classNameMain='overflow-y-auto h-32'>
      <div className={styles.player_games__items}>
        {games.sort((a, b) => parseInt(b.idGame || '0') - parseInt(a.idGame || '0'))
          .map((g, i) => (
            <span key={i} onClick={() => onSelectedGame && onSelectedGame(g)}>
              ({formatNumber(parseInt(g.idGame || '0'))}) {g.description}<br />
            </span>
          ))}
      </div>
    </Card>
  )
}

export default PlayerGames
