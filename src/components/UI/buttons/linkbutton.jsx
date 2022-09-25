import styles from "./linkButton.module.scss";

const LinkButton = ({
  text,
  size = "medium",
  url,
  borderRadius = "circle",
  className,
  type = "primary",
}) => {
  const buttonClassName = `${styles.customBtn} ${styles[size]} ${
    styles[borderRadius]
  } ${className || ""} ${styles[type]}`;
  return (
    <a className={buttonClassName} href={url}>
      {text}
    </a>
  );
};

export default LinkButton;
