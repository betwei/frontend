import Image from 'next/image'
import React from 'react'

import styles from './About.module.scss'

function About() {
  const items = [
    {
      title: 'Conecta Metamask',
      desc: 'Et hendrerit turpis habitant cursus semper ultrices in nunc. Erat eget etiam senectus vestibulum risus.'
    },
    {
      title: 'Reune a tus amigos',
      desc: 'At tristique elementum metus blandit id sed vel eu a. Diam sed feugiat diam nisi est. Dictumst elit.'
    },
    {
      title: 'Elijan un juego',
      desc: 'Eu metus, at orci dui sapien. Semper fames est ut gravida. Neque pellentesque risus ut odio.'
    },
    {
      title: 'Apuesta por el ganador, perdedor o empate',
      desc: 'Molestie faucibus amet sed ut gravida iaculis sed venenatis. Pulvinar id lacus condimentum ut. Non.'
    },
    {
      title: 'Recibe ganancias',
      desc: 'Ac morbi integer orci justo lobortis elementum, massa pulvinar quisque. Porttitor sit convallis quis.'
    }
  ]
  return (
    <div className={styles.about}>
      <section>
        <h3>Descentralizado y Anónimo</h3>
        <h1>Comienza ahora facilmente</h1>
        <h6>Conecta tu metamask y empieza a jugar</h6>
        <Image src='/landing2.png' width='595px' height='423px' alt='team' objectFit='cover'/>
      </section>
      <section>
        {items.map((item: any, i: number) => (
          <article key={i}>
            <span>{i+1}</span>
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