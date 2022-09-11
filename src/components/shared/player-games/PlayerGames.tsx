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
      setGames(((await contract.methods.playerGames(account).call()) as string[]).map(
        r => ({
          idGame: r.slice(0, r.indexOf('-')),
          description: r.slice(r.indexOf('-') + 1)
        })))
      setLoading(false)
    }
  }, [contract, account])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    const newGameEvent = contract ? contract.events.NewGameCreated(null, getData) : null
    const enrolledToGameEvent = contract ? contract.events.EnrolledToGame(null, getData) : null
    return () => {
      if (newGameEvent) newGameEvent.removeAllListeners('NewGameCreated')
      if (enrolledToGameEvent) enrolledToGameEvent.removeAllListeners('EnrolledToGame')
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
