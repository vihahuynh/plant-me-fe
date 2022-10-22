import styles from "./userLeftMenu.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FaUserAlt,
  FaHeart,
  FaStarHalfAlt,
  FaShoppingCart,
  FaAddressBook,
} from "react-icons/fa";

import { BsBellFill } from "react-icons/bs";

const UserLeftMenu = () => {
  const authen = useSelector((state) => state.authentication);
  const path = useHistory().location.pathname.split("/")[2];
  console.log("path: ", path);
  const imgSrc = authen?.user?.avatarUrl || "/images/default-avatar.png";

  return (
    <div className={styles.container}>
      <img className={styles.avatarImg} src={imgSrc} alt="user-avatar" />
      <h3>{authen?.user?.username}</h3>
      <ul className={styles.list}>
        <li className={`${styles.item} ${path === "me" ? styles.active : ""}`}>
          <Link to="/user/me">
            <FaUserAlt className={styles.icon} />
            Account info
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "order-history" ? styles.active : ""
          }`}
        >
          <Link to="/user/order-history">
            <FaShoppingCart className={styles.icon} />
            Orders
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "reviews" ? styles.active : ""
          }`}
        >
          <Link to="/user/reviews">
            <FaStarHalfAlt className={styles.icon} />
            Reviews
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "notification" ? styles.active : ""
          }`}
        >
          <Link to="/user/notification">
            <BsBellFill className={styles.icon} />
            Notification
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "address" ? styles.active : ""
          }`}
        >
          <Link to="/user/address">
            <FaAddressBook className={styles.icon} />
            Delivery address
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "favorite-products" ? styles.active : ""
          }`}
        >
          <Link to="/user/favorite-products">
            <FaHeart className={styles.icon} />
            Favorite products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserLeftMenu;
