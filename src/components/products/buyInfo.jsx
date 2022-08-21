import { useState, useCallback } from "react";
import { useDispatch } from "react-redux";

import Rating from "@mui/material/Rating";
import Price from "./price";
import styles from "./buyInfo.module.scss";
import Button from "../UI/button";

import QuantityInput from "../UI/quantityInput";
import { cartActions } from "./../../store";

const BuyInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(product.size[0]);
  const [color, setColor] = useState(product.colors[0]);

  const dispatch = useDispatch();

  const onUpdateQuantity = useCallback((quan) => setQuantity(quan), []);

  const onAddToCart = () => {
    const cartItem = {
      ...product,
      color,
      size,
      quantity,
    };
    dispatch(cartActions.addItem({ item: cartItem }));
  };

  return (
    <>
      <div>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.statisticContainer}>
          <span className={styles.statistic}>
            <Rating name="read-only" value={product.rating} readOnly />
          </span>
          <span className={styles.statistic}>
            {product.reviewCount} reviews
          </span>
          <span className={styles.statistic}>Sold: {product.soldCount}</span>
        </div>
        <Price
          price={product.price}
          salePercent={product.salePercent}
          size="big"
        />
      </div>

      <div>
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
      </div>

      <div>
        <QuantityInput quantity={quantity} onChange={onUpdateQuantity} />
        <Button
          text="Add to cart"
          size="medium"
          className={styles.btn}
          onClick={onAddToCart}
        />
      </div>
    </>
  );
};

export default BuyInfo;
