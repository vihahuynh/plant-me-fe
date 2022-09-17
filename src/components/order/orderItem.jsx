import styles from "./orderItem.module.scss";

const OrderItem = ({ order }) => {
  return (
    <li className={styles.item}>
      <div className={styles.imgContainer}>
        <img className={styles.itemImg} src={order.image} alt="" />
        <span className={styles.quantity}>x{order.quantity}</span>
      </div>
      <p className={styles.itemTitle}>{order.title}</p>
      <p className={styles.itemPrice}>{order.price}.000</p>
    </li>
  );
};

export default OrderItem;
