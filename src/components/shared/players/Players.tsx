// Types
import { IPlayers } from '../../../interfaces/players.interface'

// Utils
import truncatedAddress from '../../../utils/truncatedAddress'

// Components
import Card from '../card/Card'

import styles from './Players.module.scss'

function Players({ players = [], owner, className }: IPlayers) {
  return (
    <Card
      header='Jugadores'
      classNameCard={className}
      classNameMain='overflow-y-auto h-32'>
      <div className={styles.players__main}>
        <span>{truncatedAddress(owner || '')}</span><br />
        {players.filter(player => player !== owner).map(player => (
          <div key={player}>
            {truncatedAddress(player)}<br />
          </div>
        ))}
      </div>
    </Card>
  )
}

export default Players
