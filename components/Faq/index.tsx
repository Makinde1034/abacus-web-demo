import styles from "./Faq.module.css";
import { FaqInfo } from "../../contants/Copies";
import { useState } from "react";
import { ImagesPath } from "../../contants/ImgPath";
import barIcon from "../../assets/images/dash.svg";
import arrowDownIcon from "../../assets/images/arrow-down.svg";

export const Faq = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleShowDescription = (index: number) => {
    if (activeIndex !== index) {
      setShowDescription(true);
      setActiveIndex(index);
      return;
    }
    setShowDescription(!showDescription);
    setActiveIndex(index);
  };

  return (
    <div className={styles.faq}>
      <div>
        <h3 className={styles.faq__header}>FAQs</h3>
        <p className={styles.faq__description}>
          Have some questions? We have probably already answered
        </p>
      </div>
      {FaqInfo.map((item, index) => {
        const isActiveIndex = index === activeIndex;
        return (
          <div key={index} className={styles.faq__wrap}>
            <div
              onClick={() => handleShowDescription(index)}
              className={styles.faq__question}
              key={index}
            >
              <h3>{item.question}</h3>
              <div className={styles.icon}>
                {
                  <img
                    src={
                      isActiveIndex && showDescription
                        ? ImagesPath.dashIcon
                        : ImagesPath.arrowDownIcon
                    }
                    alt=""
                  />
                }
              </div>
            </div>
            {showDescription && isActiveIndex ? (
              <div className={styles.faq__description}>
                <p>{item.answer}</p>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
};
