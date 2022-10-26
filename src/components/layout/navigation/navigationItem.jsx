import styles from "./navigationItem.module.scss";
import { Link } from "react-router-dom"

const NavigationItem = ({ url, title, type = "desk" }) => {
  let classNames;
  if (type === "desk") { classNames = styles.navItem }
  else if (type === "mobile") { classNames = styles.mobileNavItem }
  else classNames = styles.userNavItem
  return (
    <li className={classNames}>
      <Link to={`/${url}`}>{title}</Link>
    </li>
  );
};

export default NavigationItem;
