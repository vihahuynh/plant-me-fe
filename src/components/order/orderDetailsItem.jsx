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

export default OrderDetailsItem;
