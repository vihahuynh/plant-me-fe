import { useState, useEffect } from "react";
import { ordersFilterOptions, ordersSortOptions } from "../../data";
import Order from "../../components/order/order";
import Wrapper from "../../components/layout/wrapper";
import SearchBar from "../../components/UI/inputs/searchBar";
import FilterDrawer from "./../../components/UI/drawers/filterDrawer";
import SortDrawer from "./../../components/UI/drawers/sortDrawer";
import orderService from "../../services/order";

import styles from "./orderHistory.module.scss";
import { useHistory, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import UserLeftMenu from "../../components/layout/userLetfMenu/userLeftMenu";

const OrderHistory = () => {
  const [allOrders, setAllOrders] = useState([])
  const [orders, setOrders] = useState([]);
  const userId = useParams().userId;
  const authen = useSelector((state) => state.authentication);
  const history = useHistory()
  const queries = history.location.search.slice(1)


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const ordersData = await orderService.getAll(`user=${authen?.user?.id}`, authen?.user?.token);
        setAllOrders(ordersData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId, authen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const ordersData = await orderService.getAll(`user=${authen?.user?.id}&${queries}`, authen?.user?.token);
        setOrders(ordersData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [userId, authen, queries]);

  if (authen.user?.id !== userId) return <p>Permission denied</p>;
  if (!orders) return <p>No order found</p>;

  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>My Orders</h2>
            {!!allOrders.length && (
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
          {orders.length ? (
            <>
              <SearchBar />
              <ul className={styles.ordersList}>
                {orders.map((order) => (
                  <Order key={order.id} order={order} userId={userId} />
                ))}
              </ul>
            </>
          ) : (
            <p>No order found</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default OrderHistory;
