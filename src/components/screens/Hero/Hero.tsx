import { useCallback, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

// Components
import Button from '../../shared/buttons/Button'

// Hooks
import { useShowModal } from '../../../hooks/useModal'
import useContract from '../../../hooks/useContract'

import styles from './Hero.module.scss'

function Hero() {
  const { active } = useWeb3React()
  const contract = useContract()

  const [random, setRandom] = useState('')
  const showModal = useShowModal({
    title: 'Numero random',
    children: random
  })

  const getData = useCallback(async () => {
    if (contract) setRandom(await contract.methods.s_randomWords(1).call())
  }, [contract])

  useEffect(() => {
    getData()
  }, [getData])

  return (
    <section className={(styles.hero)}>
      <div className={styles.hero_info}>
        <h3>Tú origanizas, Tú ganas</h3>
        <h1>BetWei</h1>
        <div className={styles.hero_footer}>
          <p>Usa el poder de blockchain a tu favor, juega en equipo.</p>
          <p>Sin intermediarios</p>
        </div>
        {active && (<Button onClick={showModal}>Obtener random</Button>)}
      </div>
      <div className='hero_image'>
        <img src='/main-landing.png' alt='Person very happy for gain cripto' />
      </div>
    </section>
  )
}

export default Hero