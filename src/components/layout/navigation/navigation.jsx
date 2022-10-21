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
      <div className={styles.subNav}>
        <Logo />
        <ul className={styles.navList}>
          <NavigationItem url="" title="Home" />
          <NavigationItem url="shop" title="Shop" />
          {/* <NavigationItem url="blogs" title="Blog" /> */}
          <NavigationItem url="about" title="About Us" />
          <NavigationItem url="contact" title="Contact" />
        </ul>
      </div>
      <div className={styles.subNav}>
        {/* <SearchBar /> */}
        <div className={styles.subNav}>
          <Link to="/cart" className={styles.cart}>
            <BiCartAlt className={styles.icon} />
            <span className={styles.quantity}>{cartQuantity}</span>
          </Link>
          {authen.isLoggedIn ? (
            <div className={styles.userMenuBox}>
              <BiUserCircle className={styles.icon} />
              <ul className={styles.userMenu}>
                <li>
                  <Link to="/user/me">Account info</Link>
                </li>
                <li>
                  <Link to="/user/order-history">Orders</Link>
                </li>
                <li>
                  <Link to="/user/reviews">Reviews</Link>
                </li>
                <li>
                  <Link to="/user/notification">Notification</Link>
                </li>
                <li>
                  <Link to="/user/favorite-products">Favorite products</Link>
                </li>
                <li onClick={logout}>Log out</li>
              </ul>
            </div>
          ) : (
            <>
              <LinkButton
                url="/signin"
                text="Sign in"
                size="small"
                borderRadius="square"
              />
              <LinkButton
                url="signup"
                text="Sign up"
                size="small"
                theme="light"
                borderRadius="square"
              />
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
