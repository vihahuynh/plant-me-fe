import styles from "./navigationItem.module.scss";
import { Link } from "react-router-dom"

const NavigationItem = ({ url, title }) => {
  return (
    <li className={styles.navItem}>
      <Link to={`/${url}`}>{title}</Link>
    </li>
  );
};

export default NavigationItem;
