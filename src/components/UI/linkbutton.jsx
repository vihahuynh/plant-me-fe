import styles from "./button.module.scss";

const LinkButton = ({ text, size, url, className }) => {
  const buttonClassName = `${styles[size]} ${className}`;
  return (
    <a className={buttonClassName} href={url}>
      {text}
    </a>
  );
};

export default LinkButton;
