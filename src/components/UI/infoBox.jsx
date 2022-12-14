import styles from "./infoBox.module.scss";
import LinkButton from "./buttons/linkbutton";

const InfoBox = ({ text, btnText, url, theme = "primary" }) => {
  const classNames = theme
    ? `${styles.infoBox} ${styles[theme]}`
    : `${styles.infoBox} ${styles[theme]}`;
  return (
    <div className={styles.container}>
      <div className={classNames}>
        <img src="./images/logo.png" alt="logo" />
        <p>{text}</p>
        <LinkButton
          text={btnText}
          size="medium"
          url={url}
          className={styles.btn}
        />
      </div>
    </div>
  );
};

export default InfoBox;
