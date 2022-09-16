import styles from "./productItem.module.scss";
import Price from "./price";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authenticationActions } from "../../store";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs/index";
import userService from "../../services/user";

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const authen = useSelector((state) => state.authentication);
  const wasLiked = authen?.user?.likedProducts?.includes(product.id);

  const onLike = async () => {
    try {
      const currentUser = {
        ...authen.user,
        likedProducts: [
          ...new Set(authen.user?.likedProducts?.concat(product.id)),
        ],
      };
      await userService.update(currentUser.id, currentUser, currentUser.token);
      dispatch(authenticationActions.update({ user: currentUser }));
    } catch (err) {
      console.log(err);
    }
  };

  const onUnlike = async () => {
    try {
      const currentUser = {
        ...authen.user,
        likedProducts: authen.user?.likedProducts?.filter(
          (item) => item !== product.id
        ),
      };
      await userService.update(currentUser.id, currentUser, currentUser.token);
      dispatch(authenticationActions.update({ user: currentUser }));
    } catch (err) {
      console.log(err);
    }
  };
  const goToDetailsPage = () => {
    history.push(`/products/${product?.id}`);
  };

  const imageUrl =
    product?.images?.find((img) => img?.includes("eye")) ||
    product?.images[0] ||
    "";

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
      <div className={styles.productDetails}>
        <p>{product.title}</p>
        <Price price={product.price} salePercent={product.salePercent} />
      </div>
    </div>
  );
};

export default ProductItem;
