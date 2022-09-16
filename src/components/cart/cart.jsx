import { useState } from "react";
import ReactDOM from "react-dom";

import styles from "./cart.module.scss";

import CartItem from "./cartItem";
import Button from "../UI/buttons/button";
import CheckBox from "../UI/inputs/checkBox";
import LinkButton from "../UI/buttons/linkbutton";

import { cartActions } from "../../store";
import { alertActions } from "../../store";

import { TbTrash } from "react-icons/tb/index";

import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Modal from "../UI/modal";

let delay;

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [openModal, setOpenModal] = useState(false);

  console.log(cart);

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => {
    if (!cart.items.find((item) => item.isCheckout)) {
      clearTimeout(delay);
      dispatch(
        alertActions.updateMessage({
          message: "Please select at least one item",
          type: "warning",
        })
      );
      delay = setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    } else {
      setOpenModal(true);
    }
  };

  const subTotal = cart.items
    .filter((item) => item.isCheckout)
    .reduce((total, item) => total + item.netPrice * item.quantity, 0);

  useEffect(() => {
    if (
      cart.items.filter((item) => item.isCheckout).length === cart.items.length
    ) {
      dispatch(cartActions.toggleCheckoutAll({ value: true }));
    }
  }, [dispatch, cart.items]);

  const onSelectAllItems = () => {
    cart.items.forEach((item) => {
      const cartItem = {
        ...item,
        netPrice: Math.round(
          item.price - (item.price * item.salePercent) / 100
        ),
        isCheckout: cart.checkoutAllItems ? false : true,
      };
      dispatch(cartActions.updateItem({ item: cartItem }));
      dispatch(
        cartActions.toggleCheckoutAll({ value: !cart.checkoutAllItems })
      );
    });
  };

  const onDeleteCheckedItems = () => {
    cart.items.forEach((item) => {
      if (item.isCheckout) {
        dispatch(cartActions.removeItem({ id: item.id }));
      }
    });
    dispatch(cartActions.toggleCheckoutAll({ values: false }));
    setOpenModal(false);
  };

  if (cart.items.length > 0)
    return (
      <>
        {ReactDOM.createPortal(
          <Modal
            isOpen={openModal}
            title="Delete selected cart items"
            message="Are you sure you want to delete selected items?"
            onConfirm={onDeleteCheckedItems}
            onCancel={onCloseModal}
            actionText="Delete"
          />,
          document.getElementById("overlay-root")
        )}

        <div className={styles.container}>
          <div className={styles.cart}>
            <div className={styles.cartHeader}>
              <div className={styles.selectAll}>
                <CheckBox
                  name="all"
                  value=""
                  label="Select all items"
                  onChange={onSelectAllItems}
                  checked={cart.checkoutAllItems || false}
                />
              </div>
              <TbTrash className={styles.icon} onClick={onOpenModal} />
            </div>
            {cart.items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                checkoutAllItems={cart.checkoutAllItems}
              />
            ))}
          </div>
          <div className={styles.summary}>
            <div className={styles.delivery}>
              <Button text="Change" size="medium" className={styles.change} />
              <h5>Delivery to</h5>
              <div className={styles.userInfo}>
                <p>Huynh Vi Ha</p>
                <p>076 690 1516</p>
              </div>
              <p className={styles.address}>168B Bai Say 01 06 tpchm</p>
            </div>
            <div className={styles.orderSummary}>
              <h5>Order Summary</h5>
              <div className={styles.subTotal}>
                <p className={styles.summarySubTitle}>Subtotal</p>
                {subTotal ? <p>{subTotal}.000 &#x20ab;</p> : <p>0 &#x20ab;</p>}
              </div>
              <div className={styles.shipping}>
                <p className={styles.summarySubTitle}>Shipping</p>
                <p>0 &#x20ab;</p>
              </div>
              <div className={styles.total}>
                <p className={styles.summarySubTitle}>Total</p>
                {subTotal ? (
                  <p className={styles.totalPrice}>{subTotal}.000 &#x20ab;</p>
                ) : (
                  <p className={styles.totalPrice}>0 &#x20ab;</p>
                )}
              </div>
            </div>
            <Button borderRadius="square" text="CHECKOUT" size="large" />
          </div>
        </div>
      </>
    );

  return (
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
  );
};

export default Cart;
