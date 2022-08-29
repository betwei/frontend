// Components
import About from '../src/components/screens/About/About'
import GameOverview from '../src/components/screens/game-overview/GameOverview'
import Hero from '../src/components/screens/Hero/Hero'

import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <section className={styles.home}>
      <div id="hero">
        <Hero />
      </div>
      <div id="game-over">
        <GameOverview />
      </div>
      <div id="about">
        <About />
      </div>
    </section>
  )
}
