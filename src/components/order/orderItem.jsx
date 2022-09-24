import styles from "./orderItem.module.scss";

const OrderItem = ({ order }) => {
  return (
    <li className={styles.item}>
      <div className={styles.imgContainer}>
        <img className={styles.itemImg} src={order.image} alt="" />
        <span className={styles.quantity}>x{order.quantity}</span>
      </div>
      <div>
        <p className={styles.itemTitle}>{order.title}</p>
        <div>Size: {order.size}</div>
        <div>
          Color:
          <span
            className={styles.color}
            style={{ backgroundColor: order.color }}
          />
        </div>
      </div>
      <p className={styles.itemPrice}>{order.price}.000 &#x20ab;</p>
    </li>
  );
};

export default OrderItem;
