import Head from 'next/head'
import Image from 'next/image'

// Components
import Navbar from '../shared/navbar/Navbar'

import styles from './Layout.module.scss'
import sylesWrapper from '../../../styles/_Wrapper.module.scss'

export default function Home({ children }: any) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Apuestas - Platzi</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Navbar></Navbar>
        {children}
      </main>

      <footer className={styles.footer}>
        <a
          href='https://github.com/betwei'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <Image src='/logo-betwei.svg' alt='Vercel Logo' width={72} height={16} />
        </a>
      </footer>
    </div>
  )
}