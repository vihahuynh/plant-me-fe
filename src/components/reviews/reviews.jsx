import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Rating } from "@mui/material";

import styles from "./reviews.module.scss";

import SortDrawer from "../UI/drawers/sortDrawer";
import FilterDrawer from "../UI/drawers/filterDrawer";
import ProgressBar from "../UI/progressBar";
import ReviewItem from "./reviewItem";
import Pagination from "../UI/pagination";

import reviewService from "../../services/review";
import { reviewsSortOptions, reviewsFilterOptions } from "./../../data";

const Reviews = ({ productId }) => {
  const [page, setPage] = useState(1)
  const [allReviews, setAllReviews] = useState([]);
  const [filterReviews, setFilterReviews] = useState([])
  const [reviews, setReviews] = useState([]);

  const history = useHistory();
  const queries = history.location.search.slice(1);
  const otherQueries = queries.split("&").filter(q => !q.includes("skip") && !q.includes("limit")).join("&")

  useEffect(() => {
    const fetchData = async () => {
      const reviewsData = await reviewService.getAll(`product=${productId}`);
      setAllReviews(reviewsData.data);
    };
    fetchData();
  }, [productId]);

  useEffect(() => {
    const fetchData = async () => {
      const reviewsData = await reviewService.getAll(`product=${productId}&${otherQueries}`);
      setFilterReviews(reviewsData.data);
    };
    fetchData();
  }, [productId, otherQueries]);

  useEffect(() => {
    const fetchData = async () => {
      const reviewsData = await reviewService.getAll(
        `product=${productId}&${queries}`,
      );
      setReviews(reviewsData.data);
    };
    fetchData();
  }, [productId, queries]);

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
      <Pagination page={page} setPage={setPage} totalPages={Math.ceil(filterReviews.length / 2)} itemsPerPage={2} />
    </div>
  );
};

export default Reviews;
