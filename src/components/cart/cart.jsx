import styles from "./cart.module.scss";

import { cart } from "./../../data";
import CartItem from "./cartItem";

const Cart = () => {
  return (
    <div>
      <div>
        {cart.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
