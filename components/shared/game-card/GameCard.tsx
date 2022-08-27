import React from "react";
import Button from "../buttons/Button";
import styles from "./GameCard.module.scss";

function GameCard() {
  return (
    <div className={styles.gameCard}>
      <div className={styles.gameCard_header}>
        <p>13 Oct 2022, 11:AM GMT +0</p>
      </div>
      <hr className={styles.contrast} />
      <div className={styles.gameCard_content}>
        <p>Copa del mundo, FIFA</p>
        <div className={styles.gameCard_players}>
          <img src="/team-1.png" alt="Football team" />
          <p className={styles.contrast}>VS</p>
          <img src="/team-2.png" alt="Football team" />
        </div>
        <div className={styles.gameCard_button}>
          <Button>Apostar Ya</Button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
