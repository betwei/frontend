// Components
import GameOverview from '../src/components/game-overview/GameOverview';
import Hero from '../src/components/Hero/Hero';

import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <section className={styles.index}>
      <div id="hero">
        <Hero />
      </div>
      <div id="game-over">
        <GameOverview />
      </div>
    </section>
  );
}
