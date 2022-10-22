import styles from "./infoBox.module.scss";
import LinkButton from "./buttons/linkbutton";

const InfoBox = ({ text, btnText, url }) => {
  return (
    <div className={styles.container}>
      <div className={styles.infoBox}>
        <img src="./images/logo.png" alt="" />
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
