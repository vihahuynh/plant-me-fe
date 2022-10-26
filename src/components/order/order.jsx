import LinkButton from "../UI/buttons/linkbutton";
import OrderList from "./orderList";

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

const Order = ({ order }) => {
  const statusIcon = getStatusIcon(order.status);

  return (
    <li className={styles.orderContainer}>
      <div className={styles.orderHeader}>
        {statusIcon}
        <p>{order.status}</p>
      </div>
      <OrderList order={order} />
      <div className={styles.orderFooter}>
        <p className={styles.orderPaymentBox}>
          Total payment:{" "}
          <span className={styles.orderPayment}>
            {order.totalPayment}.000 &#x20ab;
          </span>
        </p>
        <div className={styles.orderBtnGroup}>
          <LinkButton
            text="View details"
            size="small"
            borderRadius="square"
            theme="light"
            url={`/user/order-history/view/${order.id}`}
          />
        </div>
      </div>
    </li>
  );
};

export default Order;
