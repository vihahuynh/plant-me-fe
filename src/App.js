import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./pages/home";
import Blogs from "./pages/blogs";
import About from "./pages/about";
import Contact from "./pages/contact";
import Shop from "./pages/shop";
import Login from "./pages/login";


function App() {
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
        <Route path="/contact">
          <Contact />
        </Route>
        <Route path="/blogs">
          <Blogs />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
