import { useState } from "react";
import { useDispatch } from "react-redux";

import Rating from "@mui/material/Rating";
import Price from "./price";
import styles from "./buyInfo.module.scss";
import Button from "../UI/buttons/button";

import QuantityInput from "../UI/inputs/quantityInput";
import { cartActions } from "./../../store";
import { alertActions } from "./../../store";
import { products } from "../../data";

let delay;

const BuyInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState(null);
  const [color, setColor] = useState(null)

  const allColors = [...new Set(product?.stocks?.map(s => s.color))]
  const allSizes = [...new Set(product?.stocks?.map(s => s.size))]

  const [availableColors, setAvailableColors] = useState(allColors)
  const [availableSizes, setAvailableSizes] = useState(allSizes)
  const [availableQuantity, setAvailableQuantity] = useState(0)

  const dispatch = useDispatch();

  const onUpdateQuantity = (quan) => {
    if (+quan > 0 && +quan <= availableQuantity) setQuantity(+quan)
    else if (+quan <= 0) setQuantity(1)
    else setQuantity(availableQuantity)
  }

  const onAddToCart = () => {
    clearTimeout(delay);
    if (!color || !size) {
      dispatch(alertActions.updateMessage({ message: "Please choose color and size!", type: "warning" }))
      delay = setTimeout(() => dispatch(alertActions.clear()), 3000);
      return
    }
    if (quantity > availableQuantity) {
      const message = availableQuantity ? `Only ${availableQuantity} products available!` : 'Out of stock'
      dispatch(alertActions.updateMessage({ message, type: "warning" }))
      delay = setTimeout(() => dispatch(alertActions.clear()), 3000);
      return
    }
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      salePercent: product.salePercent,
      image:
        product.images.find((img) => img.includes("eye")) || product.images[0],
      discount: Math.round((product.price * product.salePercent) / 100),
      color,
      size,
      quantity,
      deliveryCharges: 10,
      stock: product.stocks.find(s => s.color === color && s.size === size)
    };
    dispatch(cartActions.addItem({ item: cartItem }));
    dispatch(
      alertActions.updateMessage({
        message: "Added to cart",
        type: "info",
      })
    );
    delay = setTimeout(() => dispatch(alertActions.clear()), 3000);
  };

  const rating = product?.reviews.reduce((averageRating, review) => {
    averageRating += review.rating / product?.reviews.length;
    return averageRating;
  }, 0);


  const onUpdateColor = (inputColor) => {
    const stockHaveColor = product.stocks.filter(s => s.color === inputColor)
    setAvailableSizes(stockHaveColor.map(s => s.size))
    setAvailableQuantity(product.stocks.find(s => s.color === inputColor && s.size === size)?.quantity ?? 0)
    setColor(inputColor)
  }

  const onUpdateSize = (inputSize) => {
    const stocksHaveSize = product.stocks.filter(s => s.size === inputSize)
    setAvailableColors(stocksHaveSize.map(s => s.color))
    setAvailableQuantity(product.stocks.find(s => s.color === color && s.size === inputSize)?.quantity ?? 0)
    setSize(inputSize)
  }

  return (
    <>
      <div>
        <h3 className={styles.title}>{product.title}</h3>
        <div className={styles.statisticContainer}>
          <span className={styles.statistic}>
            <Rating name="read-only" value={rating} readOnly />
          </span>
          <span className={styles.statistic}>
            {product.reviews.length} reviews
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
        <div className={styles.optionContainer}>
          <p className={styles.optionTitle}>Size</p>
          <ul className={styles.optionList}>
            {allSizes?.map((s) => {
              const sizeClassNames = `${styles.sizeItem} ${size === s ? styles.active : ""} ${!availableSizes.includes(s) ? styles.unavailable : ""}`
              return (
                <li
                  className={sizeClassNames}
                  key={s}
                  onClick={() => onUpdateSize(s)}
                >
                  {s}
                </li>
              )
            })}
          </ul>
        </div>
        <div className={styles.optionContainer}>
          <p className={styles.optionTitle}>Color</p>
          <ul className={styles.optionList}>
            {allColors.map((c) => {
              const normalStyle = {
                outline: `1px solid ${c}`,
                backgroundColor: c,
              }
              const unavailableStyles = {
                outline: '1px solid #eaedf3',
                backgroundColor: '#eaedf3',
                cursor: 'not-allowed'
              }
              // const colorClassNames = `${styles.colorItem} ${color === c ? styles.active : ""} ${!availableColors.includes(c) ? styles.unavailable : ""}`
              return (
                <li
                  style={!availableColors.includes(c) ? unavailableStyles : normalStyle}
                  className={
                    color !== c
                      ? styles.colorItem
                      : `${styles.colorItem} ${styles.active}`
                  }
                  key={c}
                  onClick={() => onUpdateColor(c)}
                ></li>
              )
            })}
          </ul>
        </div>
      </div>
      <div>
        {availableQuantity
          ? <p className={styles.quantityAvailable}>{availableQuantity} products available</p>
          : <p className={styles.quantityAvailable}>{color && size && !availableQuantity ? 'Out of stock' : <span>	&nbsp;</span>}</p>
        }
        <QuantityInput quantity={quantity} onChange={onUpdateQuantity} disabled={!availableQuantity} />
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
