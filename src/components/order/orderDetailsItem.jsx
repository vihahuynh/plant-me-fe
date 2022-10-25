import styles from "./orderDetailsItem.module.scss";

import LinkButton from "./../UI/buttons/linkbutton";

const OrderDetailsItem = ({ order }) => {
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
        <LinkButton
          text="Write review"
          size="small"
          borderRadius="square"
          theme="light"
        />
        <LinkButton
          text="Buy again"
          size="small"
          borderRadius="square"
          theme="light"
        />
      </div>
    </li>
  );
};

export default OrderDetailsItem;
