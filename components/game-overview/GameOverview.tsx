import React from "react";
import stylesWrapper from "../../styles/_Wrapper.module.scss";
import styles from "./GameOverview.module.scss";
import GameCard from "../shared/game-card/GameCard";

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
        {Array.from(Array(6).keys()).map((item) => (
          <GameCard key={item}></GameCard>
        ))}
      </div>
    </div>
  );
}

export default GameOverview;
