import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Rating } from "@mui/material";

import styles from "./reviews.module.scss";

import { reviewsSortOptions, reviewsFilterOptions } from "./../../data";
import SortDrawer from "../UI/drawers/sortDrawer";
import FilterDrawer from "../UI/drawers/filterDrawer";
import ProgressBar from "../UI/progressBar";
import ReviewItem from "./reviewItem";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import reviewService from "../../services/review";
import { filtersActions } from "../../store";

const Reviews = ({ productId }) => {
  const [allReviews, setAllReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const filters = useSelector((state) => state.filters);
  const history = useHistory();
  const dispatch = useDispatch();

  console.log("filters: ", filters);

  useEffect(() => {
    dispatch(
      filtersActions.updateFilters({
        dataType: "product-review",
        filters: history.location.search.slice(1)?.split("&"),
      })
    );
    if (!filters.filters.length) {
      history.push(history.location.pathname);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const reviewsData = await reviewService.getAll([`product=${productId}`]);
      setAllReviews(reviewsData.data);
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      const reviewsData = await reviewService.getAll([
        `product=${productId}&${filters.filters.join("&")}`,
      ]);
      setReviews(reviewsData.data);
    };
    fetchData();
  }, [productId, filters.filters]);

  useEffect(() => {
    if (filters.filters.length) {
      const queryStr = filters.filters.join("&");
      history.push({
        search: `?${queryStr}`,
      });
    }
  }, [history, filters.filters]);

  const ratingStatistics = {
    total: allReviews.length,
    average: allReviews.reduce((average, review) => {
      return average + review.rating / allReviews.length;
    }, 0),
    count: [
      allReviews.filter((r) => r.rating === 5).length,
      allReviews.filter((r) => r.rating === 4).length,
      allReviews.filter((r) => r.rating === 3).length,
      allReviews.filter((r) => r.rating === 2).length,
      allReviews.filter((r) => r.rating === 1).length,
    ],
  };

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
        {!!allReviews.length && (
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
