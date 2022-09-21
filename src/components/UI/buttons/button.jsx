import styles from "./button.module.scss";

const Button = ({
  text,
  size,
  onClick,
  className,
  borderRadius = "circle",
  type = "primary"
}) => {
  const buttonClassName = `${styles.customBtn} ${styles[size]} ${className} ${styles[borderRadius]} ${styles[type]}`;
  const customOnClick = (e) => {
    e.preventDefault()
    onClick()
  }
  return (
    <a href="/" className={buttonClassName} onClick={customOnClick}>
      {text}
    </a>
  );
};

export default Button;
