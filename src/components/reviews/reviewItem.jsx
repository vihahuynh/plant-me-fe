import { useState } from "react";

import styles from "./reviewItem.module.scss";
import Rating from "@mui/material/Rating";
import Moment from "react-moment";

import { AiFillLike, AiOutlineLike } from "react-icons/ai/index";

import reviewService from "../../services/review";

const ReviewItem = ({ review }) => {
  const [wasLiked, setWasLiked] = useState(false);

  const onLike = async () => {
    try {
      const likedReview = { ...review, like: review.like++ };
      await reviewService.update(likedReview);
    } catch (err) {
      console.log(err);
    }
    setWasLiked(true);
  };

  const onUnLike = () => {
    setWasLiked(false);
  };

  return (
    <div className={styles.container}>
      <img
        className={styles.avatar}
        src={review.avatarUrl || "/images/default-avatar.png"}
        alt="user"
      />
      <div className={styles.review}>
        <h5>{review.createdBy.username}</h5>
        <Rating
          className={styles.rating}
          name="read-only"
          value={review.rating}
          readOnly
        />
        <div className={styles.content}>
          <h5>{review.title}</h5>
          <p>{review.content}</p>
          <>
            {review.images.map((img) => (
              <img key={img} src={img} alt="" className={styles.reviewImg} />
            ))}
          </>
        </div>
      </div>
      <div className={styles.left}>
        <Moment format="YYYY-MM-DD">{review.createdAt}</Moment>
        <div className={styles.isHelpful}>
          <div className={styles.like}>
            {wasLiked ? (
              <AiFillLike className={styles.icon} onClick={onUnLike} />
            ) : (
              <AiOutlineLike className={styles.icon} onClick={onLike} />
            )}
            <span>{review.like}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewItem;
