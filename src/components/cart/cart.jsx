import styles from "./cart.module.scss";

import CartItem from "./cartItem";
import { useSelector } from "react-redux";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  console.log(cart);
  return (
    <div>
      <div>
        {cart.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>
      <div>Summary</div>
    </div>
  );
};

export default Cart;
