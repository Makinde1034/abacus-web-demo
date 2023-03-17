import { FaqInfo } from "../../contants/Copies";
import styles from "./FaqGrid.module.css";

export const FaqGrid = () => {
  return (
    <div className={styles.faqgrid}>
      <div className={styles.faqgrid__header}>
        <h3>Frequently Asked Questions</h3>
        <p>
          Everything you need to know about abacus and how it works. Cant find
          the answer you’re looking for? Please chat our friendly team
        </p>
      </div>
      <div className={styles.faq__info}>
        {FaqInfo.map((item, index) => (
          <div className={styles.faq__box}>
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
