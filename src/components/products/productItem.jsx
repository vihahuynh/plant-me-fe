import styles from "./productItem.module.scss";
import Button from "../UI/buttons/button";
import Price from "./price";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store";
import { alertActions } from "../../store";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs/index";
let delay;

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory()

  const addToCartHandler = () => {
    clearTimeout(delay);
    const cartItem = {
      ...product,
      quantity: 1,
    };
    dispatch(cartActions.addItem({ item: cartItem }));
    dispatch(
      alertActions.updateMessage({
        message: "Product has been added to your cart",
        type: "info",
      })
    );
    delay = setTimeout(() => dispatch(alertActions.clear()), 3000);
  };

  const goToDetailsPage = () => {
    history.push(`/products/${product?.id}`)
  }

  return (
    <div className={styles.productContainer} onClick={goToDetailsPage}>
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
