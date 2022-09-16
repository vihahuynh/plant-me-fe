import styles from "./orderItem.module.scss"

const OrderItem = ({ order }) => {
    console.log(order)
    return <li className={styles.item}>
        <div className={styles.imgContainer}>
            <img className={styles.itemImg} src={order.product.images[0]} alt="" />
            <span className={styles.quantity}>x{order.quantity}</span>
        </div>
        <p className={styles.itemTitle}>{order.product.title}</p>
        <p className={styles.itemPrice}>{order.product.price}.000</p>
    </li>
}

export default OrderItem