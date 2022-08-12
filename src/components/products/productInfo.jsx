import { useState } from "react";

import Rating from "@mui/material/Rating";
import Price from "./price";
import styles from "./productInfo.module.scss";
import Button from "./../UI/button";

import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
} from "react-icons/ai/index";

const ProductInfo = ({ product }) => {
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const onMinus = () => setQuantity((prev) => (prev - 1 > 0 ? prev - 1 : 1));
  const onPlus = () => setQuantity((prev) => prev + 1);

  return (
    <>
      <h3 className={styles.title}>{product.title}</h3>
      <div className={styles.statisticContainer}>
        <span className={styles.statistic}>
          <Rating name="read-only" value={product.rating} readOnly />
        </span>
        <span className={styles.statistic}>{product.reviewCount} reviews</span>
        <span className={styles.statistic}>Sold: {product.soldCount}</span>
      </div>
      <Price
        price={product.price}
        salePercent={product.salePercent}
        size="big"
      />
      {!!product.size && (
        <div className={styles.optionContainer}>
          <p className={styles.optionTitle}>Size</p>
          <ul className={styles.optionList}>
            {product?.size?.map((s) => (
              <li
                className={
                  size !== s
                    ? styles.sizeItem
                    : `${styles.sizeItem} ${styles.active}`
                }
                key={s}
                onClick={() => setSize(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
      {!!product.colors && (
        <div className={styles.optionContainer}>
          <p className={styles.optionTitle}>Color</p>
          <ul className={styles.optionList}>
            {product?.colors?.map((c) => (
              <li
                style={{
                  color: c,
                  outline: `1px solid ${c}`,
                  backgroundColor: c,
                }}
                className={
                  color !== c
                    ? styles.colorItem
                    : `${styles.colorItem} ${styles.active}`
                }
                key={c}
                onClick={() => setColor(c)}
              ></li>
            ))}
          </ul>
        </div>
      )}
      <div className={styles.quantityContainer}>
        <span onClick={onMinus}>
          <AiOutlineMinusCircle className={styles.icon} />
        </span>
        <input
          className={styles.quantityInput}
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(+e.value.target)}
        />
        <span onClick={onPlus}>
          <AiOutlinePlusCircle className={styles.icon} />
        </span>
      </div>
      <Button text="Add to cart" size="medium" className={styles.btn} />
    </>
  );
};

export default ProductInfo;
