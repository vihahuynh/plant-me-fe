import NavigationItem from "./navigationItem";
import styles from "./navigation.module.scss";
import { useSelector } from "react-redux";

import { BiUserCircle } from "react-icons/bi/index";
import { BiCartAlt } from "react-icons/bi/index";

import Logo from "../../UI/logo";
import SearchBar from "../../UI/searchBar";

const Navigation = () => {
  const cartQuantity = useSelector((state) => state.cart.quantity);

  return (
    <div className={styles.nav}>
      <div className={styles.subNav}>
        <Logo />
        <ul className={styles.navList}>
          <NavigationItem url="" title="Home" />
          <NavigationItem url="shop" title="Shop" />
          <NavigationItem url="blogs" title="Blog" />
          <NavigationItem url="about" title="About Us" />
          <NavigationItem url="contact" title="Contact" />
        </ul>
      </div>
      <div className={styles.subNav}>
        <SearchBar />
        <div>
          <BiUserCircle className={styles.icon} />
          <div className={styles.cart}>
            <BiCartAlt className={styles.icon} />
            <span className={styles.quantity}>{cartQuantity}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
