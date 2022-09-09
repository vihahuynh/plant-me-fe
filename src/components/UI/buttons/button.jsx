import styles from "./button.module.scss";

const Button = ({
  text,
  size,
  onClick,
  className,
  borderRadius = "circle",
}) => {
  const buttonClassName = `${styles.customBtn} ${styles[size]} ${className} ${styles[borderRadius]}`;
  return (
    <button className={buttonClassName} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
