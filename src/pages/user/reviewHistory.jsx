import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { reviewsFilterOptions, reviewsSortOptions } from "../../data";

import UserLeftMenu from "../../components/layout/userLetfMenu/userLeftMenu";
import UserReviewItem from "./../../components/reviews/userReviewItem";
import Wrapper from "../../components/layout/wrapper";
import FilterDrawer from "./../../components/UI/drawers/filterDrawer";
import SortDrawer from "./../../components/UI/drawers/sortDrawer";
import Arrow from "./../../components/UI/arrow";
import ProductToReview from "./../../components/reviews/productToReview";
import Pagination from "../../components/UI/pagination";

import reviewService from "../../services/review";
import orderService from "../../services/order";

import Slider from "react-slick";

import styles from "./reviewHistory.module.scss";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewHistory = () => {
  const [page, setPage] = useState(1);
  const [allReviews, setAllReviews] = useState([]);
  const [filterReviews, setFilterReviews] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);

  const authen = useSelector((state) => state.authentication);
  const history = useHistory();
  const queries = history.location.search.slice(1);
  const otherQueries = queries
    .split("&")
    .filter((q) => !q.includes("skip") && !q.includes("limit"))
    .join("&");

  const settings = {
    className: "center",
    arrow: true,
    slidesToShow: products.length < 2 ? products.length : 2,
    slidesToScroll: products.length < 2 ? products.length : 2,
    speed: 500,
    nextArrow: <Arrow type="prev" />,
    prevArrow: <Arrow type="next" />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const reviewsData = await reviewService.getAll(
          `user=${authen?.user?.id}`,
          authen?.user?.token
        );
        setAllReviews(reviewsData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const reviewsData = await reviewService.getAll(
          `user=${authen?.user?.id}&${otherQueries}`,
          authen?.user?.token
        );
        setFilterReviews(reviewsData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen, otherQueries]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const reviewsData = await reviewService.getAll(
          `user=${authen?.user?.id}&${queries}`,
          authen?.user?.token
        );
        setReviews(reviewsData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen, queries]);

  useEffect(() => {
    const reviewIds = allReviews.map((review) => review.product.id);
    const fetchData = async () => {
      try {
        if (authen?.user) {
          const ordersData = await orderService.getAll([], authen?.user?.token);
          const productsNeedToReview = ordersData.data.reduce(
            (result, order) => {
              order.cart.forEach((p) => {
                const itemIds = result.map((i) => i.product);
                if (
                  !itemIds.includes(p.product) &&
                  !reviewIds.includes(p.product)
                ) {
                  result = result.concat(p);
                }
              });
              return result;
            },
            []
          );
          setProducts(productsNeedToReview);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [authen?.user, allReviews, reviews]);

  if (!authen.user?.id) return <p>Permission denied</p>;
  if (!filterReviews) return <p>No review found</p>;

  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <div className={styles.container}>
          <h3>Products to review</h3>
          {products.length ? (
            <div className={styles["thumbnail-slider-wrap"]}>
              <Slider {...settings}>
                {products.map((p) => (
                  <ProductToReview
                    key={p.product}
                    product={p}
                    setReviews={setReviews}
                  />
                ))}
              </Slider>
            </div>
          ) : (
            <p>No product to review</p>
          )}
          <div className={styles.allReviews}>
            <h3>My Reviews</h3>
            <div className={styles.header}>
              <div className={styles.btnContainers}>
                <div className={styles.btn}>
                  <SortDrawer sortOptions={reviewsSortOptions} />
                </div>
                <div className={styles.btn}>
                  <FilterDrawer filterOptions={reviewsFilterOptions} />
                </div>
              </div>
            </div>
            {reviews.length ? (
              <>
                <ul className={styles.reviewsList}>
                  {reviews.map((review) => (
                    <UserReviewItem key={review.id} item={review} />
                  ))}
                </ul>
                <Pagination
                  page={page}
                  setPage={setPage}
                  totalPages={Math.ceil(filterReviews.length / 2)}
                  itemsPerPage={2}
                  theme="white"
                />
              </>
            ) : (
              <p>No review found</p>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ReviewHistory;
