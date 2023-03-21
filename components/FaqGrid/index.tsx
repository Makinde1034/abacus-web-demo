import { FaqInfo } from "../../contants/Copies";
import styles from "./FaqGrid.module.css";

export const FaqGrid = () => {
  return (
    <div className="section__white">
      <div className={styles.faqgrid}>
        <div className={styles.faqgrid__header}>
          <h3 data-aos="fade-in">Frequently Asked Questions</h3>
          <p data-aos="fade-in">
            Can't find the answer you are looking for? Please reach out to
            support@trustabacus.com
          </p>
        </div>
        <div className={styles.faq__info}>
          {FaqInfo.map((item, index) => (
            <div data-aos="fade-in" key={index} className={styles.faq__box}>
              <h3>{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
