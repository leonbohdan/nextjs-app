import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import Link from 'next/link'

export default function Index() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Create Next App</h1>

        <button>
          <Link href='/address'>To address</Link>
        </button>

        <button>
          <Link href='/summary'>To summary</Link>
        </button>
      </main>
    </div>
  );
}
