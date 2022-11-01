import styles from "./orderItem.module.scss";
import { Link } from "react-router-dom";

const OrderItem = ({ order }) => {
  const salePercent = order.salePercent || 0
  const netPrice = Math.round(order.price - (order.price * salePercent / 100))
  return (
    <li className={styles.item}>
      <div className={styles.imgContainer}>
        <img className={styles.itemImg} src={order.image} alt="product-img" />
        <span className={styles.quantity}>x{order.quantity}</span>
      </div>
      <div>
        <Link to={`/products/${order.product}`} className={styles.itemTitle}>
          {order.title}
        </Link>
        <div>Size: {order.size}</div>
        <div>
          Color:
          <span
            className={styles.color}
            style={{ backgroundColor: order.color }}
          />
        </div>
      </div>
      <p className={styles.itemPrice}>
        {netPrice * order.quantity}.000 &#x20ab;
      </p>
    </li>
  );
};

export default OrderItem;
