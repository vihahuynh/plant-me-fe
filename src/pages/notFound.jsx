import styles from "./notFound.module.scss";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <img src="./images/logo.png" className={styles.logo} alt="logo" />
      <div>
        <p className={styles.message}>404</p>
        <p className={styles.message}>not found</p>
      </div>
    </div>
  );
};

export default NotFoundPage;
