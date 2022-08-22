import styles from "./cart.module.scss";

import CartItem from "./cartItem";
import Button from "./../UI/button"
import CheckBox from "../UI/checkBox";

import { cartActions } from "../../store";

import { TbTrash } from "react-icons/tb/index";

import { useDispatch, useSelector } from "react-redux";

const Cart = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const subTotal = cart.items
    .filter(item => item.isCheckout)
    .reduce((total, item) => total + item.netPrice * item.quantity, 0)

  const onCheckoutAllItems = () => {
    cart.items.forEach(item => {
      const cartItem = {
        ...item,
        isCheckout: true
      }
      dispatch(cartActions.updateItem({ item: cartItem }))
    })
  }

  const onDeleteCheckedItems = () => {
    cart.items.forEach(item => {
      dispatch(cartActions.removeItem({ id: item.id }))
    })
  }
  console.log(subTotal)
  console.log(cart)
  return (
    <div className={styles.container}>
      <div className={styles.cart}>
        <div className={styles.cartHeader}>
          <div className={styles.selectAll}>
            <CheckBox name="all" value="" label="Select all items" onChange={onCheckoutAllItems} />
          </div>
          <TbTrash className={styles.icon} onClick={onDeleteCheckedItems} />
        </div>
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
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
          <h5>
            Order Summary
          </h5>
          <div className={styles.subTotal}>
            <p className={styles.summarySubTitle}>Subtotal</p>
            {subTotal
              ? <p>{subTotal}.000 &#x20ab;</p>
              : <p>0 &#x20ab;</p>}
          </div>
          <div className={styles.shipping}>
            <p className={styles.summarySubTitle}>Shipping</p>
            <p>0 &#x20ab;</p>
          </div>
          <div className={styles.total}>
            <p className={styles.summarySubTitle}>Total</p>
            {subTotal
              ? <p className={styles.totalPrice}>{subTotal}.000 &#x20ab;</p>
              : <p className={styles.totalPrice}>0 &#x20ab;</p>}
          </div>
        </div>
        <Button borderRadius="square" text="CHECKOUT" size="large" />
      </div>
    </div >
  );
};

export default Cart;
