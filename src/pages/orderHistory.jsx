import { useState, useEffect } from "react";
import { ordersFilterOptions, ordersSortOptions } from "../data";
import Order from "../components/order/order";
import Wrapper from "../components/layout/wrapper";
import SearchBar from "../components/UI/inputs/searchBar";
import FilterDrawer from "./../components/UI/drawers/filterDrawer";
import SortDrawer from "./../components/UI/drawers/sortDrawer";
import orderService from "../services/order";

import styles from "./orderHistory.module.scss";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const ordersData = await orderService.getAll();
      setOrders(ordersData.data);
    };
    fetchData();
  }, []);

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
            <Order key={order.id} order={order} />
          ))}
        </ul>
      </div>
    </Wrapper>
  );
};

export default OrderHistory;
