import styles from "./button.module.scss";

const Button = ({
  btnType,
  text,
  size,
  onClick,
  className,
  borderRadius = "circle",
  type = "primary",
}) => {
  const buttonClassName = `${styles.customBtn} ${styles[size]} ${className} ${styles[borderRadius]} ${styles[type]}`;

  return (
    <button className={buttonClassName} onClick={onClick} type={btnType}>
      {text}
    </button>
  );
};

export default Button;
