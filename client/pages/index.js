import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home() {

  const router = useRouter()
  const { pid } = router.query

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Интернет-магазин инструментов LeidTogi" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/logo192.png" />   
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <header>
        {pid}
      </header>  

      <ul>
        <li>
          <Link href="/shop/abc">
            <a>Go to pages/post/[pid].js</a>
          </Link>
        </li>
        <li>
          <Link href="/shop/abc?foo=bar">
            <a>Also goes to pages/post/[pid].js</a>
          </Link>
        </li>
        <li>
          <Link href="/shop/abc/a-comment">
            <a>Go to pages/post/[pid]/[comment].js</a>
          </Link>
        </li>
      </ul>

      <footer className={styles.footer}>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/favicon.ico" alt="Logo" width={16} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
