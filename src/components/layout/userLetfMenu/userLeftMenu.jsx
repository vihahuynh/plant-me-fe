import styles from "./userLeftMenu.module.scss";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  FaUserAlt,
  FaHeart,
  FaStarHalfAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { BsBellFill } from "react-icons/bs";

const UserLeftMenu = () => {
  const authen = useSelector((state) => state.authentication);
  const path = useHistory().location.pathname.split("/").slice(-1)[0];
  const imgSrc = authen?.user?.avatarUrl || "/images/default-avatar.png";

  return (
    <div className={styles.container}>
      <img className={styles.avatarImg} src={imgSrc} alt="user-avatar" />
      <h3>{authen?.user?.username}</h3>
      <ul className={styles.list}>
        <li className={`${styles.item} ${path === "" ? styles.active : ""}`}>
          <Link to={`/user/${authen?.user?.id}`}>
            <FaUserAlt className={styles.icon} />
            My account
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "order-hitory" ? styles.active : ""
          }`}
        >
          <Link to={`/user/${authen?.user?.id}/order-history`}>
            <FaShoppingCart className={styles.icon} />
            My orders
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "reviews" ? styles.active : ""
          }`}
        >
          <Link to={`/user/${authen?.user?.id}/reviews`}>
            <FaStarHalfAlt className={styles.icon} />
            My reviews
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "notification" ? styles.active : ""
          }`}
        >
          <Link to={`/user/${authen?.user?.id}/notification`}>
            <BsBellFill className={styles.icon} />
            My notification
          </Link>
        </li>
        <li
          className={`${styles.item} ${
            path === "favorite-products" ? styles.active : ""
          }`}
        >
          <Link to={`/user/${authen?.user?.id}/favorite-products`}>
            <FaHeart className={styles.icon} />
            My favorite products
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserLeftMenu;
