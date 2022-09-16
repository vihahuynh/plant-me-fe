import OrderDetailsItem from "../components/orders/orderDetailsItem"
import { orderHistory } from "../data"

import Wrapper from "./../components/layout/wrapper"

import styles from "./orderDetails.module.scss"

const OrderDetails = () => {
    const orders = orderHistory[0]
    return <Wrapper>
        <div className={styles.orderDetails}>

            <div className={styles.orderDetailsHeader}>
                <h4> Order detail: #{orders.id} - <span>{orders.status}</span></h4>
                <p>Order date: {orders.createdAt}</p>
            </div>

            <div>
                <h5>Notification: </h5>
                <ul className={styles.notiList}>
                    {orders.notification.map(noti =>
                        <li key={noti.id} className={styles.notiItem}>
                            <span>{noti.createdAt}</span>
                            <p>{noti.text}</p>
                        </li>)
                    }
                </ul>
            </div>
            <div className={styles.boxes}>
                <h5 className={styles.subHeader}>Address</h5>
                <h5 className={styles.subHeader}>Delivery Method</h5>
                <h5 className={styles.subHeader}>Payment Method</h5>
            </div>
            <div className={styles.boxes}>
                <div className={styles.box}>
                    <p className={styles.boldText}>{orders.receiverName}</p>
                    <p>Address: {orders.address}</p>
                    <p>Phone number: {orders.phoneNumber}</p>
                </div>
                <div className={styles.box}>
                    <p>Estimated delivery date: {orders.estimatedDeliveryDate}</p>
                    <p>Delivery by: {orders.deliveryMethod}</p>
                    <p>Delivery charges: {orders.deliveryCharges}.000</p>
                </div>
                <div className={styles.box}>
                    <p>{orders.paymentMethod}</p>
                    <p className={styles.paymentStatus}>{orders.paymentStatus}</p>

                </div>
            </div>
            <div>
                <div className={styles.ordersTableHeader}>
                    <div>
                        <h5>Name</h5>
                        <h5>Price</h5>
                        <h5>Quantity</h5>
                        <h5>Discount</h5>
                        <h5>Payment</h5>
                    </div>
                </div>
                <ul className={styles.ordersList}>{orders.orders.map(order => <OrderDetailsItem key={order.id} order={order} />)}</ul>
                <div className={styles.summary}>
                    <p><span>Payment</span><span className={styles.boldText}>{orders.totalPayment}.000</span></p>
                    <p><span>Delivery charges</span><span className={styles.boldText}>{orders.deliveryCharges}.000</span></p>
                    <p><span>Discount</span><span className={styles.boldText}>{orders.discount}.000</span></p>
                    <p><span>Total</span><span className={styles.totalPayment}>{orders.netPayment}.000</span></p>
                </div>
            </div>
        </div >
    </Wrapper>
}

export default OrderDetails