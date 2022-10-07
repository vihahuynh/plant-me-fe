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
    console.log("reviews: ", reviews)
    const reviewIds = reviews.map((review) => review.product.id);
    const fetchData = async () => {
      try {
        if (authen?.user) {
          const ordersData = await orderService.getAll(
            undefined,
            undefined,
            authen?.user?.token
          );
          const productsNeedToReview = ordersData.data.reduce(
            (result, order) => {
              order.cart.forEach((p) => {
                const itemIds = result.map((i) => i.product);
                console.log("itemIds: ", itemIds)
                console.log("reviewIds: ", reviewIds)
                console.log("product: ", p.product)
                if (!itemIds.includes(p.product) && !reviewIds.includes(p.product)) {
                  result = result.concat(p);
                }
              });
              return result;
            }, []
          );
          console.log("productsNeedToReview: ", productsNeedToReview)
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
        {products.length ?
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

          : <p>No product to review</p>
        }
      </div>
      <div>
        <h3>Your reviews</h3>
        <ul className={styles.userReviewsList}>
          {reviews.length
            ? reviews.map((item) => (
              <UserReviewItem key={item.id} item={item} />
            ))
            : <p>No review</p>
          }
        </ul>
      </div>
    </div>
  );
};

export default UserReviews;
