import styles from "./button.module.scss";

const Button = ({
  type,
  text,
  size,
  onClick,
  className,
  borderRadius = "circle",
  theme = "primary",
}) => {
  const buttonClassName = `${styles.customBtn} ${styles[size]} ${className} ${styles[borderRadius]} ${styles[theme]}`;

  return (
    <button className={buttonClassName} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
