import { useState } from 'react'

// Contract
import useContract from '../src/hooks/useContract'

// Types
import { ISendSuccess } from '../src/interfaces/contract.interface'
import { IRandomGame } from '../src/interfaces/randomForm'

// Components
import RandomGame from '../src/components/shared/random-game/RandomGame'
import RandomForm from '../src/components/shared/random-form/RandomForm'
import Players from '../src/components/shared/players/Players'
import PlayerGames from '../src/components/shared/player-games/PlayerGames'

import styles from '../styles/Play.module.scss'

export default function Play() {
  const contract = useContract()
  const [randomGame, setRandomGame] = useState(null as IRandomGame | null | undefined)

  const getGame = async (gameId?: string) => {
    if (gameId && contract) return {
      ...(await contract.methods.viewGame(gameId).call()), idGame: gameId
    }
  }

  const onSaveNewRandomGame = async (res?: ISendSuccess) => {
    setRandomGame(await getGame(res?.events?.NewGameCreated?.returnValues?.gameId))
  }

  const handleSelectedGame = (g: IRandomGame) => setRandomGame(g)

  return (
    <div className={styles.play}>
      <div>
        {randomGame && <Players
          className={styles.play__sections}
          players={randomGame.members}
          owner={randomGame.owner} />}
        <PlayerGames
          className={styles.play__sections}
          onSelectedGame={handleSelectedGame} />
      </div>
      <div>
        {randomGame && <RandomGame
          className={styles.play__sections}
          game={randomGame}
          onChangeGame={async (idGame) => {
            console.log(await getGame(idGame))
            setRandomGame(await getGame(idGame))
          }} />}
        <RandomForm
          className={styles.play__sections}
          onSave={onSaveNewRandomGame} />
      </div>
    </div>
  )
}