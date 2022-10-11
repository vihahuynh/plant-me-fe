import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { reviewsFilterOptions, reviewsSortOptions } from "./../../data"

import SortDrawer from "./../../components/UI/drawers/sortDrawer"
import FilterDrawer from "./../../components/UI/drawers/filterDrawer";
import Wrapper from "../../components/layout/wrapper";
import UserReviewItem from "../../components/reviews/userReviewItem";
import UserLeftMenu from "../../components/layout/userLetfMenu/userLeftMenu";
import ProductToReview from "./../../components/reviews/productToReview";
import Arrow from "./../../components/UI/arrow";

import reviewService from "./../../services/review";
import orderService from "./../../services/order";

import Slider from "react-slick";

import styles from "./reviewHistory.module.scss";

const ReviewHistory = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const authen = useSelector((state) => state.authentication);
  const history = useHistory()
  const queries = history.location.search.slice(1);

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
        if (authen?.user?.id) {
          const reviewsData = await reviewService.getAll(
            `user=${authen?.user?.id}&${queries}`,
          );
          setReviews(reviewsData.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [authen?.user?.id, queries]);

  useEffect(() => {
    const reviewIds = reviews.map((review) => review.product.id);
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
  }, [authen?.user, reviews]);

  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <div className={styles.container}>
          <h3>Waiting for your review</h3>
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
            <h3>Your reviews</h3>
            <ul>
              {reviews?.length ? (
                reviews.map((item) => <UserReviewItem key={item.id} item={item} />)
              ) : (
                <p>No review</p>
              )}
            </ul>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ReviewHistory;
