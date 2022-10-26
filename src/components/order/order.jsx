
// import { useDispatch, useSelector } from "react-redux";

import LinkButton from "../UI/buttons/linkbutton";
// import Button from "../UI/buttons/button"
import OrderList from "./orderList";

import styles from "./order.module.scss";

import { TiCancel } from "react-icons/ti";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlinePayment } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { AiOutlineFileDone } from "react-icons/ai";

// import { addItem } from "../../store/cartSlice"
// import stockService from "../../services/stock"

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
  // const cart = useSelector(state => state.cart)
  // const authen = useSelector(state => state.authentication)
  // const dispatch = useDispatch()
  const statusIcon = getStatusIcon(order.status);

  // const onBuyAgain = async () => {
  //   try {
  //     for await (let item of order.cart) {
  //       const stock = await stockService.getAll(`color=${item.color.replace("#", "%23")}&size=${item.size}&product=${item.product}`)
  //       const cartItem = { ...item, isCheckout: false, stock: stock.data?.[0]?.id }
  //       delete cartItem._id
  //       console.log("cartItem: ", cartItem)
  //       await dispatch(addItem({ cart, item: cartItem, token: authen?.user?.token })).unwrap()
  //     }
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }

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
          {/* <Button
            text="Buy again"
            size="small"
            borderRadius="square"
            theme="light"
            onClick={onBuyAgain}
          /> */}
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
