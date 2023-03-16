import styles from "./TweetCard.module.css";

export const TweetCard = (props: {
  imageUrl: string;
  name: string;
  userName: string;
  tweet: string;
}) => {
  const { imageUrl, name, userName, tweet } = props;
  return (
    <div className={styles.box}>
      <img
        className={styles.tweeter__icon}
        src="https://res.cloudinary.com/dlinffsds/image/upload/v1678878474/twitter-icon_vaaghz.svg"
        alt="twitter-logo"
      />
      <div className={styles.box__header}>
        <div className={styles.box__image}>
          <img src={imageUrl} alt="user image" />
        </div>
        <div className={styles.user__details}>
          <h3>{name}</h3>
          <p>{userName}</p>
        </div>
      </div>
      <p>{tweet}</p>
    </div>
  );
};
