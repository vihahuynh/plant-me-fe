import Wrapper from "../../components/layout/wrapper";
import OrderProgressBar from "./../../components/UI/orderProgressBar";
import UserLeftMenu from "./../../components/layout/userLetfMenu/userLeftMenu";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import orderService from "./../../services/order";

import styles from "./orderTracking.module.scss";

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

  console.log("order: ", order);
  if (!order) return <p>No order found</p>;
  if (order?.user !== authen?.user?.id) return <p>Permission denied</p>;

  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <div className={styles.container}>
          <h3>{order?.status}</h3>
          <OrderProgressBar steps={order?.progress} />
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderTracking;
