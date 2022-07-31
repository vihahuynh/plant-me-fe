import styles from "./productItem.module.scss";
import Button from "./../UI/button";

import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs/index";

const ProductItem = ({ product }) => {
  const addToCartHandler = (id) => {
    console.log(id);
  };
  const netPrice = Math.round(
    product.price - (product.price * product.salePercent) / 100
  );

  return (
    <div className={styles.productContainer}>
      <div className={styles.iconContainer}>
        {product.like ? (
          <BsSuitHeart className={styles.icon} />
        ) : (
          <BsSuitHeartFill className={styles.icon} />
        )}
      </div>
      <div className={styles.imgContainer}>
        <img src={product.url} alt={product.name} />
      </div>
      <div className={styles.productDetails}>
        <p>{product.name}</p>
        <div className={styles.priceContainer}>
          <span className={styles.price}>{product.price}.000 &#x20ab;</span>
          <span className={styles.priceNet}>{netPrice}.000 &#x20ab;</span>
          <span className={styles.salePercent}>
            (&minus;{product.salePercent}%)
          </span>
        </div>
        <Button
          className={styles.buttonCustom}
          text="Add to cart"
          size="medium"
          onClick={() => addToCartHandler(product.id)}
        />
      </div>
    </div>
  );
};

export default ProductItem;
