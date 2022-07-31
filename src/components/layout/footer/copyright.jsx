import styles from "./copyright.module.scss";

const Copyright = () => {
  return (
    <div className={styles.container}>
      <p>&copy; plantme.com - All rights reserved.</p>
      <p>Design by Ananthu Dileep</p>
      <ul className={styles.list}>
        <li>Privacy</li>
        <li>Security</li>
        <li>Terms</li>
      </ul>
    </div>
  );
};

export default Copyright;
