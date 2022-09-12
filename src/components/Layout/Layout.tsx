import Head from 'next/head'
import Image from 'next/image'
import { SiGithub } from 'react-icons/si'

// Components
import Navbar from '../shared/navbar/Navbar'
import Logo from '../shared/atoms/logo/Logo'

import styles from './Layout.module.scss'

export default function Layout({ children }: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Apuestas - Platzi</title>
        <meta name='description' content='Tú origanizas, Tú ganas' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={`${styles.main} py-20 px-1 md:px-8 lg:px-20`}>
        <Navbar></Navbar>
        {children}
      </main>

      <footer className={`${styles.footer} mx-1 md:mx-8 lg:mx-20`}>
        <Logo />
        <a
          className='flex gap-4'
          target='_blank'
          rel='noopener noreferrer'
          href='https://platzi.com/'>
          <Image src='/platzi-isotipo@2x.webp' width={30} height={30} alt='isotipo' />
          <Image src='/logotipo-platzi.webp' width={52} height={30} alt='isotipo' />
        </a>
        <a
          href='https://github.com/betwei'
          target='_blank'
          rel='noopener noreferrer'
        >
          <SiGithub size={30} />
        </a>
      </footer>
    </div>
  )
}
