import styles from './Hero.module.scss'
import Team from '../Team/Team'

function Hero() {
  return (
    <section className={(styles.hero)}>
      <div className={styles.hero_info}>
        <h3>Tú origanizas, Tú ganas</h3>
        <h1>BetWei</h1>
        <div className={styles.hero_footer}>
          <p>Usa el poder de blockchain a tu favor, juega en equipo.</p>
          <p>Sin intermediarios</p>
        </div>
        <Team />
      </div>
      <div className='hero_image'>
        <img src='/main-landing.png' alt='Person very happy for gain cripto' />
      </div>
    </section>
  )
}

export default Hero