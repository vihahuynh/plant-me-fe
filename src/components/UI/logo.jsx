import styles from "./logo.module.scss";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <span>Plant</span>
      <img src="/images/logo.png" alt="logo-a-plant" />
      <span>me</span>
    </div>
  );
};

export default Logo;
