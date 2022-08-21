import styles from "./cartItem.module.scss";

import { useDispatch } from "react-redux";

import Price from "./../products/price";
import QuantityInput from "../UI/quantityInput";
import CheckBox from "../UI/checkBox";

import { TbTrash } from "react-icons/tb/index";

import { cartActions } from "../../store";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const onRemoveItem = () => {
    dispatch(cartActions.removeItem({ id: item.id }));
  };

  const onUpdateQuantity = (quan) => {
    if (quan > 0) {
      const cartItem = {
        ...item,
        quantity: +quan,
      };
      dispatch(cartActions.updateItem({ item: cartItem }));
    } else {
      console.log("confirm remove item");
    }
  };

  return (
    <div className={styles.container}>
      <CheckBox name={item.productName} label="" />
      <img src={item.imageUrl} alt={item.productName} />
      <Price price={item.price} />
      <QuantityInput
        quantity={item.quantity.toString()}
        onChange={onUpdateQuantity}
      />
      <Price price={item.price * item.quantity} size="large" />
      <TbTrash className={styles.icon} onClick={onRemoveItem} />
    </div>
  );
};

export default CartItem;
