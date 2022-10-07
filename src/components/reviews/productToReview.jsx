import ReactDOM from "react-dom";
import { useState } from "react";

import reviewService from "../../services/review";

import styles from "./productToReview.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Rating from "@mui/material/Rating";
import Modal from "./../UI/modal";
import ReviewForm from "./reviewForm";
import { useSelector } from "react-redux";

const ProductToReview = ({ product, setReviews, setProducts }) => {
  const authen = useSelector((state) => state.authentication);
  const [rating, setRating] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);

  const onAddNewReview = async (values) => {
    try {
      const newReview = {
        ...values,
        rating: rating,
        productId: product.id,
        createdBy: authen?.user?.id,
      };
      delete newReview.images;

      const formData = new FormData();
      for (const singleFile of values.images) {
        formData.append("images", singleFile);
      }
      formData.append("obj", JSON.stringify(newReview));
      const returnReview = await reviewService.create(
        formData,
        authen?.user?.token
      );
      const review = {
        ...returnReview.data,
        product,
      };
      setRating(0)
      setReviews((prev) => [review, ...prev]);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (error) {
      console.log(error);
    }
    onCloseModal();
  };

  const onCancel = () => {
    onCloseModal();
    setRating(0);
  };

  return (
    <div className={styles["slick-slide"]} key={product.id}>
      <div className={styles.productBox} onClick={onOpenModal}>
        <img className={styles.productImg} src={product.image} alt="plant" />
        <div className={styles.productBoxLeft}>
          <h5>{product.title}</h5>
          <Rating
            className={styles.rating}
            name="read-only"
            value={rating}
            readOnly
          // onChange={(_, newValue) => {
          //   setRating(newValue);
          //   onOpenModal();
          // }}
          />
        </div>
      </div>
      {ReactDOM.createPortal(
        <Modal isOpen={openModal} size="large" showButtonGroup={false}>
          <h5>Enter your review</h5>
          <div className={styles.productBoxSmall}>
            <img
              className={styles.productImg}
              src={product.image}
              alt="plant"
            />
            <div className={styles.productBoxLeft}>
              <h5>{product.title}</h5>
              <Rating
                className={styles.rating}
                name="read-only"
                value={rating}
                onChange={(_, newValue) => {
                  setRating(newValue);
                  onOpenModal();
                }}
              />
            </div>
          </div>
          <ReviewForm
            onSave={onAddNewReview}
            onCancel={onCancel}
            rating={rating}
          />
        </Modal>,
        document.getElementById("overlay-root")
      )}
    </div>
  );
};

export default ProductToReview;
