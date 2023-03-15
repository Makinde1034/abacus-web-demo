/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { v4 as uuidv4 } from "uuid";

import { AnalyticsBrowser } from "@segment/analytics-next";
import { DiscoverCopies, WalletInfoCopies } from "../helpers";
import { Faq } from "../components/Faq";

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

  const tweets = [
    {
      name: "Kendrick Rh...",
      tweet: "Lorem  do eiusmod tempor incididunt utlabore et dolore ",
    },
    {
      name: "Kendrick Rh...",
      tweet: "Lorem ipsum dolor sit amet consectetur adipscising elit.",
    },
    {
      name: "Kendrick Rh...",
      tweet:
        "Lorem ipsum dolor sit amet consectetur adipscising elit, sed do eiusmod tempor.",
    },
    {
      name: "Kendrick Rh...",
      tweet:
        "Lorem ipsum dolor sit amet consectetur adipscising elit, sed do eiusmod tempor incididunt ut .",
    },
    {
      name: "Kendrick Rh...",
      tweet:
        "Lorem ipsum dolor sit amet consectetur adipscising elit, sed do eiusmod tempor .",
    },
  ];

  const tweets2 = [
    {
      name: "bryhs uiuty.",
      tweet:
        "Lorem  do eiusmod tempor incididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis ",
    },
    {
      name: "Kendrick Rh...",
      tweet: "Lorem ipsum dolor sit amet consectetur adipscising elit.",
    },
    {
      name: "John",
      tweet:
        "Lorem iincididunt utlabore et dolore magna aliqua. Ut enim ad minim veniam, quis",
    },
    {
      name: "Kendrick Rh...",
      tweet:
        "Lorem ipsum dolor sit amet consectetur adipscising elit, sed do eiusmod tempor incididunt ut .",
    },
    {
      name: "Kendrick Rh...",
      tweet: "Lorem ipsum dolor sit amet consectetur adipscising elit, sed do",
    },
  ];

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
        <section className={styles.marquee}>
          <div className={styles.marquee__container}>
            {[...Array(20)].map((item, key) => (
              <div key={key}>
                <p>ONE APP ALL YOUR ACCOUNTS</p>
                <img
                  src="https://res.cloudinary.com/dlinffsds/image/upload/v1678861483/Star_1_geekvj.svg"
                  alt=""
                />
              </div>
            ))}
          </div>
        </section>
        <section>
          <div className={styles.discover}>
            <div className={styles.discover__l}>
              <h3>
                Discover the key features <br /> of Abacus mobile app
              </h3>
            </div>
            <div className={styles.discover__r}>
              <p>
                This innovative app is equipped with a range of powerful
                features that can help you stay on top of your finances and
                achieve your financial goals. Here are the features that makes
                it valuable.
              </p>
            </div>
          </div>
          <div className={styles.discover__grid}>
            {DiscoverCopies.map((item, index) => (
              <div className={styles.discover__grid__box}>
                <img src={item.imageUrl} alt="mockups" />
                <h3>{item.title}</h3>
                <p>{item.descriptio}</p>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.wallet}>
          <div className={styles.wallet__l}>
            <h3>
              Enhanced budgeting via <span>wallet</span>
            </h3>
            <p className={styles.wallet__l__para}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat..
            </p>
            <div className={styles.wallet__l__grid}>
              {WalletInfoCopies.map((item, index) => (
                <div className={styles.wallet__grid__box} key={index}>
                  <div style={{ marginRight: "10px" }}>
                    <img height={30} src={item.imageUrl} alt="" />
                  </div>
                  <div>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.wallet__r}></div>
        </section>
        <section className={styles.pocket}>
          <div className={styles.pocket__l}>
            <img
              src="https://res.cloudinary.com/dlinffsds/image/upload/v1678866557/Group_2079_fzzkh2.svg"
              alt=""
            />
          </div>
          <div className={styles.pocket__r}>
            <h3>
              Pay with <span>pockets</span> or{" "}
            </h3>
            <h3>directly from your </h3>
            <h3> bank accounts</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </section>
        <section className={styles.reviews}>
          <h3>
            The reviews speak <br /> for themselves
          </h3>
          <div className={styles.reviews__marquee}>
            <div className={styles.reviews__container}>
              {tweets.map((item, index) => (
                <div className={styles.box}>
                  <div className={styles.box__header}>
                    <div className={styles.box__image}>
                      <img
                        src="https://res.cloudinary.com/dlinffsds/image/upload/v1678872304/Ellipse_249_inhkol.svg"
                        alt=""
                      />
                    </div>
                    <h3>{item.name}</h3>
                  </div>
                  <p>{item.tweet}</p>
                </div>
              ))}
              {tweets.slice(0, 4).map((item, index) => (
                <div className={styles.box}>
                  <div className={styles.box__header}>
                    <div className={styles.box__image}></div>
                    <h3>{item.name}</h3>
                  </div>
                  <p>{item.tweet}</p>
                </div>
              ))}
            </div>
            <div className={styles.reviews__container}>
              {tweets2.map((item, index) => (
                <div className={styles.box}>
                  <div className={styles.box__header}>
                    <div className={styles.box__image}></div>
                    <h3>{item.name}</h3>
                  </div>
                  <p>{item.tweet}</p>
                </div>
              ))}
              {tweets2.slice(0, 4).map((item, index) => (
                <div className={styles.box}>
                  <div className={styles.box__header}>
                    <div className={styles.box__image}></div>
                    <h3>{item.name}</h3>
                  </div>
                  <p>{item.tweet}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className={styles.faq}>
          <div className={styles.faq__box}>
            <div className={styles.faq__box__l}>
              <img
                src="https://res.cloudinary.com/dlinffsds/image/upload/v1678873935/Frame_325_ulnvij.svg"
                alt=""
              />
            </div>
            <div className={styles.faq__box__r}>
              <Faq />
            </div>
          </div>
          <div className={styles.accounts}>
            <h3>
              One app all your <span>accounts</span>
            </h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
            <div className={styles.accounts__mockup}>
              <img src="https://res.cloudinary.com/getabacus/image/upload/h_900/web/mockup.png" alt="" />
            </div>
          </div>
        </section>
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
