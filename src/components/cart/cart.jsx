import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./cart.module.scss";

import CartItem from "./cartItem";
import CheckBox from "../UI/inputs/checkBox";
import Modal from "../UI/modal";

import { cartActions } from "../../store";
import { alertActions } from "../../store";

import { TbTrash } from "react-icons/tb/index";

let delay;

const Cart = ({ isShowCheckBox = true }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => {
    if (!cart?.items.find((item) => item.isCheckout)) {
      clearTimeout(delay);
      dispatch(
        alertActions.updateMessage({
          message: "Please select at least one item to delete",
          type: "warning",
        })
      );
      delay = setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    } else {
      setOpenModal(true);
    }
  };

  useEffect(() => {
    if (
      cart.items.filter((item) => item.isCheckout).length === cart.items.length
    ) {
      dispatch(cartActions.toggleCheckoutAll({ value: true }));
    }
  }, [dispatch, cart.items]);

  const onSelectAllItems = () => {
    cart.items.forEach((item) => {
      const cartItem = {
        ...item,
        netPrice: Math.round(
          item.price - (item.price * item.salePercent) / 100
        ),
        isCheckout: cart.checkoutAllItems ? false : true,
      };
      dispatch(cartActions.updateItem({ item: cartItem }));
      dispatch(
        cartActions.toggleCheckoutAll({ value: !cart.checkoutAllItems })
      );
    });
  };

  const onDeleteCheckedItems = () => {
    dispatch(cartActions.clear());
    dispatch(cartActions.toggleCheckoutAll({ values: false }));
    setOpenModal(false);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Modal
          isOpen={openModal}
          title="Delete selected cart items"
          message="Are you sure you want to delete selected items?"
          onConfirm={onDeleteCheckedItems}
          onCancel={onCloseModal}
          actionText="Delete"
        />,
        document.getElementById("overlay-root")
      )}
      <div className={styles.cart}>
        {isShowCheckBox && (
          <div className={styles.cartHeader}>
            <div className={styles.selectAll}>
              <CheckBox
                name="all"
                value=""
                label="Select all items"
                onChange={onSelectAllItems}
                checked={cart.checkoutAllItems || false}
              />
            </div>
            <TbTrash className={styles.icon} onClick={onOpenModal} />
          </div>
        )}
        {cart.items.map((item) => (
          <CartItem
            key={`${item.id}-${item.size}-${item.color}`}
            item={item}
            checkoutAllItems={cart.checkoutAllItems}
            isShowCheckbox={isShowCheckBox}
          />
        ))}
      </div>
    </>
  );
};

export default Cart;
