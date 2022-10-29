import styles from "./linkButton.module.scss";
import { Link } from "react-router-dom";

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
    <Link className={buttonClassName} to={url}>
      {text}
    </Link>
  );
};

export default LinkButton;
