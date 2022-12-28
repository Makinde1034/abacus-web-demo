/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next';
import Head from 'next/head';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';

const Livechat: NextPage = () => {
  const [loaded, setLoaded] = useState(false);

  const infoList = [
    {
      name: 'Chat with a human',
      onClick: () => {
        window?.Tawk_API?.toggle?.();
      }
    },
    {
      name: 'Send an email',
      onClick: () => {
        window.location.href = `mailto:support@trustabacus.com`
      }
    },
    {
      name: 'Book a call with us',
      onClick: () => {
        window.location.href = `https://calendly.com/kinwumi/abacus-call`
      }
    },
    {
      name: 'Join our community',
      onClick: () => {
        window.location.href = `https://t.me/+y2sIIa5B4ZkwMThk`
      }
    },
  ]

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 8000);
  })

  return (
    <div className={styles.container} style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Head>
        <title>Abacus Live Chat - Manage your money</title>
        <meta name="description" content="Misson control for your money" />
        <link rel="icon" href="/image/favicon.ico" />
      </Head>

      <Script type="text/javascript" src="/js/live-chat.js" />

      {
        loaded ? (
          <div className='mb-l'>
            <div className="flex-center-x mb">
              <img
                src="/image/logo.svg"
                alt="Abacus Logo"
                className="logo"
              />
            </div>

            {
              infoList.map((item, index) => {
                return (
                  <button className="button mb-l" key={index} onClick={item.onClick}>
                    { item.name }
                  </button>
                )
              })
            }
          </div>
        ) : (
          <div className="lds-ring">
            <div></div><div></div><div></div><div></div>
          </div>
        )
      }

      
    </div>
  )
}

export default Livechat
