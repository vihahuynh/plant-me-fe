import { useDispatch, useSelector } from "react-redux";
import orderService from "../services/order";

import Wrapper from "../components/layout/wrapper";
import Cart from "../components/cart/cart";
import CartSummary from "../components/cart/cartSummary";
import LinkButton from "../components/UI/buttons/linkbutton";

import { clearCheckoutItems } from "../store/cartSlice";

import styles from "./checkout.module.scss";
import stockService from "../services/stock";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const authen = useSelector((state) => state.authentication);
  const dispatch = useDispatch();

  const items = cart.items.filter((item) => item.isCheckout);
  const onCheckout = async () => {
    try {
      const orderData = {
        cart: items,
        address: "none",
        receiverName: "meow",
        paymentMethod: "COD",
        status: "Waiting for payment",
        estimatedDeliveryDate: Date.now(),
        deliveryMethod: "meow",
        deliveryCharges: 20,
        user: authen?.user?.id,
      };

      const returnedOrder = await orderService.create(
        orderData,
        authen?.user?.token
      );
      console.log("your order: ", returnedOrder);
      await dispatch(clearCheckoutItems({ cart, token: authen?.user?.token })).unwrap();

      for (let item of items) {
        const stock = await stockService.get(item.stock)
        console.log(stock)
        const stockToUpdate = {
          ...stock.data,
          quantity: stock.data?.quantity - item.quantity,
        };
        await stockService.update(stockToUpdate.id, stockToUpdate);
      }
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
