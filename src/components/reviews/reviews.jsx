import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Rating } from "@mui/material";

import styles from "./reviews.module.scss";

import { reviewsSortOptions, reviewsFilterOptions } from "./../../data";
import SortDrawer from "../UI/drawers/sortDrawer";
import FilterDrawer from "../UI/drawers/filterDrawer";
import ProgressBar from "../UI/progressBar";
import ReviewItem from "./reviewItem";
import { useSelector } from "react-redux";

const Reviews = ({ reviews }) => {
  const filters = useSelector((state) => state.filters);
  const history = useHistory();

  const ratingStatistics = {
    total: reviews.length,
    average: reviews.reduce((average, review) => {
      return average + review.rating / reviews.length;
    }, 0),
    count: [
      reviews.filter((r) => r.rating === 5).length,
      reviews.filter((r) => r.rating === 4).length,
      reviews.filter((r) => r.rating === 3).length,
      reviews.filter((r) => r.rating === 2).length,
      reviews.filter((r) => r.rating === 1).length,
    ],
  };

  useEffect(() => {
    if (filters.applyFilters.length) {
      const queryStr = filters.applyFilters.join("&");
      history.push(`${history.location.pathname}?${queryStr}`);
    }
  }, [history, filters.applyFilters]);

  return (
    <div className={styles.container}>
      <h2>Reviews</h2>
      <div className={styles.summary}>
        <div className={styles.ratingStatistics}>
          <span className={styles.average}>
            {ratingStatistics.average.toFixed(1)}
          </span>
          <Rating
            className={styles.averageStars}
            name="read-only"
            value={ratingStatistics.average}
            readOnly
          />
          <p className={styles.total}>{ratingStatistics.total} reviews</p>
          <ul className={styles.count}>
            {ratingStatistics.count.map((r, id) => (
              <li key={id}>
                <Rating name="read-only" value={5 - id} readOnly />
                <ProgressBar percent={(r / ratingStatistics.total) * 100} />
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
        {!!reviews.length && (
          <div className={styles.btnContainers}>
            <div className={styles.btn}>
              <SortDrawer sortOptions={reviewsSortOptions} />
            </div>
            <div className={styles.btn}>
              <FilterDrawer filterOptions={reviewsFilterOptions} />
            </div>
          </div>
        )}
      </div>

      {reviews.map((review) => (
        <ReviewItem key={review.id} review={review} />
      ))}
    </div>
  );
};

export default Reviews;
