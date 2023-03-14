/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { v4 as uuidv4 } from "uuid";

import { AnalyticsBrowser } from "@segment/analytics-next";

// default analytics id
const DEFAULT_ANALYTICS_ID = "Ys601cFu8aCdxoeS9sKO5qnAI55lZ4ow";

// we can export this instance to share with rest of our codebase.
export const analytics = AnalyticsBrowser.load({
  writeKey: DEFAULT_ANALYTICS_ID,
});

const Home: NextPage = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [disableCta, setDisableCta] = useState(false);

  const isValidEmail = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setEmail(value);

    if (!value) {
      setEmailError("");
    }
  };

  const handleBlur = () => {
    analytics.track("Entered Email", {
      email,
    });
  };

  const getAccessHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidEmail(email)) {
      analytics.track("Form Submitted", {
        email,
      });

      setEmailError("");
      setDisableCta(true);

      fetch("https://abacus-temp.herokuapp.com/get-started", {
        // Adding method type
        method: "POST",

        // Adding body or contents to send
        body: JSON.stringify({
          email_address: email,
        }),

        // Adding headers to the request
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        // Converting to JSON
        .then((response) => {
          if (response.ok) {
            toast("Early access invitation sent to your email 🎉");
            setEmail("");
            analytics.track("Form Received", {
              email,
            });
          }
        })

        // catch
        .catch((error) => {
          console.log({ error });
          analytics.track("Form Error", {
            email,
          });
        })

        // final
        .finally(() => {
          setDisableCta(false);
        });
    } else {
      setEmailError("Enter a valid mail");
    }
  };

  useEffect(() => {
    // get unique key
    const userKey = "abacus_userId";
    let userID = window.localStorage.getItem(userKey);

    if (!userID) {
      userID = uuidv4();
      // store new user id
      window.localStorage.setItem(userKey, userID || "");
    }

    analytics.identify(userID);
  }, []);

  return (
    <>
      <div className={styles.container}>
        <Head>
          <title>Abacus - Manage your money</title>
          <meta name="description" content="Misson control for your money" />
          <link rel="icon" href="/image/favicon.ico" />
        </Head>
        <nav className={styles.nav}>
          <div className={styles.nav__logo}>
            <img height={100} src="/image/logo.svg" alt="Abacus Logo" />
            <p>abacus</p>
          </div>
          <ul>
            <li>Features</li>
            <li>Scurity</li>
            <li>Reviews</li>
            <li>FAQS</li>
          </ul>
        </nav>
        <section className={styles.hero}>
          <h1>
            Mission <span>control </span>for <br /> your money
          </h1>
          <p>
            Abacus helps you better track, manage and spend your money by
            unifying your banking, investment and crypto accounts into a single,
            secure app.
          </p>
          <div className={styles.hero__buttons}>
            <button>
              <span>App Store</span>
              <img
                height={30}
                src="https://res.cloudinary.com/dlinffsds/image/upload/v1678826278/apple-icon_vsksjl.svg"
                alt="App store icon"
              />
            </button>
            <button>
              <span>Google Play</span>
              <img
                height={30}
                src="https://res.cloudinary.com/dlinffsds/image/upload/v1678828252/google_play_vtcizu.svg"
                alt="Play store icon"
              />
            </button>
          </div>

          <div className={styles.hero__mockup}>
            <img
              src="https://res.cloudinary.com/dlinffsds/image/upload/v1678823009/Mask_group_xql0xd.svg"
              alt="hero-mockup"
            />
          </div>
          {/* absolute elements */}
          <div className={styles.hero__roadmap_r}>
            <img
              src="https://res.cloudinary.com/dlinffsds/image/upload/v1678823317/map-line-right_od2rbc.svg"
              alt=""
            />
          </div>
          <div className={styles.hero__roadmap_l}>
            <img
              src="https://res.cloudinary.com/dlinffsds/image/upload/v1678824945/map-line-left_m3wesj.svg"
              alt=""
            />
          </div>
          <div className={styles.carbon}>
            <img
              className={styles.float__icons}
              src="https://res.cloudinary.com/dlinffsds/image/upload/v1678825127/carbon-icon_hdplxf.svg"
              alt="carbon-icon"
            />
          </div>
          <div className={styles.arrows__r}>
            <img
              src="https://res.cloudinary.com/dlinffsds/image/upload/v1678825362/arrows_iyjbvc.svg"
              alt="arrow"
            />
          </div>
          <div className={styles.kuda}>
            <img
              src="https://res.cloudinary.com/dlinffsds/image/upload/v1678825544/kuda_i2nzjt.svg"
              alt="kuda-icon"
            />
          </div>
          <div className={styles.abeg}>
            <img
              src="https://res.cloudinary.com/dlinffsds/image/upload/v1678825943/abeg-icon_o28wdp.svg"
              alt=""
            />
          </div>
          <div className={styles.arrows__l}>
            <img
              src="https://res.cloudinary.com/dlinffsds/image/upload/v1678825362/arrows_iyjbvc.svg"
              alt=""
            />
          </div>
        </section>
        {/*     
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
              Abacus helps you <span className="color-white"> better track, manage and spend</span> your money by <span className="color-white">unifying your banking, investment and crypto accounts</span> into a single, secure app.
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
                  onBlur={handleBlur}
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
              <source media="(max-width: 600px)" srcSet="https://res.cloudinary.com/getabacus/image/upload/h_600/web/mockup-1.png" />
              <img alt="mockup" src="https://res.cloudinary.com/getabacus/image/upload/h_900/web/mockup.png" className={styles['mockup-img']} />
          </picture>
        </div> */}
      </div>
      {/* <ToastContainer
        containerId="access-succeed"
        draggable={false}
        position="bottom-center"
        toastClassName="custom-toast"
        hideProgressBar
        theme="dark"
        limit={1}
      /> */}
    </>
  );
};

export default Home;
