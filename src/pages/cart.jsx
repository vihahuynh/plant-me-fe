import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import Wrapper from "./../components/layout/wrapper";
import Cart from "./../components/cart/cart";

import styles from "./cart.module.scss";
import CartSummary from "../components/cart/cartSummary";
import LinkButton from "../components/UI/buttons/linkbutton";

import { alertActions, cartActions } from "./../store";
import cartService from "../services/cart";
import stockSerice from "../services/stock";
import { updateItem } from "../store/cartSlice";

let delay;

const CartPage = () => {
  const cart = useSelector((state) => state.cart);
  const authen = useSelector((state) => state.authentication);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  const onCheckout = async () => {
    setIsLoading(true);
    try {
      if (!cart?.items?.find((item) => item.isCheckout)) {
        clearTimeout(delay);
        dispatch(
          alertActions.updateMessage({
            message: "Please select at least one item to checkout",
            type: "warning",
          })
        );
        delay = setTimeout(() => {
          dispatch(alertActions.clear());
        }, 4000);
      } else {
        let allowCheckout = true;
        const cartData = await cartService.get(
          authen?.user?.cart,
          authen?.user?.token
        );
        dispatch(cartActions.updateCart({ cart: cartData.data }));
        for (let item of cart?.items) {
          const stockData = await stockSerice.get(item.stock);
          if (stockData?.data?.quantity < item.quantity) {
            allowCheckout = false;
            const cartToUpdate = { ...cart };
            const cartItem = { ...item, isCheckout: false };
            await dispatch(
              updateItem({
                cart: cartToUpdate,
                item: cartItem,
                token: authen?.user?.token,
              })
            ).unwrap();
          }
        }
        if (!allowCheckout) {
          clearTimeout(delay);
          dispatch(
            alertActions.updateMessage({
              message: "Some products do not have enough quantity",
              type: "warning",
            })
          );
          delay = setTimeout(() => {
            dispatch(alertActions.clear());
          }, 4000);
        } else {
          history.push("/checkout");
        }
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      {!!cart.items.length ? (
        <div className={styles.container}>
          <Cart />
          <CartSummary
            title="CHECKOUT"
            onClick={onCheckout}
            disabled={isLoading}
          />
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
