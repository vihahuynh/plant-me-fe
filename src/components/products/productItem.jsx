import styles from "./productItem.module.scss";
import Button from "./../UI/button";
import Price from "./price";

import { useDispatch } from "react-redux";
import { cartActions } from "../../store";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs/index";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product) => {
    const cartItem = {
      ...product,
      quantity: 1,
    };
    console.log(cartItem);
    dispatch(cartActions.addItem({ item: cartItem }));
  };

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
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className={styles.productDetails}>
        <p>{product.name}</p>
        <Price price={product.price} salePercent={product.salePercent} />
        <Button
          className={styles.buttonCustom}
          text="Add to cart"
          size="medium"
          onClick={() => addToCartHandler(product)}
        />
      </div>
    </div>
  );
};

export default ProductItem;
