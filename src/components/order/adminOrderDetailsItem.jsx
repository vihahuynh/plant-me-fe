import styles from "./orderDetailsItem.module.scss";

const AdminOrderDetailsItem = ({ order }) => {
  return (
    <li className={styles.order}>
      <div>
        <div className={styles.product}>
          <img className={styles.productImg} src={order.image} alt="" />
          <div>
            <p className={styles.boldTitle}>{order.title}</p>
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
      <div>{order.price}.000 &#x20ab;</div>
      <div>{order.quantity}</div>
      <div>{order.discount}.000 &#x20ab;</div>
      <div>{order.price * order.quantity - order.discount}.000 &#x20ab;</div>
    </li>
  );
};

export default AdminOrderDetailsItem;
