import React from "react";
import stylesWrapper from "../../../styles/_Wrapper.module.scss";
import styles from "./GameOverview.module.scss";
import GameCard from "../shared/game-card/GameCard";
import { generatePlayersMock } from "../../../mocks/teamPlayers.mock";

function GameOverview() {
  return (
    <div className={`${stylesWrapper.wrapper} ${styles.gameOverview}`}>
      <div className={styles.gameOverview_header}>
        <h3 className={styles.gameOverview_title}>Juegos del día</h3>
        <p className={styles.gameOverview_subtitle}>
          En vivo y próximos juegos
        </p>
      </div>
      <div className={styles.gameOverview_gameList}>
        {generatePlayersMock(6).map((item, index) => (
          <GameCard {...item} key={index}></GameCard>
        ))}
      </div>
    </div>
  );
}

export default GameOverview;
