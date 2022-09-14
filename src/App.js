import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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

const App = () => {
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
        <Route path="/admin/products/new">
          <NewProduct />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
