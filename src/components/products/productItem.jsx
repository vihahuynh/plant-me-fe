import styles from "./productItem.module.scss";
import Button from "../UI/buttons/button";
import Price from "./price";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions, cartActions } from "../../store";
import { alertActions } from "../../store";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs/index";
import userService from "../../services/user";
let delay;

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory()
  const authen = useSelector(state => state.authentication)
  const wasLiked = authen?.user?.likedProducts.includes(product.id)

  const onLike = async () => {
    try {
      const currentUser = { ...authen.user, likedProducts: [...new Set(authen.user?.likedProducts?.concat(product.id))] }
      await userService.update(currentUser.id, currentUser, currentUser.token)
      dispatch(authenticationActions.update({ user: currentUser }))
    } catch (err) {
      console.log(err)
    }
  }

  const onUnlike = async () => {
    try {
      const currentUser = { ...authen.user, likedProducts: authen.user?.likedProducts?.filter(item => item !== product.id) }
      await userService.update(currentUser.id, currentUser, currentUser.token)
      dispatch(authenticationActions.update({ user: currentUser }))
    } catch (err) {
      console.log(err)
    }
  }

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

  const imageUrl = product?.images?.find(img => img?.includes("eye")) || product?.images[0] || ""

  return (
    <div className={styles.productContainer}>
      <div className={styles.iconContainer}>
        {!wasLiked ? (
          <BsSuitHeart className={styles.icon} onClick={onLike} />
        ) : (
          <BsSuitHeartFill className={styles.icon} onClick={onUnlike} />
        )}
      </div>
      <div className={styles.imgContainer}>
        <img src={imageUrl} alt={product.name} onClick={goToDetailsPage} />
      </div>
      <div className={styles.productDetails} >
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
