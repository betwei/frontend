import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

// Contract
import useContract from '../src/hooks/useContract'

// Types
import { ISendSuccess } from '../src/interfaces/contract.interface'
import { IRandomGame } from '../src/interfaces/randomForm.interface'

// Components
import RandomGame from '../src/components/shared/random-game/RandomGame'
import RandomForm from '../src/components/shared/random-form/RandomForm'
import Players from '../src/components/shared/players/Players'
import PlayerGames from '../src/components/shared/player-games/PlayerGames'

import styles from '../styles/Play.module.scss'

export default function Play() {
  const contract = useContract()
  const [randomGame, setRandomGame] = useState(null as IRandomGame | null | undefined)
  const { idGame } = useRouter()?.query as any

  const getGame = async (gameId?: string) => {
    if (gameId && contract) return {
      ...(await contract.methods.viewGame(gameId).call()),
      idGame: gameId,
      winners: await contract.methods.winners(gameId).call()
    }
  }

  const onSaveNewRandomGame = async (res?: ISendSuccess) => {
    setRandomGame(await getGame(res?.events?.NewGameCreated?.returnValues?.gameId))
  }

  const handleSelectedGame = async (g: string) => setRandomGame(await getGame(g))

  useEffect(() => {
    const finishGameEvent = contract ? contract.events.FinishGame() : null;
    const enrolledToGameEvent = contract ? contract.events.EnrolledToGame() : null;
    [finishGameEvent, enrolledToGameEvent].filter(e => e !== null).forEach(e => e.on('data',
      (data: any) => getGame(data?.returnValues.gameId).then(game => setRandomGame(game))))
    if (contract && idGame) getGame(idGame).then(game => setRandomGame(game))
    return () => {
      if (finishGameEvent) finishGameEvent.removeAllListeners('FinishGame')
      if (enrolledToGameEvent) enrolledToGameEvent.removeAllListeners('EnrolledToGame')
    }
  }, [contract])

  return (
    <div className={`${styles.play} md:grid md:grid-cols-3 gap-4`}>
      <div>
        {randomGame && <Players
          className={styles.play__sections}
          players={randomGame.members}
          owner={randomGame.owner} />}
        <PlayerGames
          className={styles.play__sections}
          onSelectedGame={handleSelectedGame} />
      </div>
      <div className='col-span-2'>
        {randomGame && <RandomGame
          className={styles.play__sections}
          game={randomGame}
          onChangeGame={async (idGame) => setRandomGame(await getGame(idGame))} />}
        <RandomForm
          className={styles.play__sections}
          onSave={onSaveNewRandomGame} />
      </div>
    </div>
  )
}