import styles from "./button.module.scss";

const Button = ({
  type,
  text,
  size,
  onClick,
  className,
  borderRadius = "circle",
  theme = "primary",
  disabled = false
}) => {
  const buttonClassName = `${styles.customBtn} ${styles[size]} ${className} ${styles[borderRadius]} ${styles[theme]} ${disabled ? styles.disabled : ""}`;

  return (
    <button className={buttonClassName} onClick={onClick} type={type}>
      {text}
    </button>
  );
};

export default Button;
