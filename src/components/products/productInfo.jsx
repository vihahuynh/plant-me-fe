import { useState } from "react"

import Rating from '@mui/material/Rating';
import Price from './price';
import styles from "./productInfo.module.scss"

const Option = ({ option }) => {
    const [isActive, setIsActive] = useState(false)
    return <li
        className={!isActive ? styles.optionItem : `${styles.optionItem} ${styles.active}`}
        key={option}
        onClick={() => setIsActive(prev => !prev)}
    >
        {option}
    </li>
}

const ProductInfo = ({ product }) => {
    return <>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.statisticContainer}>
            <span className={styles.statistic}><Rating name="read-only" value={product.rating} readOnly /></span>
            <span className={styles.statistic}>{product.ratingCount} ratings</span>
            <span className={styles.statistic}>{product.reviewCount} reviews</span>
            <span className={styles.statistic}>Sold: {product.soldCount}</span>
        </div>
        <Price price={product.price} salePercent={product.salePercent} size="big" />
        <div className={styles.optionContainer}>
            <p className={styles.optionTitle}>Size</p>
            <ul className={styles.optionList}>
                {product?.size?.map(s => <Option option={s} />)}
            </ul>
        </div>
    </>
}

export default ProductInfo