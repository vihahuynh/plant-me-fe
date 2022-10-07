import styles from "./progressBar.module.scss";

const ProgressBar = ({ percent }) => {
  return (
    <span className={styles.container}>
      <span className={styles.percent} style={{ width: `${percent}%` }}></span>
    </span>
  );
};

export default ProgressBar;
