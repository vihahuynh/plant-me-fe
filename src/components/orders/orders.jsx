import OrderItem from "./orderItem"
import ButtonLink from "./../UI/buttons/linkbutton"

import styles from "./orders.module.scss"

import { TiCancel } from "react-icons/ti"
import { TbTruckDelivery } from "react-icons/tb"
import { MdOutlinePayment } from "react-icons/md"
import { FiPackage } from "react-icons/fi"
import { AiOutlineFileDone } from "react-icons/ai"

const getStatusIcon = (status) => {
    switch (status) {
        case "Waiting for payment":
            return <MdOutlinePayment className={styles.icon} />
        case "Packed":
            return <FiPackage className={styles.icon} />
        case "In Transit":
            return <TbTruckDelivery className={styles.icon} />

        case "Delivered":
            return <AiOutlineFileDone className={styles.icon} />

        case "Cancelled":
            return <TiCancel className={styles.icon} />
        default:
            return null
    }
}

const Orders = ({ orders }) => {
    const statusIcon = getStatusIcon(orders.status)

    return <li className={styles.ordersContainer}>
        <div className={styles.ordersHeader}>
            {statusIcon}
            <p>{orders.status}</p>
        </div>
        <ul>
            {orders?.orders?.map(order => <OrderItem key={order.id} order={order} />)}
        </ul>
        <div className={styles.ordersFooter} >
            <p className={styles.ordersPaymentBox}>Total payment: <span className={styles.ordersPayment}>{orders.netPayment}.000</span></p>
            <div className={styles.ordersBtnGroup}>
                <ButtonLink text="Buy again" size="small" borderRadius="square" className={styles.ordersBtn} />
                <ButtonLink text="View details" size="small" borderRadius="square" className={styles.ordersBtn} />
            </div>
        </div>
    </li >

}

export default Orders