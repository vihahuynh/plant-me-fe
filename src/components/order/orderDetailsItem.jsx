import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useDispatch, useSelector } from "react-redux";

import Button from "./../UI/buttons/button"
import Modal from "./../UI/modal"
import ReviewForm from "./../reviews/reviewForm"
import { Rating } from "@mui/material";

import { addItem } from "./../../store/cartSlice"
import stockSerice from "../../services/stock";
import reviewService from "../../services/review";

import styles from "./orderDetailsItem.module.scss";

const OrderDetailsItem = ({ order }) => {
  const [stock, setStock] = useState()
  const [rating, setRating] = useState(0);
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);
  const cart = useSelector(state => state.cart)
  const authen = useSelector(state => state.authentication)
  const dispatch = useDispatch()

  const onAddNewReview = async (values) => {
    try {
      const newReview = {
        ...values,
        rating: rating,
        productId: order.product,
        createdBy: authen?.user?.id,
      };
      delete newReview.images;

      const formData = new FormData();
      for (const singleFile of values.images) {
        formData.append("images", singleFile);
      }
      formData.append("obj", JSON.stringify(newReview));
      await reviewService.create(
        formData,
        authen?.user?.token
      );
      setRating(0);
    } catch (error) {
      console.log(error);
    }
    onCloseModal();
  };

  const onCancel = () => {
    onCloseModal();
    setRating(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      const stockData = await stockSerice.getAll(`color=${order.color.replace("#", "%23")}&size=${order.size}&product=${order.product}`)
      setStock(stockData.data?.[0])
    }
    if (order) fetchData()
  }, [order])

  const onBuyAgain = async () => {
    const cartItem = { ...order, isCheckout: false, stock: stock.id }
    delete cartItem._id
    await dispatch(
      addItem({ cart, item: cartItem, token: authen?.user?.token })
    ).unwrap();
  }

  return (
    <li className={styles.order}>
      <div>
        <div className={styles.product}>
          <img className={styles.productImg} src={order.image} alt="product-img" />
          <div>
            <a href={`/products/${order.product}`} className={styles.boldTitle}>{order.title}</a>
            <p>ID: #{order.id}</p>
            <div>Size: {order.size}</div>
            <div>
              Color:
              <span
                className={styles.color}
                style={{ backgroundColor: order.color }}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <span className={styles.subTitle}>Price: </span>
        {order.price}.000 &#x20ab;
      </div>
      <div>
        <span className={styles.subTitle}>Quantity: </span>
        {order.quantity}
      </div>
      <div>
        <span className={styles.subTitle}>Discount: </span>
        {order.discount}.000 &#x20ab;
      </div>
      <div>
        <span className={styles.subTitle}>Payment: </span>
        {order.price * order.quantity - order.discount}.000 &#x20ab;
      </div>
      <div className={styles.orderBtnGroup}>
        <Button
          text="Write review"
          size="small"
          borderRadius="square"
          theme="light"
          onClick={onOpenModal}
        />
        <Button
          text="Buy again"
          size="small"
          borderRadius="square"
          theme="light"
          onClick={onBuyAgain}
        />
      </div>
      {ReactDOM.createPortal(
        <Modal isOpen={openModal} size="large" showButtonGroup={false}>
          <h5>Enter your review</h5>
          <div className={styles.productBoxSmall}>
            <img
              className={styles.productImg}
              src={order.image}
              alt="plant"
            />
            <div className={styles.productBoxLeft}>
              <h5>{order.title}</h5>
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
    </li>
  );
};

export default OrderDetailsItem;
