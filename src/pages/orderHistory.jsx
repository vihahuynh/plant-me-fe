import { orderHistory, ordersFilterOptions, ordersSortOptions } from "../data"
import Orders from "../components/orders/orders"
import Wrapper from "../components/layout/wrapper"
import SearchBar from "../components/UI/inputs/searchBar"
import FilterDrawer from "./../components/UI/drawers/filterDrawer"
import SortDrawer from "./../components/UI/drawers/sortDrawer"

import styles from "./orderHistory.module.scss"

const OrderHistory = () => {
    return <Wrapper>
        <div className={styles.container}>
            <div className={styles.header}>
                <h2>My Orders</h2>
                {!!orderHistory.length && (
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
                {orderHistory.map(orders => <Orders key={orders.id} orders={orders} />)}
            </ul>
        </div>
    </Wrapper>
}

export default OrderHistory