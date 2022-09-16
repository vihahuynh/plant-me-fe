import styles from "./linkButton.module.scss";

const LinkButton = ({ text, size, url, borderRadius, className }) => {
  const buttonClassName = `${styles.customBtn} ${styles[size]} ${styles[borderRadius]} ${className || ""}`;
  return (
    <a className={buttonClassName} href={url}>
      {text}
    </a>
  );
};

export default LinkButton;
