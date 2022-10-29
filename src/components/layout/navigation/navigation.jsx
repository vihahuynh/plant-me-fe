import { useDispatch, useSelector } from "react-redux";

import { BiUserCircle } from "react-icons/bi/index";
import { BiCartAlt } from "react-icons/bi/index";

import Logo from "../../UI/logo";
// import SearchBar from "../../UI/inputs/searchBar";
import LinkButton from "../../UI/buttons/linkbutton";
import NavigationItem from "./navigationItem";

import { Link, useHistory } from "react-router-dom";

import { authenticationActions } from "../../../store";

import styles from "./navigation.module.scss";

const Navigation = () => {
  const cartQuantity = useSelector((state) => state.cart.quantity);
  const authen = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = () => {
    localStorage.removeItem("loggedUser");
    dispatch(authenticationActions.logout());
    history.push("/");
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.mobileNav}>
        <span></span>
        <ul className={styles.mobileMenu}>
          <NavigationItem url="/" title="Home" type="mobile" />
          <NavigationItem url="/shop" title="Shop" type="mobile" />
          <NavigationItem url="/user/me" title="Account info" type="mobile" />
          <NavigationItem
            url="/user/order-history"
            title="My orders"
            type="mobile"
          />
          <NavigationItem url="/user/review" title="My reviews" type="mobile" />
          <NavigationItem
            url="/user/notification"
            title="My notification"
            type="mobile"
          />
          <NavigationItem
            url="/user/favorite-products"
            title="Favorite products"
            type="mobile"
          />
          <NavigationItem
            url="/user/address"
            title="Delivery addresses"
            type="mobile"
          />
          <NavigationItem url="/about" title="About Us" type="mobile" />
          <NavigationItem url="/contact" title="Contact" type="mobile" />
        </ul>
      </div>
      <div className={styles.mainNav}>
        <Logo />
        <ul className={styles.navList}>
          <NavigationItem url="/" title="Home" />
          <NavigationItem url="/shop" title="Shop" />
          {/* <NavigationItem url="blogs" title="Blog" /> */}
          <NavigationItem url="/about" title="About Us" />
          <NavigationItem url="/contact" title="Contact" />
        </ul>
      </div>
      <div className={styles.subNav}>
        {authen.isLoggedIn ? (
          <>
            <Link to="/cart" className={styles.cart}>
              <BiCartAlt className={styles.icon} />
              <span className={styles.quantity}>{cartQuantity}</span>
            </Link>
            <div className={styles.userMenuBox}>
              <BiUserCircle className={styles.icon} />
              <ul className={styles.userMenu}>
                <NavigationItem
                  url="/user/me"
                  title="Account info"
                  type="user"
                />
                <NavigationItem
                  url="/user/order-history"
                  title="Orders"
                  type="user"
                />
                <NavigationItem
                  url="/user/reviews"
                  title="Reviews"
                  type="user"
                />
                <NavigationItem
                  url="/user/notification"
                  title="Notification"
                  type="user"
                />
                <NavigationItem
                  url="/user/favorite-products"
                  title="Favorite products"
                  type="user"
                />
                <NavigationItem
                  url="/user/address"
                  title="Delivery addresses"
                  type="user"
                />
                <li onClick={logout}>Log out</li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <LinkButton
              url="/signin"
              text="Sign in"
              size="small"
              borderRadius="square"
            />
            <LinkButton
              url="/signup"
              text="Sign up"
              size="small"
              theme="light"
              borderRadius="square"
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
