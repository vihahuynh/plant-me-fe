import styles from "./orderItem.module.scss";

const OrderItem = ({ order }) => {
  return (
    <li className={styles.item}>
      <div className={styles.imgContainer}>
        <img className={styles.itemImg} src={order.image} alt="product-img" />
        <span className={styles.quantity}>x{order.quantity}</span>
      </div>
      <div>
        <a href={`/products/${order.product}`} className={styles.itemTitle}>{order.title}</a>
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
        {order.price * order.quantity}.000 &#x20ab;
      </p>
    </li>
  );
};

export default OrderItem;
