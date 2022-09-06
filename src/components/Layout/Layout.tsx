import Head from 'next/head'
import Image from 'next/image'
import { SiGithub } from 'react-icons/si'

// Components
import Navbar from '../shared/navbar/Navbar'

import styles from './Layout.module.scss'
import sylesWrapper from '../../../styles/_Wrapper.module.scss'

export default function Layout({ children }: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Apuestas - Platzi</title>
        <meta name='description' content='Tú origanizas, Tú ganas' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Navbar></Navbar>
        {children}
      </main>

      <footer className={styles.footer}>
        <Image src='/logo-betwei.svg' alt='Vercel Logo' width={189} height={59} />
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
