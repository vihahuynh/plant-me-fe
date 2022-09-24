import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import reviewService from "./../../services/review";
import UserReviewItem from "./userReviewItem";

import styles from "./userReviews.module.scss";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const authen = useSelector((state) => state.authentication);

  useEffect(() => {
    const fetchData = async () => {
      const reviewsData = await reviewService.getAll({
        userId: authen?.user?.id,
      });
      setReviews(reviewsData.data);
    };
    fetchData();
  }, [authen?.user?.id]);
  console.log(reviews);

  return (
    <ul className={styles.userReviewsList}>
      {reviews.map((item) => (
        <UserReviewItem item={item} />
      ))}
    </ul>
  );
};

export default UserReviews;
