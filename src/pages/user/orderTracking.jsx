import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Moment from "react-moment";

import Wrapper from "../../components/layout/wrapper";
import OrderProgressBar from "./../../components/UI/orderProgressBar";
import UserLeftMenu from "./../../components/layout/userLetfMenu/userLeftMenu";

import orderService from "./../../services/order";

import styles from "./orderTracking.module.scss";
import LinkButton from "../../components/UI/buttons/linkbutton";

const OrderTracking = () => {
  const { orderId } = useParams();
  const authen = useSelector((state) => state.authentication);
  const [order, setOrder] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const orderData = await orderService.get(orderId, authen?.user?.token);
      setOrder(orderData.data);
    };
    fetchData();
  }, [orderId, authen?.user?.token]);

  if (!order) return <p>No order found</p>;
  if (order?.user !== authen?.user?.id) return <p>Permission denied</p>;

  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <div className={styles.container}>
          <div className={styles.orderHeader}>
            <h4>
              Order: #{order.id} - <span>{order.status}</span>
            </h4>
            <p>
              Order date: <Moment format="YYYY-MM-DD">{order.createdAt}</Moment>
            </p>
          </div>
          <div className={styles.trackingInfo}>
            <div className={styles.orderTracking}>
              <h5>{order?.status}</h5>
              <OrderProgressBar steps={order?.progress} />
            </div>
            <div className={styles.itemListContainer}>
              <h5>Order includes</h5>
              <ul className={styles.itemList}>
                {order.cart.map((item) => (
                  <li className={styles.item}>
                    <div className={styles.imgContainer}>
                      <img className={styles.itemImg} src={item.image} alt="" />
                      <span className={styles.quantity}>x{item.quantity}</span>
                    </div>
                    <div>
                      <p className={styles.itemTitle}>{item.title}</p>
                      <div>Size: {item.size}</div>
                      <div>
                        Color:
                        <span
                          className={styles.color}
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <LinkButton
            className={styles.viewDetailsBtn}
            text="View order details"
            borderRadius="square"
            url={`/user/order-history/view/${order.id}`}
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderTracking;
