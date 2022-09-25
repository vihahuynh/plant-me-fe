import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import reviewService from "./../../services/review";
import orderService from "./../../services/order";
import UserReviewItem from "./userReviewItem";

import ProductToReview from "./productToReview";
import Arrow from "../UI/arrow";

import styles from "./userReviews.module.scss";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [products, setProducts] = useState([]);
  const authen = useSelector((state) => state.authentication);

  const settings = {
    className: "center",
    // centerMode: true,
    arrow: true,
    slidesToShow: products.length < 3 ? products.length : 3,
    slidesToScroll: products.length < 3 ? products.length : 3,
    speed: 500,
    nextArrow: <Arrow type="prev" />,
    prevArrow: <Arrow type="next" />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (authen?.user?.id) {
          const reviewsData = await reviewService.getAll({
            userId: authen?.user?.id,
          });
          setReviews(reviewsData.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [authen?.user]);

  useEffect(() => {
    const reviewIds = reviews.map((review) => review.product.id);
    const fetchData = async () => {
      try {
        if (authen?.user) {
          const ordersData = await orderService.getAll(
            {
              userId: authen?.user?.id,
            },
            undefined,
            authen?.user?.token
          );
          const productsNeedToReview = ordersData.data.reduce(
            (result, order) => {
              order.cart.forEach((p) => {
                const itemIds = result.map((i) => i.id);
                if (!itemIds.includes(p.id) && !reviewIds.includes(p.id)) {
                  result = result.concat(p);
                }
              });
              return result;
            },
            []
          );
          console.log(productsNeedToReview);
          setProducts(productsNeedToReview);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen?.user, reviews]);

  return (
    <div className={styles.container}>
      <div>
        <h3>Waiting for your review</h3>
        <div className={styles["thumbnail-slider-wrap"]}>
          <Slider {...settings}>
            {products.map((p) => (
              <ProductToReview
                key={p.id}
                product={p}
                setReviews={setReviews}
                setProducts={setProducts}
              />
            ))}
          </Slider>
        </div>
      </div>
      <div>
        <h3>Your reviews</h3>
        <ul className={styles.userReviewsList}>
          {reviews.map((item) => (
            <UserReviewItem key={item.id} item={item} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserReviews;
