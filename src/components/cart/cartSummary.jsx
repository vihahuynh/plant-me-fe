import styles from "./cartSummary.module.scss";

import Button from "./../UI/buttons/button";
import { useSelector } from "react-redux";

const CartSummary = ({ title, onClick }) => {
  const cart = useSelector((state) => state.cart);

  const subTotal = cart.items
    .filter((item) => item.isCheckout)
    .reduce((total, item) => total + ((item.price - Math.round(item.salePercent * item.price / 100)) * item.quantity), 0);

  return (
    <div className={styles.summary}>
      <div className={styles.delivery}>
        <Button text="Change" size="small" className={styles.change} />
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
      <Button
        borderRadius="square"
        text={title}
        size="large"
        className={styles.checkoutBtn}
        onClick={onClick}
      />
    </div>
  );
};

export default CartSummary;
