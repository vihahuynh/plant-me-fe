import styles from "./cart.module.scss";

import CartItem from "./cartItem";
import Button from "./../UI/button"

import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  return (
    <div className={styles.container}>
      <div className={styles.cart}>
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
            <p>1244.000</p>
          </div>
          <div className={styles.shipping}>
            <p className={styles.summarySubTitle}>Shipping</p>
            <p>12.000</p>
          </div>
          <div className={styles.total}>
            <p className={styles.summarySubTitle}>Total</p>
            <p className={styles.totalPrice}>1344.000</p>
          </div>
        </div>
        <Button borderRadius="square" text="CHECKOUT" size="large" />
      </div>
    </div >
  );
};

export default Cart;
