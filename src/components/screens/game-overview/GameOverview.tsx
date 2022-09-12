import React from "react";
import styles from "./GameOverview.module.scss";
import GameCard from "../../shared/game-card/GameCard";
import { generatePlayersMock } from "../../../../mocks/teamPlayers.mock";

function GameOverview() {
  return (
    <div className={styles.gameOverview}>
      <div className={styles.gameOverview_header}>
        <h3 className={styles.gameOverview_title}>Juegos del día</h3>
        <p className={styles.gameOverview_subtitle}>
          En vivo y próximos juegos
        </p>
      </div>
      <div className='md:grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {generatePlayersMock(6).map((item, index) => (
          <GameCard {...item} key={index} className='mt-2' />
        ))}
      </div>
    </div>
  );
}

export default GameOverview;
