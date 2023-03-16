/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";
import { TwitterReviews as tweets } from "../contants/Copies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import { v4 as uuidv4 } from "uuid";

import { AnalyticsBrowser } from "@segment/analytics-next";
import { DiscoverCopies, WalletInfoCopies } from "../contants/Copies";
import { Faq } from "../components/Faq";
import { ImagesPath, SocialMediaIcons } from "../contants/ImgPath";
import { motion } from "framer-motion";
import { TweetCard } from "../components/TweetCard";
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
  const featureRef = useRef(null);
  const reviewsRef = useRef(null);
  const faqRef = useRef(null);
  const securityRef = useRef(null);

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

  const scrollToSection = (ref: any) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Head>
          <title>Abacus - Manage your money</title>
          <meta name="description" content="Misson control for your money" />
          <link rel="icon" href="/image/favicon.ico" />
        </Head>
        <nav className={styles.nav}>
          <div className={styles.nav__logo}>
            <img height={100} src="/image/logo.svg" alt="Abacus Logo" />
          </div>
          <ul>
            <li onClick={() => scrollToSection(featureRef)}>Features</li>
            <li>Security</li>
            <li onClick={() => scrollToSection(reviewsRef)}>Reviews</li>
            <li onClick={() => scrollToSection(reviewsRef)}>FAQS</li>
          </ul>
          <div className={styles.nav__menu}>
            <img src={ImagesPath.menuIcon} alt="" />
          </div>
        </nav>
        <section className={styles.hero}>
          <h1>
            Mission <span>control </span>for your money
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
                src={ImagesPath.appStoreLogo}
                alt="App store icon"
              />
            </button>
            <button>
              <span>Google Play</span>
              <img
                height={30}
                src={ImagesPath.playStoreLogo}
                alt="Play store icon"
              />
            </button>
          </div>

          <div className={styles.hero__mockup}>
            <img src={ImagesPath.heroImage} alt="hero-mockup" />
          </div>
          {/* absolute elements */}
          <div className={styles.hero__roadmap_r}>
            <img src={ImagesPath.rightRoadMapLine} alt="road map image" />
          </div>
          <div className={styles.hero__roadmap_l}>
            <img src={ImagesPath.leftRoadMapLine} alt="road map image" />
          </div>
          <motion.div
            initial={{ x: "100px" }}
            animate={{ x: "0px" }}
            transition={{ duration: 0.5 }}
            className={styles.carbon}
          >
            <img
              className={styles.float__icons}
              src={ImagesPath.carbonIcon}
              alt="carbon-icon"
            />
          </motion.div>
          <div className={styles.arrows__r}>
            <img
              src="https://res.cloudinary.com/dlinffsds/image/upload/v1678825362/arrows_iyjbvc.svg"
              alt="arrow"
            />
          </div>
          <motion.div
            initial={{ x: "100px" }}
            animate={{ x: "0px" }}
            transition={{ duration: 0.5 }}
            className={styles.fcmb}
          >
            <img src={ImagesPath.fcmbIcon} alt="arrow" />
          </motion.div>
          <motion.div
            initial={{ x: "-100px" }}
            animate={{ x: "0px" }}
            transition={{ duration: 0.5 }}
            className={styles.kuda}
          >
            <img src={ImagesPath.kudaIcon} alt="kuda-icon" />
          </motion.div>
          <motion.div
            initial={{ x: "-100px" }}
            animate={{ x: "0px" }}
            transition={{ duration: 0.5 }}
            className={styles.abeg}
          >
            <img src={ImagesPath.abegIcon} alt="" />
          </motion.div>
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
                <img src={ImagesPath.startIcon} alt="" />
              </div>
            ))}
          </div>
        </section>
        <section>
          <div ref={featureRef} className={styles.discover}>
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
          <div className={styles.wallet__r}>
            <img src={ImagesPath.walletMockup} alt="" />
          </div>
        </section>
        <section className={styles.pocket}>
          <div className={styles.pocket__l}>
            <img src={ImagesPath.pocketMockup} alt="" />
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
        <section ref={reviewsRef} className={styles.reviews}>
          <h3>
            The reviews speak <br /> for themselves
          </h3>
          <div className={styles.reviews__marquee}>
            <div className={styles.reviews__container}>
              {tweets.map((item, index) => (
                <TweetCard {...item} />
              ))}
              {tweets.slice(0, 4).map((item, index) => (
                <TweetCard {...item} />
              ))}
            </div>
            <div className={styles.reviews__container2}>
              {tweets.reverse().map((item, index) => (
                <TweetCard {...item} />
              ))}
              {tweets.slice(0, 4).map((item, index) => (
                <TweetCard {...item} />
              ))}
            </div>
          </div>
        </section>
        <section ref={faqRef} className={styles.faq}>
          <div className={styles.faq__box}>
            <div className={styles.faq__box__l}>
              <img src={ImagesPath.faqImage} alt="" />
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
                  src={ImagesPath.appStoreLogo}
                  alt="App store icon"
                />
              </button>
              <button>
                <span>Google Play</span>
                <img
                  height={30}
                  src={ImagesPath.playStoreLogo}
                  alt="Play store icon"
                />
              </button>
            </div>
            <div className={styles.accounts__mockup}>
              <img src={ImagesPath.accountsMockup} alt="" />
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={styles.footer__about}>
            <img height={100} src="/image/logo.svg" alt="Abacus Logo" />
            <p>
              Abacus is an app that provides an all-in-one solution for managing
              and monitoring your financial apps and crypto accounts.
            </p>
            <a href="">support@abacus.com</a>
          </div>
          <div className={styles.footer__learn}>
            <ul>
              <li>Learn More</li>
              <li>Features</li>
              <li>Security</li>
              <li>Reviews</li>
              <li>FAQs</li>
            </ul>
          </div>
          <div className={styles.footer__media}>
            <p>Stay in Touch</p>
            <div>
              <a href="">
                <img src={SocialMediaIcons.instagram} alt="" />
              </a>
              <a href="">
                <img src={SocialMediaIcons.twitter} alt="" />
              </a>
              <a href="">
                <img src={SocialMediaIcons.facebook} alt="" />
              </a>
              <a href="">
                <img src={SocialMediaIcons.telegram} alt="" />
              </a>
              <a href="">
                <img src={SocialMediaIcons.linkedInIcon} alt="" />
              </a>
            </div>
          </div>
        </footer>
      </div>
      <ToastContainer
        containerId="access-succeed"
        draggable={false}
        position="bottom-center"
        toastClassName="custom-toast"
        hideProgressBar
        theme="dark"
        limit={1}
      />
    </div>
  );
};

export default Home;
