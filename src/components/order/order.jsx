import OrderItem from "./orderItem";
import ButtonLink from "../UI/buttons/linkbutton";

import styles from "./order.module.scss";

import { TiCancel } from "react-icons/ti";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { AiOutlineFileDone } from "react-icons/ai";

const getStatusIcon = (status) => {
  switch (status) {
    case "Waiting for payment":
      return <MdOutlinePayment className={styles.icon} />;
    case "Packed":
      return <FiPackage className={styles.icon} />;
    case "In Transit":
      return <TbTruckDelivery className={styles.icon} />;

    case "Delivered":
      return <AiOutlineFileDone className={styles.icon} />;

    case "Cancelled":
      return <TiCancel className={styles.icon} />;
    default:
      return null;
  }
};

const Order = ({ order, userId }) => {
  const statusIcon = getStatusIcon(order.status);

  const totalPayment = order.cart.reduce((result, item) => {
    return result + item.price;
  }, 0);

  const totalDiscount = order.cart.reduce((result, item) => {
    return result + item.discount;
  }, 0);

  const totalDeliveryCharges = order.cart.reduce((result, item) => {
    return result + item.deliveryCharges || 10;
  }, 0);

  return (
    <li className={styles.orderContainer}>
      <div className={styles.orderHeader}>
        {statusIcon}
        <p>{order.status}</p>
      </div>
      <ul>
        {order?.cart?.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
      <div className={styles.orderFooter}>
        <p className={styles.orderPaymentBox}>
          Total payment:{" "}
          <span className={styles.orderPayment}>
            {totalPayment + totalDeliveryCharges - totalDiscount}.000
          </span>
        </p>
        <div className={styles.orderBtnGroup}>
          <ButtonLink
            text="Buy again"
            size="small"
            borderRadius="square"
            type="light"
          />
          <ButtonLink
            text="View details"
            size="small"
            borderRadius="square"
            type="light"
            url={`/user/${userId}/order-history/${order.id}`}
          />
        </div>
      </div>
    </li>
  );
};

export default Order;
