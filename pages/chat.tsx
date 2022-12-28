/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import styles from '../styles/Home.module.css';

const Livechat: NextPage = () => {

  return (
    <div className={styles.container} style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Head>
        <title>Abacus Live Chat - Manage your money</title>
        <meta name="description" content="Misson control for your money" />
        <link rel="icon" href="/image/favicon.ico" />
      </Head>

      <Script type="text/javascript" src="/js/live-chat.js" />

      <div className="lds-ring">
        <div></div><div></div><div></div><div></div>
      </div>
    </div>
  )
}

export default Livechat
