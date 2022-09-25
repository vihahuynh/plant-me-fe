import styles from "./linkButton.module.scss";

const LinkButton = ({
  text,
  size = "medium",
  url,
  borderRadius = "circle",
  className,
  theme = "primary",
}) => {
  const buttonClassName = `${styles.customBtn} ${styles[size]} ${
    styles[borderRadius]
  } ${className || ""} ${styles[theme]}`;
  return (
    <a className={buttonClassName} href={url}>
      {text}
    </a>
  );
};

export default LinkButton;
