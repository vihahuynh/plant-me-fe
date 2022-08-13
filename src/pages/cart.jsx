import Wrapper from "./../components/layout/wrapper";
import Cart from "./../components/cart/cart";

import styles from "./cart.module.scss";

const CartPage = () => {
  return (
    <Wrapper>
      <div className={styles.container}>
        <Cart />
      </div>
    </Wrapper>
  );
};

export default CartPage;
