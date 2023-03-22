import styles from "../../styles/Home.module.css";
import { AppDetails } from "../../contants/App";
import { ImagesPath } from "../../contants/ImgPath";

export const StoreButtons = () => {
  return (
    <div className={styles.hero__buttons}>
      <a target="_blank" rel="noopener" href={AppDetails.appstore}>
        <button>
          <span>App Store</span>
          <img height={30} src={ImagesPath.appStoreLogo} alt="App store icon" />
        </button>
      </a>
      <a target="_blank" rel="noopener" href={AppDetails.playstore}>
        <button>
          <span>Google Play</span>
          <img
            height={30}
            src={ImagesPath.playStoreLogo}
            alt="Play store icon"
          />
        </button>
      </a>
    </div>
  );
};
