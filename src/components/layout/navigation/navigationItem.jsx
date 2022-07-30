import styles from "./navigationItem.module.scss";

console.log(styles);

const NavigationItem = ({ title }) => {
  return (
    <li className={styles.navItem}>
      <a href={title}>{title}</a>
    </li>
  );
};

export default NavigationItem;
