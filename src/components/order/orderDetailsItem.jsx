import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";

import Button from "./../UI/buttons/button"
import { addItem } from "./../../store/cartSlice"
import stockSerice from "../../services/stock";

import styles from "./orderDetailsItem.module.scss";

const OrderDetailsItem = ({ order }) => {
  const [stock, setStock] = useState()
  const cart = useSelector(state => state.cart)
  const authen = useSelector(state => state.authentication)
  const dispatch = useDispatch()

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
        />
        <Button
          text="Buy again"
          size="small"
          borderRadius="square"
          theme="light"
          onClick={onBuyAgain}
        />
      </div>
    </li>
  );
};

export default OrderDetailsItem;
