import styles from "./price.module.scss"

const Price = ({ price, salePercent, size = "small" }) => {

    const netPrice = Math.round(
        price - (price * salePercent) / 100
    );

    return <div className={size === "small" ? styles.priceSmallContainer : styles.priceBigContainer}>
        <span className={styles.price}>{price}.000 &#x20ab;</span>
        <span className={styles.priceNet}>{netPrice}.000 &#x20ab;</span>
        <span className={styles.salePercent}>
            (&minus;{salePercent}%)
        </span>
    </div>
}

export default Price