/* eslint-disable @next/next/no-img-element */
import type { NextPage } from "next";
import Head from "next/head";
import { ChangeEvent, FormEvent, useEffect, useState, useRef } from "react";
import styles from "../styles/Home.module.css";
import {
  TwitterReviews as tweets,
  MoreTwitterReviews,
} from "../contants/Copies";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { AppDetails } from "../contants/App";
import { v4 as uuidv4 } from "uuid";
import { MobileNav } from "../components/MobileNavigation";
import { FaqGrid } from "../components/FaqGrid";

import { AnalyticsBrowser } from "@segment/analytics-next";
import { DiscoverCopies, WalletInfoCopies } from "../contants/Copies";
import { Faq } from "../components/Faq";
import { ImagesPath, SocialMediaIcons } from "../contants/ImgPath";
import { motion } from "framer-motion";
import { TweetCard } from "../components/TweetCard";
import { StoreButtons } from "../components/StoreButtons";
import Link from "next/link";
import Aos from "aos";
import "aos/dist/aos.css";

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
  const [showMobileNav, setShowMobileNav] = useState(false);
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

  useEffect(() => {
    Aos.init({
      once: true,
      duration: 1000,
    });
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Head>
          <title>Abacus - Manage your money</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#0E1521" />
          <meta name="msapplication-navbutton-color" content="#0E1521" />
          <meta name="description" content="Misson control for your money" />
          <meta name="keywords" content="Misson control for your money" />
          <meta property="og:title" content="Misson control for your money" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.trustabacus.com/" />
          <meta
            property="og:description"
            content="Misson control for your money."
          />
          <link rel="icon" href="/image/favicon.ico" />
        </Head>
        <nav className={styles.nav}>
          <div className={styles.nav__logo}>
            <img height={100} src="/image/logo.svg" alt="Abacus Logo" />
          </div>
          <ul>
            <li onClick={() => scrollToSection(featureRef)}>Features</li>
            <li onClick={() => scrollToSection(securityRef)}>Security</li>
            <li onClick={() => scrollToSection(reviewsRef)}>Reviews</li>
            <li onClick={() => scrollToSection(faqRef)}>FAQS</li>
          </ul>
          <div
            onClick={() => setShowMobileNav(!showMobileNav)}
            className={styles.nav__menu}
          >
            <img src={ImagesPath.menuIcon} alt="menu icon" />
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
          <StoreButtons />

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
          <div className={styles.carbon}>
            <img
              className={styles.float__icons}
              src={ImagesPath.carbonIcon}
              alt="carbon-icon"
            />
          </div>
          <div className={styles.arrows__r}>
            <img
              src="https://res.cloudinary.com/dlinffsds/image/upload/v1678825362/arrows_iyjbvc.svg"
              alt="arrow"
            />
          </div>
          <div className={styles.fcmb}>
            <img src={ImagesPath.fcmbIcon} alt="arrow" />
          </div>
          <div className={styles.kuda}>
            <img src={ImagesPath.kudaIcon} alt="kuda-icon" />
          </div>
          <div className={styles.abeg}>
            <img src={ImagesPath.abegIcon} alt="abeg icon" />
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
              <div
                data-aos="fade-up"
                key={index}
                className={styles.discover__grid__box}
              >
                <img src={item.imageUrl} alt="mockups" />
                <h3>{item.title}</h3>
                <p>{item.descriptio}</p>
              </div>
            ))}
          </div>
        </section>
        <section className={styles.wallet}>
          <div className={styles.wallet__l}>
            <h3 data-aos="fade-up">
              Budget better with <span>wallet</span>
            </h3>
            <p data-aos="fade-up" className={styles.wallet__l__para}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat..
            </p>
            <div className={styles.wallet__l__grid}>
              {WalletInfoCopies.map((item, index) => (
                <div
                  data-aos="fade-up"
                  className={styles.wallet__grid__box}
                  key={index}
                >
                  <div>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.wallet__r}>
            <img
              data-aos="fade-up"
              src={ImagesPath.walletMockup}
              alt="wallet mockup"
            />
          </div>
        </section>
        <section className={styles.pocket}>
          <div className={styles.pocket__l}>
            <img src={ImagesPath.pocketMockup} alt="pocket mockup" />
          </div>
          <div className={styles.pocket__r}>
            <h3 data-aos="fade-up">
              Pay with <span>pockets</span> or directly{" "}
            </h3>
            <h3 data-aos="fade-up"> from your bank accounts</h3>

            <p data-aos="fade-up">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </section>
        <section ref={securityRef} className={styles.security}>
          <div className={styles.security__l}>
            <h3 data-aos="fade-up">We keep your funds safe</h3>
            <p data-aos="fade-up">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex commodo.
            </p>
          </div>
          <div className={styles.security__r}>
            <img data-aos="fade-up" src={ImagesPath.securityImage} alt="" />
          </div>
        </section>
        <section ref={reviewsRef} className={styles.reviews}>
          <h3>The reviews speak for themselves</h3>
          <div className={styles.reviews__marquee}>
            <div className={styles.reviews__container}>
              {tweets.map((item, index) => (
                <TweetCard key={index} {...item} />
              ))}
              {tweets.slice(0, 4).map((item, index) => (
                <TweetCard key={index} {...item} />
              ))}
            </div>
            <div className={styles.reviews__container2}>
              {MoreTwitterReviews.map((item, index) => (
                <TweetCard key={index} {...item} />
              ))}
              {MoreTwitterReviews.slice(0, 4).map((item, index) => (
                <TweetCard key={index} {...item} />
              ))}
            </div>
          </div>
        </section>
        <FaqGrid />
        <section ref={faqRef} className={styles.faq}>
          {/* incase the FAQ section needs to be changed */}
          {/* <div className={styles.faq__box}>
            <div className={styles.faq__box__l}>
              <img src={ImagesPath.faqImage} alt="" />
            </div>
            <div className={styles.faq__box__r}>
              <Faq />
              <FaqGrid />
            </div>
          </div> */}

          <div className={styles.accounts}>
            <h3 data-aos="fade-up">
              One app all your <span>accounts</span>
            </h3>
            <p data-aos="fade-up">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <StoreButtons />
            <div className={styles.accounts__mockup}>
              <img data-aos="fade-up" src={ImagesPath.accountsMockup} alt="" />
            </div>
          </div>
        </section>
        <footer className={styles.footer}>
          <div className={styles.footer__wrap}>
            <div className={styles.footer__about}>
              <img height={100} src="/image/logo.svg" alt="Abacus Logo" />
              <p>
                Abacus is an app that provides an all-in-one solution for
                managing and monitoring your financial apps and crypto accounts.
              </p>
              <Link href="/chat">support@abacus.com</Link>
            </div>
            <div className={styles.footer__learn}>
              <ul>
                <li>Learn More</li>
                <li onClick={() => scrollToSection(featureRef)}>Features</li>
                <li onClick={() => scrollToSection(securityRef)}>Security</li>
                <li onClick={() => scrollToSection(reviewsRef)}>Reviews</li>
                <li onClick={() => scrollToSection(faqRef)}>FAQs</li>
              </ul>
            </div>
            <div className={styles.footer__media}>
              <p>Stay in Touch</p>
              <div>
                <a href={AppDetails.social.instagram}>
                  <img src={SocialMediaIcons.instagram} alt="Instagram" />
                </a>
                <a href={AppDetails.social.twitter}>
                  <img src={SocialMediaIcons.twitter} alt="Twitter" />
                </a>
                <a href="">
                  <img src={SocialMediaIcons.facebook} alt="Facebook" />
                </a>
                <a href={AppDetails.social.telegram}>
                  <img src={SocialMediaIcons.telegram} alt="Telegram" />
                </a>
                <a href={AppDetails.social.linkedin}>
                  <img src={SocialMediaIcons.linkedInIcon} alt="Linkedin" />
                </a>
              </div>
            </div>
          </div>
          <div className={styles.footer__date}>
            <p> © {new Date().getFullYear()} Abacus Technologies</p>
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
      <MobileNav
        showMobileNav={showMobileNav}
        onMenuClick={(arg) => {
          setShowMobileNav(arg);
        }}
        scrollToSection={(arg) => {
          scrollToSection(arg);
        }}
        featureRef={featureRef}
        securityRef={securityRef}
        faqRef={faqRef}
        reviewsRef={reviewsRef}
      />
    </div>
  );
};

export default Home;
