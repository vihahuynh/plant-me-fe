import styles from "./cartItem.module.scss";

import { useDispatch } from "react-redux";

import Price from "./../products/price";
import QuantityInput from "../UI/quantityInput";
import CheckBox from "../UI/checkBox";

import { TbTrash } from "react-icons/tb/index";

import { cartActions } from "../../store";

const CartItem = ({ item, checkoutAllItems }) => {
  const dispatch = useDispatch();

  const onRemoveItem = () => {
    dispatch(cartActions.removeItem({ id: item.id }));
  };

  const onCheckout = () => {
    const checkoutItem = {
      ...item,
      netPrice: Math.round(item.price - (item.price * item.salePercent / 100)),
      isCheckout: !item.isCheckout
    }
    dispatch(cartActions.updateItem({ item: checkoutItem }))
    if (!checkoutItem.isCheckout && checkoutAllItems) {
      dispatch(cartActions.toggleCheckoutAll({ value: false }))
    }
  }

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

  const netPrice = Math.round(item.price - (item.price * item.salePercent / 100))
  return (
    <div className={styles.container}>
      <div className={styles.itemInfo}>
        <CheckBox
          checked={item.isCheckout}
          name={item.name}
          value={item.id}
          onChange={onCheckout}
        />
        <img src={item.imageUrl} alt={item.name} />
        <p>{item.name}</p>
      </div>
      <div className={styles.quantity}>
        <Price price={item.price} salePercent={item.salePercent} />
        <QuantityInput
          quantity={item.quantity.toString()}
          onChange={onUpdateQuantity}
        />
        <Price price={netPrice * item.quantity} size="large" />
      </div>
      <TbTrash className={styles.icon} onClick={onRemoveItem} />
    </div>
  );
};

export default CartItem;
