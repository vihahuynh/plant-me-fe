import styles from "./cartItem.module.scss";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { useDispatch, useSelector } from "react-redux";

import Price from "./../products/price";
import QuantityInput from "../UI/inputs/quantityInput";
import CheckBox from "../UI/inputs/checkBox";
import Modal from "../UI/modal";

import { TbTrash } from "react-icons/tb/index";
import {
  removeItem,
  updateItem,
  toggleCheckoutAll,
} from "../../store/cartSlice";

import stockService from "./../../services/stock";

const CartItem = ({
  item,
  checkoutAllItems,
  isShowCheckbox = true,
  setDisabledItems,
}) => {
  const cart = useSelector((state) => state.cart);
  const authen = useSelector((state) => state.authentication);
  const [stock, setStock] = useState(null);

  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);

  const onCloseModal = () => setOpenModal(false);
  const onOpenModal = () => setOpenModal(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stockData = await stockService.get(item.stock);
        setStock(stockData.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [item]);

  useEffect(() => {
    if (stock?.quantity < item?.quantity) {
      setDisabledItems((prev) => [...new Set(prev.concat(item._id))]);
    }
  }, [stock, item, setDisabledItems]);

  const onRemoveItem = async () => {
    await dispatch(
      removeItem({ cart, item, token: authen?.user?.token })
    ).unwrap();
  };

  const onCheckout = async () => {
    const checkoutItem = {
      ...item,
      netPrice: Math.round(item.price - (item.price * item.salePercent) / 100),
      isCheckout: !item.isCheckout,
    };
    await dispatch(
      updateItem({ cart, item: checkoutItem, token: authen?.user?.token })
    ).unwrap();
    if (!checkoutItem.isCheckout && checkoutAllItems) {
      await dispatch(
        toggleCheckoutAll({ cart, value: false, token: authen?.user?.token })
      ).unwrap();
    }
  };

  const onUpdateQuantity = async (quan) => {
    if (quan > 0) {
      const cartItem = { ...item };
      if (quan < stock?.quantity) {
        cartItem.quantity = +quan;
      } else {
        cartItem.quantity = stock.quantity;
      }
      await dispatch(
        updateItem({ cart, item: cartItem, token: authen?.user?.token })
      ).unwrap();
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
              disabled={stock?.quantity < item?.quantity}
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
          <div>
            {stock?.quantity === 0 && (
              <p className={styles.availableQuantity}>Out of stock</p>
            )}
            {stock?.quantity <= item.quantity && stock?.quantity !== 0 && (
              <p className={styles.availableQuantity}>
                {stock.quantity} products available
              </p>
            )}
            {stock?.quantity > item?.quantity && (
              <p className={styles.availableQuantity}>
                <span> &nbsp;</span>
              </p>
            )}
            <QuantityInput
              quantity={item.quantity.toString()}
              onChange={onUpdateQuantity}
              disabled={!stock?.quantity}
            />
          </div>
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
