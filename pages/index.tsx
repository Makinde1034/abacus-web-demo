/* eslint-disable @next/next/no-img-element */
import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { ChangeEvent, FormEvent, useState } from 'react'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [disableCta, setDisableCta] = useState(false);

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);

    if (!value) {
      setEmailError('')
    }
  }

  const getAccessHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidEmail(email)) {
      setEmailError('');
      setDisableCta(true);

      fetch("https://abacus-temp.herokuapp.com/get-started", {
     
          // Adding method type
          method: "POST",
     
          // Adding body or contents to send
          body: JSON.stringify({
            email_address: email
          }),
     
          // Adding headers to the request
          headers: {
              "Content-type": "application/json; charset=UTF-8"
          }
      })
 
      // Converting to JSON
      .then(response => {
        if (response.ok) {
          setEmail('');
        }
      })

      // catch
      .catch((error) => console.log({error}))

      // final
      .finally(() => {
        setDisableCta(false);
      })

    } else {
      setEmailError('Enter a valid mail')
    }

  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Abacus - Manage your money</title>
        <meta name="description" content="Misson control for your money" />
        <link rel="icon" href="/image/favicon.ico" />
      </Head>

      <div className={styles.header}>
        <div className="flex-center-x">
          <img
            src="/image/logo.svg"
            alt="Abacus Logo"
            className="logo"
          />
        </div>

        <div className={styles['maw-lg']}>
          <h1 className="text-center display">
            Misson <span className="color-blue">control</span> for <span className="color-yellow">your money</span>
          </h1>
          <p className="text-center text-lg color-faded" style={{ padding: '0.5rem 0' }}>
            Abacus <span className="color-white">combine your bank, investment and crypto accounts</span> into a single, secure app so that you can <span className="color-white">analyze your finances, make transfers, buy airtime and pay your bills</span> more conveniently.
          </p>
        </div>


        <div className={styles['maw-sm']}>
          <form className="access-form" onSubmit={(e) => getAccessHandler(e)}>
            <div className="input-group">
              <input
                className={`input ${emailError?.length > 0 ? 'error' : ''}`}
                type="email"
                placeholder="Enter email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>

            <div className="input-cta">
              <button type="submit" className="button" disabled={disableCta}>
                {
                  disableCta ? <img width={45} alt="logo" src="/image/loader.svg" /> : 'Get Access'
                }
              </button>
            </div>
          </form>
        </div>
      </div>


      <div className={styles['mockup-p']}>
        <picture className={styles.mockup}>
            <source media="(max-width: 600px)" srcSet="https://res.cloudinary.com/getabacus/image/upload/v1663946753/web/mockup-1.png" />
            <img alt="mockup" src="https://res.cloudinary.com/getabacus/image/upload/v1663946753/web/mockup.png" className={styles['mockup-img']} />
        </picture>
      </div>
    </div>
  )
}

export default Home
