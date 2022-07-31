import styles from "./button.module.scss";

const Button = ({ text, size, onClick, className }) => {
  const buttonClassName = `${styles[size]} ${className}`;
  return (
    <button className={buttonClassName} onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
