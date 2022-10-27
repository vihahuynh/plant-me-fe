import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import AdminOrderDetailsItem from "../../components/order/adminOrderDetailsItem";
import Wrapper from "../../components/layout/wrapper";
import Modal from "../../components/UI/modal";
import InfoBox from "../../components/UI/infoBox";

import orderService from "../../services/order";

import styles from "./adminOrderDetails.module.scss";
import stockService from "../../services/stock";

const AdminOrderDetails = () => {
  const authen = useSelector((state) => state.authentication);
  const [order, setOrder] = useState(null);
  const [isOpenCancelModal, setIsOpenCancelModal] = useState(false);
  const { orderId } = useParams();

  const onCloseCancelModal = () => setIsOpenCancelModal(false);

  const onCancelOrder = async () => {
    const orderToUpdate = {
      status: "Cancelled",
    };
    const updatedOder = await orderService.update(
      order.id,
      orderToUpdate,
      authen?.user?.token
    );
    setOrder(updatedOder.data);
    for (let item of order.cart) {
      const stock = await stockService.getAll([
        `color=${item.color}`,
        `size=${item.size}`,
        `product=${item.id}`,
      ]);
      const stockToUpdate = stock?.data?.[0];
      if (stockToUpdate) {
        stockToUpdate.quantity = stockToUpdate.quantity + item.quantity;
        await stockService.update(stockToUpdate.id, stockToUpdate);
      }
    }
    onCloseCancelModal();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const orderData = await orderService.get(orderId, authen?.user?.token);
        setOrder(orderData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [orderId, authen]);

  if (!authen.user?.isAdmin)
    return <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />;
  if (!order)
    return (
      <InfoBox text="No order found" btnText="Back to home page" url="/" />
    );

  return (
    <Wrapper>
      <div className={styles.main}>
        <div className={styles.orderDetails}>
          <div className={styles.orderDetailsHeader}>
            <h4>Order: #{order.id}</h4>
            <p>
              Order date:{" "}
              <Moment format="YYYY-MM-DD hh:mm:ss">{order.createdAt}</Moment>
            </p>
          </div>
          <div>
            <h5>Status</h5>
            <p>{order.progress?.at(-1)?.title}</p>
            <p>{order.progress?.at(-1)?.description}</p>
            <Moment format="YYYY-MM-DD hh:mm:ss">
              {order.progress?.at(-1)?.createdAt}
            </Moment>
          </div>
          <div>
            <h5>Notification</h5>
            <ul className={styles.notiList}>
              {order?.notification?.map((noti) => (
                <li key={noti.id} className={styles.notiItem}>
                  <Moment format="YYYY-MM-DD hh:mm:ss">{noti.createdAt}</Moment>
                  <p>{noti.content}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.boxes}>
            <h5 className={styles.subHeader}>Address</h5>
            <h5 className={styles.subHeader}>Delivery Method</h5>
            <h5 className={styles.subHeader}>Payment Method</h5>
          </div>
          <div className={styles.boxes}>
            <div className={styles.box}>
              <p className={styles.boldText}>{order.receiverName}</p>
              <p>Address: {order.address}</p>
              <p>Phone number: {order.phoneNumber}</p>
            </div>
            <div className={styles.box}>
              <p>
                Estimated delivery date:{" "}
                <Moment format="YYYY-MM-DD">
                  {order.estimatedDeliveryDate}
                </Moment>
              </p>
              <p>{order.deliveryMethod}</p>
              <p>Delivery charges: {order.deliveryCharges}.000 &#x20ab;</p>
            </div>
            <div className={styles.box}>
              <p>{order.paymentMethod}</p>
              <p className={styles.paymentStatus}>{order.paymentStatus}</p>
            </div>
          </div>
          <div>
            <div className={styles.orderTableHeader}>
              <div>
                <h5>Name</h5>
                <h5>Price</h5>
                <h5>Quantity</h5>
                <h5>Discount</h5>
                <h5>Payment</h5>
              </div>
            </div>
            <ul className={styles.orderList}>
              {order.cart.map((item) => (
                <AdminOrderDetailsItem key={item.id} order={item} />
              ))}
            </ul>
            <div className={styles.summary}>
              <p>
                <span>Payment</span>
                <span className={styles.boldText}>
                  {order.totalPayment -
                    order.deliveryCharges +
                    order.totalDiscount}
                  .000 &#x20ab;
                </span>
              </p>
              <p>
                <span>Delivery charges</span>
                <span className={styles.boldText}>
                  {order.deliveryCharges}.000 &#x20ab;
                </span>
              </p>
              <p>
                <span>Discount</span>
                <span className={styles.boldText}>
                  {order.totalDiscount}.000 &#x20ab;
                </span>
              </p>
              <p>
                <span>Total</span>
                <span className={styles.totalPayment}>
                  {order.totalPayment}.000 &#x20ab;
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      {ReactDOM.createPortal(
        <Modal
          isOpen={isOpenCancelModal}
          title="Cancel order"
          message="Are you sure you want to cancel the order?"
          actionText="Yes"
          onConfirm={onCancelOrder}
          onCancel={onCloseCancelModal}
        />,
        document.getElementById("overlay-root")
      )}
    </Wrapper>
  );
};

export default AdminOrderDetails;
