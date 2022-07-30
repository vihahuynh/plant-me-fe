import NavigationItem from "./navigationItem";
import styles from "./navigation.module.scss";

import { BiUserCircle } from "react-icons/bi/index";
import { BiCartAlt } from "react-icons/bi/index";

import Logo from "../../UI/logo";
import SearchBar from "../../UI/searchBar";

const Navigation = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.subNav}>
        <Logo />
        <ul className={styles.navList}>
          <NavigationItem title="Home" />
          <NavigationItem title="Shop" />
          <NavigationItem title="Blog" />
          <NavigationItem title="About Us" />
          <NavigationItem title="Contact" />
        </ul>
      </div>
      <div className={styles.subNav}>
        <SearchBar />
        <div>
          <BiUserCircle className={styles.icon} />
          <BiCartAlt className={styles.icon} />
        </div>
      </div>
    </div>
  );
};

export default Navigation;
