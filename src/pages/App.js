import "./App.css";
import { Switch, Route } from "react-router-dom";

import Wrapper from "../components/layout/wrapper";
import Home from "./home";
import Blogs from "./Blogs";
import About from "./About";
import Contact from "./contact";
import Shop from "./Shop";


function App() {
  return (
    <Wrapper>
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
      </Switch>
    </Wrapper>
  );
}

export default App;
