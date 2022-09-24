import { Rating } from "@mui/material";
import { Link } from "react-router-dom";

import { AiOutlineLike } from "react-icons/ai";

import styles from "./userReviewItem.module.scss";

const UserReviewItem = ({ item }) => {
  return (
    <div className={styles.userReviewItem}>
      <img
        src={
          item.product.images.find((img) => img.includes("eye")) ||
          item.product.images[0]
        }
        alt=""
      />

      <div className={styles.reviewContent}>
        <Link to={`/products/${item.product.id}`}>
          <h5 className={styles.productTitle}>{item.product.title}</h5>
        </Link>
        <Rating
          className={styles.rating}
          name="read-only"
          value={item.rating}
          readOnly
        />
        <h5>{item.title}</h5>
        <p>{item.content}</p>
        <div className={styles.iconBox}>
          <AiOutlineLike className={styles.icon} />
          <span>{item.like}</span>
        </div>
      </div>

      <div>
        {!!item.images.length &&
          item.images.map((img) => <img src={img} alt="" />)}
      </div>
    </div>
  );
};

export default UserReviewItem;
