import { useState, useEffect } from "react";
import { useHistory, withRouter } from "react-router-dom";
import { useSelector } from "react-redux";

import Order from "../../components/order/order";
import Wrapper from "../../components/layout/wrapper";
import SearchBar from "../../components/UI/inputs/searchBar";
import FilterDrawer from "./../../components/UI/drawers/filterDrawer";
import SortDrawer from "./../../components/UI/drawers/sortDrawer";
import UserLeftMenu from "../../components/layout/userLetfMenu/userLeftMenu";
import Pagination from "../../components/UI/pagination";
import InfoBox from "../../components/UI/infoBox";

import orderService from "../../services/order";
import { ordersFilterOptions, ordersSortOptions } from "../../data";

import styles from "./orderHistory.module.scss";

const OrderHistory = () => {
  const [page, setPage] = useState(1);
  const [filterOrders, setFilterOrders] = useState([]);
  const [orders, setOrders] = useState([]);

  const authen = useSelector((state) => state.authentication);
  const history = useHistory();
  const queries = history.location.search.slice(1);
  const otherQueries = queries
    .split("&")
    .filter((q) => !q.includes("skip") && !q.includes("limit"))
    .join("&");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const ordersData = await orderService.getAll(
          `user=${authen?.user?.id}&${otherQueries}`,
          authen?.user?.token
        );
        setFilterOrders(ordersData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen, otherQueries]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!authen?.user) return;
        const ordersData = await orderService.getAll(
          `user=${authen?.user?.id}&${queries}`,
          authen?.user?.token
        );
        setOrders(ordersData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [authen, queries]);

  if (!authen.user?.id)
    return <InfoBox text="Permission denied" btnText="Sign In" url="/signin" />;
  if (!orders)
    return (
      <InfoBox text="No order found" btnText="Back to home page" url="/" />
    );

  return (
    <Wrapper>
      <div className={styles.main}>
        <UserLeftMenu />
        <div className={styles.container}>
          <div className={styles.header}>
            <h2>My Orders</h2>
            <div className={styles.btnContainers}>
              <div className={styles.btn}>
                <SortDrawer sortOptions={ordersSortOptions} />
              </div>
              <div className={styles.btn}>
                <FilterDrawer filterOptions={ordersFilterOptions} />
              </div>
            </div>
          </div>
          {orders.length ? (
            <>
              <SearchBar borderRadius="square" />
              <ul className={styles.ordersList}>
                {orders.map((order) => (
                  <Order
                    key={order.id}
                    order={order}
                    userId={authen?.user?.id}
                  />
                ))}
              </ul>
              <Pagination
                page={page}
                setPage={setPage}
                totalPages={Math.ceil(filterOrders.length / 2)}
                itemsPerPage={2}
                theme="white"
              />
            </>
          ) : (
            <p>No order found</p>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default withRouter(OrderHistory);
