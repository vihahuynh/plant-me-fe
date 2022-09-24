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

const CartItem = ({ item, checkoutAllItems, isShowCheckbox = true }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);

  const onRemoveItem = () => {
    dispatch(cartActions.removeItem({ item }));
  };

  const onCheckout = () => {
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
          {isShowCheckbox && (
            <CheckBox
              checked={item.isCheckout || false}
              name={`${item.id}-${item.size}-${item.color}`}
              value={`${item.id}-${item.size}-${item.color}`}
              onChange={onCheckout}
            />
          )}
          <img src={item.image} alt={item.name} />
          <div>
            <p>{item.title}</p>
            <div>Size: {item.size}</div>
            <div>
              Color:
              <span
                className={styles.color}
                style={{ backgroundColor: item.color }}
              />
            </div>
          </div>
        </div>
        <div className={styles.quantity}>
          <Price price={item.price} salePercent={item.salePercent} />
          <QuantityInput
            quantity={item.quantity.toString()}
            onChange={onUpdateQuantity}
          />
          <div className={styles.totalPrice}>
            <Price price={netPrice * item.quantity} />
          </div>
        </div>
        <TbTrash className={styles.icon} onClick={onOpenModal} />
      </div>
    </>
  );
};

export default CartItem;
