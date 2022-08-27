import GameOverview from '../src/components/game-overview/GameOverview';

import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <section className={styles.hero}>
      <GameOverview></GameOverview>
    </section>
  );
}
