import { useState, useEffect } from "react";
import { ordersFilterOptions, ordersSortOptions } from "../../data";
import Order from "../../components/order/order";
import Wrapper from "../../components/layout/wrapper";
import SearchBar from "../../components/UI/inputs/searchBar";
import FilterDrawer from "./../../components/UI/drawers/filterDrawer";
import SortDrawer from "./../../components/UI/drawers/sortDrawer";
import orderService from "../../services/order";

import styles from "./orderHistory.module.scss";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const userId = useParams().userId;
  const authen = useSelector((state) => state.authentication);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const ordersData = await orderService.getAll(
          { userId },
          undefined,
          authen?.user?.token
        );
        setOrders(ordersData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId, authen]);

  if (authen.user?.id !== userId) return <p>Permission denied</p>;
  if (!orders) return <p>No order found</p>;

  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>My Orders</h2>
          {!!orders.length && (
            <div className={styles.btnContainers}>
              <div className={styles.btn}>
                <SortDrawer sortOptions={ordersSortOptions} />
              </div>
              <div className={styles.btn}>
                <FilterDrawer filterOptions={ordersFilterOptions} />
              </div>
            </div>
          )}
        </div>
        <SearchBar />
        <ul className={styles.ordersList}>
          {orders.map((order) => (
            <Order key={order.id} order={order} userId={userId} />
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default OrderHistory;
