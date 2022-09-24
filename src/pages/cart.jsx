import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Wrapper from "./../components/layout/wrapper";
import Cart from "./../components/cart/cart";

import styles from "./cart.module.scss";
import CartSummary from "../components/cart/cartSummary";
import LinkButton from "../components/UI/buttons/linkbutton";

import { alertActions } from "./../store";

let delay;

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const history = useHistory();

  const onCheckout = () => {
    if (!cart?.items.find((item) => item.isCheckout)) {
      clearTimeout(delay);
      dispatch(
        alertActions.updateMessage({
          message: "Please select at least one item to checkout",
          type: "warning",
        })
      );
      delay = setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    } else {
      history.push("/checkout");
    }
  };

  return (
    <Wrapper>
      {!!cart.items.length ? (
        <div className={styles.container}>
          <Cart />
          <CartSummary title="CHECKOUT" onClick={onCheckout} />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.infoBox}>
            <img src="./images/logo.png" alt="" />
            <p>No items found</p>
            <LinkButton
              text="Back to Shopping"
              size="medium"
              url="/shop"
              className={styles.btn}
            />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default CartPage;
