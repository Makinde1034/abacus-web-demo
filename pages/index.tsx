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
          <title>Abacus - Mission control for your money</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#0E1521" />
          <meta name="msapplication-navbutton-color" content="#0E1521" />
          <meta
            name="description"
            content="Abacus - Mission control for your money"
          />
          <meta
            name="keywords"
            content="Abacus - Mission control for your money"
          />
          <meta
            property="og:title"
            content="Abacus - Mission control for your money"
          />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://www.trustabacus.com/" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/getabacus/image/upload/v1679478781/web/Group_6534_nw2b25.png"
          />
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
            <li onClick={() => scrollToSection(faqRef)}>FAQs</li>
          </ul>
          <div
            onClick={() => setShowMobileNav(!showMobileNav)}
            className={styles.nav__menu}
          >
            <img src={ImagesPath.menuIcon} alt="menu icon" />
          </div>
        </nav>
        <section className="section">
          <div className={styles.hero}>
            <h1 data-aos="fade-in">
              Mission <span>control </span>for your money
            </h1>
            <p data-aos="fade-in">
              Abacus helps you better track, manage and spend your money by
              unifying your banking, investment and crypto accounts into a
              single, secure app.
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
        <section className="section__white">
          <div>
            <div ref={featureRef} className={styles.discover}>
              <div className={styles.discover__l}>
                <h3>What can you do with Abacus?</h3>
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
                  data-aos="fade-in"
                  key={index}
                  className={styles.discover__grid__box}
                >
                  <img src={item.imageUrl} alt="mockups" />
                  <h3>{item.title}</h3>
                  <p>{item.descriptio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className={styles.wallet}>
            <div className={styles.wallet__l}>
              <h3 data-aos="fade-in">
                Budget smarter with Abacus <span>wallet</span>
              </h3>
              <p data-aos="fade-in" className={styles.wallet__l__para}>
                Gain better control over your money by planning and budgeting on
                Abacus. Create pockets for essential expenses (e.g., food,
                rent). Allocate funds to each pocket as budgeted expenses and
                track spending against the plans to manage your money more
                effectively.
              </p>
            </div>
            <div className={styles.wallet__r}>
              <img
                data-aos="fade-in"
                src={ImagesPath.walletMockup}
                alt="wallet mockup"
              />
            </div>
          </div>
        </section>
        <section className="section__white">
          <div className={styles.pocket}>
            <div className={styles.pocket__l}>
              <img src={ImagesPath.pocketMockup} alt="pocket mockup" />
            </div>
            <div className={styles.pocket__r}>
              <h3 data-aos="fade-in">
                Pay using <span>Abacus</span> or
              </h3>
              <h3 data-aos="fade-in"> your linked bank accounts</h3>

              <p data-aos="fade-in">
                Pay anyone, anytime. Use your bank accounts or Abacus wallet to
                transfer money to friends and family, top up your phone, or pay
                your bills
              </p>
            </div>
          </div>
        </section>
        <section className="section__blue" ref={securityRef}>
          <div className={styles.security}>
            <div className={styles.security__l}>
              <h3 data-aos="fade-in">Your finances, safe and secure</h3>
              <p data-aos="fade-in">
                Peace of mind comes first with Abacus. We protect your funds and
                personal information with the highest commitment to safety and
                discretion. When it comes to your money, privacy, and security,
                there is no room for exceptions.
              </p>
            </div>
            <div className={styles.security__r}>
              <img data-aos="fade-in" src={ImagesPath.securityImage} alt="" />
            </div>
          </div>
        </section>
        <section ref={reviewsRef} className="section__white">
          <div className={styles.reviews}>
            <h3 className={styles.reviews__header}>
              The reviews speak for themselves
            </h3>
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
          </div>
        </section>
        <div ref={faqRef}> </div>
        <FaqGrid />
        <section className={styles.faq}>
          <div className={styles.accounts}>
            <h3 data-aos="fade-in">
              One app all your <span>accounts</span>
            </h3>
            <p data-aos="fade-in">
              Connect and manage all your money—banking, stocks, savings, and
              crypto—in one place for a better financial experience.
            </p>
            <StoreButtons />
            <div className={styles.accounts__mockup}>
              <img
                src={ImagesPath.accountMockupL}
                alt="mockup"
                className={styles.accounts__mockup__l}
              />
              <img
                src={ImagesPath.accountMockupC}
                alt="mockup"
                className={styles.accounts__mockup__c}
              />
              <img
                src={ImagesPath.accountMockupR}
                alt="mockup"
                className={styles.accounts__mockup__r}
              />
              <img
                data-aos="fade-in"
                src={ImagesPath.accountsMockup}
                alt="mockup"
                className={styles.accounts__mockup__sm}
              />
              <div className={styles.accounts__mockup__overlay}></div>
            </div>
          </div>
        </section>
        <footer>
          <div className={styles.footer}>
            <div className={styles.footer__wrap}>
              <div className={styles.footer__about}>
                <img height={100} src="/image/logo.svg" alt="Abacus Logo" />
                <p>
                  We provide an all-in-one financial solution for tracking and
                  managing your money.
                </p>
                <Link href="/chat">
                  <p style={{ textDecoration: "underline", color: "white" }}>
                    support@abacus.com
                  </p>
                </Link>
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
                    <img
                      src={SocialMediaIcons.instagram}
                      alt="Instagram icon"
                    />
                  </a>
                  <a href={AppDetails.social.twitter}>
                    <img src={SocialMediaIcons.twitter} alt="Twitter icon" />
                  </a>
                  <a href={AppDetails.social.facebook}>
                    <img src={SocialMediaIcons.facebook} alt="Facebook icon" />
                  </a>
                  <a href={AppDetails.social.telegram}>
                    <img src={SocialMediaIcons.telegram} alt="Telegram icon" />
                  </a>
                  <a href={AppDetails.social.linkedin}>
                    <img
                      src={SocialMediaIcons.linkedInIcon}
                      alt="Linkedin icon"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className={styles.footer__date}>
              <p> © {new Date().getFullYear()} Abacus Technologies</p>
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
