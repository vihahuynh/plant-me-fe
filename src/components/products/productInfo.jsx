import { useState } from "react"

import Rating from '@mui/material/Rating';
import Price from './price';
import styles from "./productInfo.module.scss"
import Button from "./../UI/button";

const ProductInfo = ({ product }) => {
    const [size, setSize] = useState(null)
    const [color, setColor] = useState(null)

    return <>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.statisticContainer}>
            <span className={styles.statistic}><Rating name="read-only" value={product.rating} readOnly /></span>
            <span className={styles.statistic}>{product.ratingCount} ratings</span>
            <span className={styles.statistic}>{product.reviewCount} reviews</span>
            <span className={styles.statistic}>Sold: {product.soldCount}</span>
        </div>
        <Price price={product.price} salePercent={product.salePercent} size="big" />
        {!!product.size && <div className={styles.optionContainer}>
            <p className={styles.optionTitle}>Size</p>
            <ul className={styles.optionList}>
                {product?.size?.map(s =>
                    <li
                        className={size !== s ? styles.optionItem : `${styles.optionItem} ${styles.active}`}
                        key={s}
                        onClick={() => setSize(s)}
                    >
                        {s}
                    </li>
                )}
            </ul>
        </div>}
        {!!product.colors && <div className={styles.optionContainer}>
            <p className={styles.optionTitle}>Color</p>
            <ul className={styles.optionList}>
                {product?.colors?.map(c =>
                    <li
                        className={color !== c ? styles.optionItem : `${styles.optionItem} ${styles.active}`}
                        key={c}
                        onClick={() => setColor(c)}
                    >
                        {c}
                    </li>
                )}
            </ul>
        </div>}
        <div>

        </div>
        <Button text="Add to cart" size="large" className={styles.btn} />
    </>
}

export default ProductInfo