import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import Wrapper from "../components/layout/wrapper";
import Cart from "../components/cart/cart";
import CartSummary from "../components/cart/cartSummary";
import LinkButton from "../components/UI/buttons/linkbutton";
import RadioInput from "../components/UI/inputs/radioInput";

import { clearCheckoutItems } from "../store/cartSlice";

import styles from "./checkout.module.scss";
import stockService from "../services/stock";
import locationService from "../services/location";
import addressService from "../services/address";
import orderService from "../services/order";

import _ from "lodash";
import BankCard from "../components/UI/bankCard";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const authen = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  const history = useHistory();
  const items = cart.items.filter((item) => item.isCheckout);

  const [address, setAddress] = useState();
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("COD");

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
        paymentMethod,
        status:
          paymentMethod === "COD"
            ? "Waiting for confirmation"
            : "Waiting for payment",
        progress: [
          paymentMethod === "COD"
            ? {
              title: "Waiting for confirmation",
              description: "Waiting for Plantme's confirmation",
            }
            : {
              title: "Waiting for payment",
            },
        ],
        deliveryMethod: "Giao hang nhanh",
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
          <div>
            <Cart isShowCheckBox={false} />
            <div className={styles.deliveryMethodBox}>
              <h5>Delivery method</h5>
              <div className={styles.deliveryMethod}>
                <img src="./images/ghn-logo.png" alt="ghn-logo" />
                <p>Delivery by Giao hanh nhanh</p>
              </div>
            </div>
            <div className={styles.paymentMethodBox}>
              <h5>Choose payment method</h5>
              <div className={styles.radioGroup}>
                <RadioInput
                  key="COD"
                  name="paymentMethod"
                  value="COD"
                  label="Cash on delivery"
                  onChange={() => {
                    setPaymentMethod("COD");
                  }}
                  checked={paymentMethod === "COD" ? true : false}
                />
                <RadioInput
                  key="Bank transfer"
                  name="paymentMethod"
                  value="Bank transfer"
                  label="Bank Transfer"
                  onChange={() => {
                    setPaymentMethod("Bank transfer");
                  }}
                  checked={paymentMethod === "Bank transfer" ? true : false}
                />
              </div>
              <div
                className={`${styles.bankList} ${paymentMethod === "Bank transfer" ? styles.active : ""
                  }`}
              >
                <p>
                  Bank transfer content:{" "}
                  {address?.name?.replaceAll(" ", "")?.toUpperCase()}
                  {address?.phoneNumber?.slice(6, 10)}
                </p>
                {["./images/bidv-logo.png", "./images/msb-logo.png"].map(
                  (bank) => (
                    <BankCard key={bank} bankLogo={bank} />
                  )
                )}
              </div>
            </div>
          </div>
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
