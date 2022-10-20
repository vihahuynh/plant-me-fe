import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Wrapper from "../components/layout/wrapper";
import Cart from "../components/cart/cart";
import CartSummary from "../components/cart/cartSummary";
import LinkButton from "../components/UI/buttons/linkbutton";

import { clearCheckoutItems } from "../store/cartSlice";

import styles from "./checkout.module.scss";
import stockService from "../services/stock";
import locationService from "../services/location";
import addressService from "../services/address";
import orderService from "../services/order";

import _ from "lodash";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const authen = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const history = useHistory();
  const items = cart.items.filter((item) => item.isCheckout);

  const [address, setAddress] = useState();
  const [deliveryCharges, setDeliveryCharges] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const addressesData = await addressService.getAll(authen?.user?.token);
        setAddress(addressesData.data.find((a) => a.isDefault));
      } catch (err) {
        console.log(err);
      }
    };
    if (authen?.user?.token) fetchData();
  }, [authen?.user?.token]);

  useEffect(() => {
    const getDeliveryCharges = async () => {
      const weight = cart.items.reduce((total, item) => {
        if (!item.isCheckout) return total;
        switch (item.size) {
          case "XS":
            return (total += 200 * item.quantity);
          case "S":
            return (total += 300 * item.quantity);
          case "M":
            return (total += 400 * item.quantity);
          case "L":
            return (total += 600 * item.quantity);
          case "XL":
            return (total += 800 * item.quantity);
          default:
            return (total += 400 * item.quantity);
        }
      }, 0);
      try {
        const data = await locationService.getDeliveryCharge(
          address.district.value,
          address.ward.value,
          weight
        );
        setDeliveryCharges(Math.ceil(data.data.data.total / 1000));
      } catch (err) {
        console.log(err);
      }
    };

    if (address) getDeliveryCharges();
  }, [address, cart]);

  const onCheckout = async () => {
    try {
      const orderData = {
        cart: items,
        address: `${address.address}, ${address.ward.text}, ${address.district.text}, ${address.province.text}`,
        phoneNumber: address.phoneNumber,
        receiverName: address.name,
        paymentMethod: "COD",
        status: "Waiting for payment",
        estimatedDeliveryDate: Date.now(),
        deliveryMethod: "Giao hàng nhanh",
        deliveryCharges,
        user: authen?.user?.id,
        totalDiscount: _.sum(items.map((i) => i.discount * i.quantity)),
        totalPayment:
          _.sum(items.map((i) => i.price * i.quantity)) +
          deliveryCharges -
          _.sum(items.map((i) => i.discount * i.quantity)),
      };

      const returnedOrder = await orderService.create(
        orderData,
        authen?.user?.token
      );
      await dispatch(
        clearCheckoutItems({ cart, token: authen?.user?.token })
      ).unwrap();

      for (let item of items) {
        const stock = await stockService.get(item.stock);
        const stockToUpdate = {
          ...stock.data,
          quantity: stock.data?.quantity - item.quantity,
          sold: stock.data?.sold + item.quantity,
        };
        await stockService.update(stockToUpdate.id, stockToUpdate);
      }
      history.push(`/user/order-history/view/${returnedOrder.data.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Wrapper>
      {!!cart.items.length ? (
        <div className={styles.container}>
          <Cart isShowCheckBox={false} />
          <CartSummary title="ORDER" onClick={onCheckout} />
        </div>
      ) : (
        <div className={styles.container}>
          <div className={styles.infoBox}>
            <img src="./images/logo.png" alt="" />
            <p>No items found</p>
            <LinkButton
              text="Back to Shopping"
              size="medium"
              url="/shop"
              className={styles.btn}
            />
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Checkout;
