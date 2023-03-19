import styles from "./MobileNav.module.css";
import { ImagesPath } from "../../contants/ImgPath";
import { useState } from "react";
import Link from "next/link";

export const MobileNav = (props: {
  showMobileNav: boolean;
  onMenuClick: (arg: boolean) => void;
  scrollToSection: (arg: any) => void;
  featureRef: any;
  securityRef: any;
  faqRef: any;
  reviewsRef: any;
}) => {
  const {
    featureRef,
    securityRef,
    faqRef,
    reviewsRef,
    scrollToSection,
    onMenuClick,
    showMobileNav,
  } = props;

  return (
    <>
      <div
        className={
          showMobileNav ? `${styles.nav} ${styles.nav__active} ` : styles.nav
        }
      >
        <ul onClick={() => onMenuClick(false)}>
          <li onClick={() => scrollToSection(featureRef)}>Features</li>
          <li onClick={() => scrollToSection(securityRef)}>Security</li>
          <li onClick={() => scrollToSection(reviewsRef)}>Reviews</li>
          <li onClick={() => scrollToSection(faqRef)}>FAQs</li>
        </ul>
        <div
          onClick={() => props.onMenuClick(false)}
          className={styles.nav__close}
        >
          <img src={ImagesPath.closeIcon} alt="close icon" />
        </div>
      </div>
      <div
        onClick={() => onMenuClick(false)}
        className={
          showMobileNav
            ? `${styles.backdrop} ${styles.backdrop__active}`
            : styles.backdrop
        }
      ></div>
    </>
  );
};