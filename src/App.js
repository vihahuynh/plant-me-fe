import "./App.css";
import { HashRouter as Router, Switch, Route } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/home";
// import Blogs from "./pages/blogs";
import About from "./pages/about";
import Contact from "./pages/contact";
import Shop from "./pages/shop";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signup";
import ProductDetails from "./pages/productDetails";
import CartPage from "./pages/cart";
import ChangeDeliveryAddress from "./pages/changeDeliveryAddress";
import Checkout from "./pages/checkout";
import SendPasswordResetLink from "./pages/sendPasswordResetLink";
import PasswordReset from "./pages/passwordReset";
import NotFoundPage from "./pages/notFound";

// guest
import GuestOrder from "./pages/guestOrder";
import GuestOrderTracking from "./pages/guestOrderTracking";

// admin page
import NewProduct from "./pages/admin/newProduct";
import AdminProducts from "./pages/admin/products";
import UpdateProduct from "./pages/admin/updateProduct";
import AdminOrderHistory from "./pages/admin/adminOrderHistory";
import AdminOrderDetails from "./pages/admin/adminOrderDetails";

// user page
import OrderHistory from "./pages/user/orderHistory";
import OrderDetails from "./pages/user/orderDetails";
import NotificationHistory from "./pages/user/notificationHistory";
import FavoriteProducts from "./pages/user/favoriteProducts";
import ReviewHistory from "./pages/user/reviewHistory";
import Account from "./pages/user/account";
import DeliveryAddress from "./pages/user/deliveryAddress";
import OrderTracking from "./pages/user/orderTracking";

import { authenticationActions, cartActions } from "./store";
import cartService from "./services/cart";

const App = () => {
  const authen = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  useEffect(() => {
    const authenData = JSON.parse(localStorage.getItem("loggedUser"));
    // const isExpiredToken = authenData?.token ? loginService.isExpiredToken(authenData?.token) : true
    if (!authen.isLoggedIn && authenData?.user?.id) {
      dispatch(authenticationActions.login({ user: authenData.user }));
    }
  }, [authen.isLoggedIn, dispatch, authen]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartData = await cartService.get(
          authen?.user?.cart,
          authen?.user?.token
        );
        dispatch(cartActions.updateCart({ cart: cartData.data }));
      } catch (err) {
        console.log(err);
      }
    };
    if (authen?.user) {
      fetchData();
    }
  }, [authen?.user, dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/shop">
          <Shop />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/cart">
          <CartPage />
        </Route>
        <Route path="/cart/change-delivery-address">
          <ChangeDeliveryAddress />
        </Route>
        <Route path="/products/:id">
          <ProductDetails />
        </Route>
        <Route path="/user/order-history/tracking/:orderId">
          <OrderTracking />
        </Route>
        <Route path="/user/order-history/view/:orderId">
          <OrderDetails />
        </Route>
        <Route path="/user/order-history">
          <OrderHistory />
        </Route>
        <Route path="/user/notification">
          <NotificationHistory />
        </Route>
        <Route path="/user/favorite-products">
          <FavoriteProducts />
        </Route>
        <Route path="/user/address">
          <DeliveryAddress />
        </Route>
        <Route path="/user/reviews">
          <ReviewHistory />
        </Route>
        <Route path="/user/me">
          <Account />
        </Route>
        <Route path="/orders/view/:orderId">
          <GuestOrder />
        </Route>
        <Route path="/orders/tracking/:orderId">
          <GuestOrderTracking />
        </Route>
        <Route path="/admin/products/new">
          <NewProduct />
        </Route>
        <Route exact path="/admin/order-history">
          <AdminOrderHistory />
        </Route>
        <Route path="/admin/order-history/:orderId">
          <AdminOrderDetails />
        </Route>
        <Route exact path="/admin/products">
          <AdminProducts />
        </Route>
        <Route path="/admin/products/:id">
          <UpdateProduct />
        </Route>
        <Route exact path="/password-reset">
          <SendPasswordResetLink />
        </Route>
        <Route path="/password-reset/:userId/:token">
          <PasswordReset />
        </Route>
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
