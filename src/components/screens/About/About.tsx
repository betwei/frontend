import Image from 'next/image'
import React from 'react'

import styles from './About.module.scss'

function About() {
  const items = [
    {
      title: 'Conecta Metamask',
      desc: 'Úsala para conectarte a tu cuenta en Goerli, loguearte, realizar el pago de tus apuestas y retirar tu balance.'
    },
    {
      title: 'Reune a tus amigos',
      desc: 'Comparte tus juegos a tus amigos de forma fácil compartiendo una URL a través de QR o link de Whatsapp.'
    },
    {
      title: 'Elijan un juego',
      desc: 'Podrás elegir si quieres crear crear un juego aleatorio o realizar apuestas sobre partidos de futbol.'
    },
    {
      title: 'Apuesta por el ganador, perdedor o empate',
      desc: 'Realiza apuestas de la forma que consideres en tus equipos favoritos.'
    },
    {
      title: 'Recibe ganancias',
      desc: 'En cualquier momento podrás retirar los fondos ganados en las apuesta que realizaste de forma sencilla para cada juego.'
    }
  ]
  return (
    <div className={styles.about}>
      <section>
        <h3>Descentralizado y Anónimo</h3>
        <h1>Comienza ahora fácilmente</h1>
        <h6>Conecta tu metamask y empieza a jugar</h6>
        <Image src='/landing2.png' width='595px' height='423px' alt='team' objectFit='cover' />
      </section>
      <section>
        {items.map((item: any, i: number) => (
          <article key={i}>
            <span>{i + 1}</span>
            <div>
              <h2>{item.title}</h2>
              <p>{item.desc}</p>
            </div>
          </article>))}
      </section>
    </div>
  )
}

export default About