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
import NewProduct from "./pages/newProduct";
import OrderHistory from "./pages/orderHistory";
import OrderDetails from "./pages/orderDetails";
import NotificationHistory from "./pages/notificationHistory";

import { authenticationActions } from "./store";

const App = () => {
  const authen = useSelector((state) => state.authentication);
  const dispatch = useDispatch();
  useEffect(() => {
    const authenData = JSON.parse(localStorage.getItem("loggedUser"));
    if (!authen.isLoggedIn && authenData?.username) {
      dispatch(authenticationActions.login({ user: authenData }));
    }
  }, [authen.isLoggedIn, dispatch]);

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
        <Route path="/user/:userId/order-history/:orderId">
          <OrderDetails />
        </Route>
        <Route path="/user/:userId/order-history">
          <OrderHistory />
        </Route>
        <Route path="/user/:userId/notification">
          <NotificationHistory />
        </Route>
        <Route path="/admin/products/new">
          <NewProduct />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
