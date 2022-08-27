import React from "react";
import stylesWrapper from "../../styles/_Wrapper.module.scss";
import styles from "./GameOverview.module.scss";

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
        <div>HERE_GAME_CARD</div>
        <div>HERE_GAME_CARD</div>
        <div>HERE_GAME_CARD</div>
        <div>HERE_GAME_CARD</div>
        <div>HERE_GAME_CARD</div>
        <div>HERE_GAME_CARD</div>
      </div>
    </div>
  );
}

export default GameOverview;
