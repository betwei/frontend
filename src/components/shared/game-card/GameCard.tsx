import React from "react";
import Button from "../atoms/buttons/Button";
import styles from "./GameCard.module.scss";
import { ICardOverview } from "../../../interfaces/gameOverview.interface";

function GameCard({ date, headerTitle, buttonTitle, className }: ICardOverview) {
  return (
    <div className={`${styles.gameCard} ${className}`}>
      <div className={styles.gameCard_header}>
        <p>{date}</p>
      </div>
      <hr className={styles.contrast} />
      <div className={styles.gameCard_content}>
        <p>{headerTitle}</p>
        <div className={styles.gameCard_players}>
          <img src="/team-1.png" alt="Football team" />
          <p className={styles.contrast}>VS</p>
          <img src="/team-2.png" alt="Football team" />
        </div>
        <div className={styles.gameCard_button}>
          <Button>{buttonTitle}</Button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
