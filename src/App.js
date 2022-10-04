import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Home from "./pages/home";
import Blogs from "./pages/blogs";
import About from "./pages/about";
import Contact from "./pages/contact";
import Shop from "./pages/shop";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import ProductDetails from "./pages/productDetails";
import CartPage from "./pages/cart";
import Checkout from "./pages/checkout";

// admin page
import NewProduct from "./pages/admin/newProduct";
import AdminProducts from "./pages/admin/products";
// user page
import OrderHistory from "./pages/user/orderHistory";
import OrderDetails from "./pages/user/orderDetails";
import NotificationHistory from "./pages/user/notificationHistory";
import FavoriteProducts from "./pages/user/favoriteProducts";
import ReviewHistory from "./pages/user/reviewHistory";
import Account from "./pages/user/account";
import UpdateProductForm from "./components/products/productUpdateForm";
import DeliveryAddress from "./pages/user/deliveryAddress";

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
        const cartData = await cartService.get(authen?.user?.cart, authen?.user?.token)
        dispatch(cartActions.updateCart({ cart: cartData.data }))
      } catch (err) {
        console.log(err)
      }
    }
    if (authen?.user) {
      fetchData()
    }
  }, [authen?.user, dispatch])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/products/:id">
          <ProductDetails />
        </Route>
        <Route exact path="/shop">
          <Shop />
        </Route>
        <Route path="/cart">
          <CartPage />
        </Route>
        <Route path="/checkout">
          <Checkout />
        </Route>
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/blogs">
          <Blogs />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/signup">
          <SignUp />
        </Route>
        <Route exact path="/user/:userId">
          <Account />
        </Route>
        <Route path="/user/:userId/order-history/:orderId">
          <OrderDetails />
        </Route>
        <Route path="/user/:userId/order-history">
          <OrderHistory />
        </Route>
        <Route path="/user/:userId/notification">
          <NotificationHistory />
        </Route>
        <Route path="/user/:userId/favorite-products">
          <FavoriteProducts />
        </Route>
        <Route path="/user/:userId/address">
          <DeliveryAddress />
        </Route>
        <Route path="/user/:userId/reviews">
          <ReviewHistory />
        </Route>
        <Route path="/admin/products/new">
          <NewProduct />
        </Route>
        <Route exact path="/admin/products">
          <AdminProducts />
        </Route>
        <Route path="/admin/products/:id">
          <UpdateProductForm />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
