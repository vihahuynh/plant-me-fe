import styles from "./cartItem.module.scss";
import { useState } from "react";
import ReactDOM from "react-dom";
import { useDispatch } from "react-redux";

import Price from "./../products/price";
import QuantityInput from "../UI/inputs/quantityInput";
import CheckBox from "../UI/inputs/checkBox";
import Modal from "../UI/modal";

import { TbTrash } from "react-icons/tb/index";

import { cartActions } from "../../store";

const CartItem = ({ item, checkoutAllItems }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);

  const onRemoveItem = () => {
    dispatch(cartActions.removeItem({ id: item.id }));
  };

  const onCheckout = () => {
    console.log("meow");
    const checkoutItem = {
      ...item,
      netPrice: Math.round(item.price - (item.price * item.salePercent) / 100),
      isCheckout: !item.isCheckout,
    };
    dispatch(cartActions.updateItem({ item: checkoutItem }));
    if (!checkoutItem.isCheckout && checkoutAllItems) {
      dispatch(cartActions.toggleCheckoutAll({ value: false }));
    }
  };

  const onUpdateQuantity = (quan) => {
    if (quan > 0) {
      const cartItem = {
        ...item,
        quantity: +quan,
      };
      dispatch(cartActions.updateItem({ item: cartItem }));
    } else if (quan === 0) {
      onOpenModal();
    }
  };

  const netPrice = Math.round(
    item.price - (item.price * item.salePercent) / 100
  );
  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          isOpen={openModal}
          title="Delete item"
          message="Are you sure you want to delete this item?"
          onConfirm={onRemoveItem}
          onCancel={onCloseModal}
          actionText="Delete"
        />,
        document.getElementById("overlay-root")
      )}
      <div className={styles.container}>
        <div className={styles.itemInfo}>
          <CheckBox
            checked={item.isCheckout || false}
            name={item.title}
            value={item.id}
            onChange={onCheckout}
          />
          <img src={item.image} alt={item.name} />
          <p>{item.title}</p>
        </div>
        <div className={styles.quantity}>
          <Price price={item.price} salePercent={item.salePercent} />
          <QuantityInput
            quantity={item.quantity.toString()}
            onChange={onUpdateQuantity}
          />
          <Price price={netPrice * item.quantity} size="large" />
        </div>
        <TbTrash className={styles.icon} onClick={onOpenModal} />
      </div>
    </>
  );
};

export default CartItem;
