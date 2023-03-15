import styles from "./Faq.module.css";
import { FaqInfo } from "../../helpers";
import { useState } from "react";

export const Faq = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleShowDescription = (index: number) => {
    if (activeIndex === index) {
      setShowDescription(false);
    }
    setShowDescription(!showDescription);
    setActiveIndex(index);
  };

  return (
    <div className={styles.faq}>
      <div>
        <h3 className={styles.faq__header}>FAQs</h3>
        <p className={styles.faq__description}>
          Have some questions? We've probably already answered
        </p>
      </div>
      {FaqInfo.map((item, index) => {
        const isActiveIndex = index === activeIndex;
        return (
          <div className={styles.faq__wrap}>
            <div
              onClick={() => handleShowDescription(index)}
              className={styles.faq__question}
              key={index}
            >
              <h3>{item.title}</h3>
              <div className={styles.icon}>
                {isActiveIndex && showDescription ? "-" : "+"}
              </div>
            </div>
            {showDescription && isActiveIndex ? (
              <div className={styles.faq__description}>
                <p>{item.description}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
