import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import styles from "./cart.module.scss";

import CartItem from "./cartItem";
import CheckBox from "../UI/inputs/checkBox";
import Modal from "../UI/modal";
import SignInForm from "../UI/signInForm";

import { alertActions, authenticationActions } from "../../store";
import { updateItem, toggleCheckoutAll, clear } from "../../store/cartSlice";

import { TbTrash } from "react-icons/tb/index";

let delay;

const Cart = ({ isShowCheckBox = true }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const authen = useSelector((state) => state.authentication);
  const [openModal, setOpenModal] = useState(false);
  const [openSignInModal, setOpenSignInModal] = useState(false)
  const [disabledItem, setDisabledItems] = useState([]);

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
    const updateCart = async () => {
      try {
        await dispatch(
          toggleCheckoutAll({ cart, value: true, token: authen?.user?.token })
        ).unwrap();
      } catch (err) {
        console.log(err);
      }
    };
    if (
      cart.items.filter((item) => item.isCheckout).length === cart.items.length
    ) {
      updateCart();
    }
  }, [dispatch, cart, authen?.user?.token]);

  const onSelectAllItems = async () => {
    try {
      const isCheckout = !cart.checkoutAllItems;
      const cartToUpdate = {
        ...cart,
        items: cart.items.map((i) => {
          return {
            ...i,
            isCheckout: disabledItem.includes(i._id) ? false : isCheckout,
          };
        }),
        checkoutAllItems: isCheckout,
      };

      await Promise.all(
        cart.items.map(async (item) => {
          const cartItem = {
            ...item,
            netPrice: Math.round(
              item.price - (item.price * item.salePercent) / 100
            ),
            isCheckout: disabledItem.includes(item._id) ? false : isCheckout,
          };
          await dispatch(
            updateItem({
              cart: cartToUpdate,
              item: cartItem,
              token: authen?.user?.token,
            })
          ).unwrap();
        })
      );
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.error === "token expired" || err?.response?.data?.error === "invalid token" || err?.message === "token expired") {
        localStorage.removeItem("loggedUser");
        dispatch(authenticationActions.logout());
        setOpenSignInModal(true)
      }
    }
  };

  const onDeleteCheckedItems = async () => {
    try {
      await dispatch(clear({ cart, token: authen?.user?.token })).unwrap();
      setOpenModal(false);
    } catch (err) {
      console.log(err);
      if (err?.response?.data?.error === "token expired" || err?.response?.data?.error === "invalid token" || err?.message === "token expired") {
        localStorage.removeItem("loggedUser");
        dispatch(authenticationActions.logout());
        setOpenSignInModal(true)
      }
    }
  };

  const showItems = isShowCheckBox
    ? cart.items
    : cart.items.filter((item) => item.isCheckout);

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
        {showItems.map((item) => (
          <CartItem
            key={`${item.id}-${item.size}-${item.color}`}
            item={item}
            checkoutAllItems={cart.checkoutAllItems}
            isShowCheckbox={isShowCheckBox}
            setDisabledItems={setDisabledItems}
          />
        ))}
      </div>
      {ReactDOM.createPortal(
        <Modal isOpen={openSignInModal} size="medium" showButtonGroup={false} onCancel={() => setOpenSignInModal(false)}>
          <SignInForm title={authen?.user?.token ? "Token expired, please sign in again" : "Please sign in to continue"} setOpenModal={setOpenSignInModal} />
        </Modal>,
        document.getElementById("overlay-root")
      )}
    </>
  );
};

export default Cart;
