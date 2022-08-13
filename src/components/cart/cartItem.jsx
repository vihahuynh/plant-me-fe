import styles from "./cartItem.module.scss";

import Price from "./../products/price";
import QuantityInput from "../UI/quantityInput";
import CheckBox from "../UI/checkBox";

import { TbTrash } from "react-icons/tb/index";

const CartItem = ({ item }) => {
  return (
    <div className={styles.container}>
      <CheckBox name={item.productName} label="" />
      <img src={item.imageUrl} alt={item.productName} />
      <Price price={item.price} />
      <QuantityInput quan={item.quantity} />
      <Price price={item.price * item.quantity} size="large" />
      <TbTrash className={styles.icon} />
    </div>
  );
};

export default CartItem;
