import React, { useContext, useEffect } from 'react';
import './App.css';
import './stylesheets/Buttons.scss';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { MyContext } from '../src/utils/Context';
import { CartContext } from '../src/utils/CartContext';
import localStorage from './utils/localStorage';


//components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

//routes
import About from "./routes/About";
import Product from "./routes/Product";
import Checkout from "./routes/Checkout";
import ShowAll from "./routes/ShowAll";
import Mens from "./routes/Mens";
import Womens from "./routes/Womens";
import Contact from "./routes/Contact";
import Login from "./routes/Login";
import Home from "./routes/Home";
import CartPage from "./routes/CartPage";


function App() {

  const { menuOpenState, setMenuOpenState } = useContext(MyContext)
  const { cart, setCart } = useContext(CartContext)

  useEffect(() => {
    document.body.onclick = function () {
      menuOpenState && setMenuOpenState(!menuOpenState);
    }
  }, [menuOpenState, setMenuOpenState]);

  useEffect(() => {
    if (cart) {
      let newCart = localStorage.getUserCart();
      setCart(newCart);
    }
  }, []);


  return (
    <Router>
      <>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/Products/All">
            <ShowAll />
          </Route>
          <Route exact path="/Products/Mens">
            <Mens />
          </Route>
          <Route exact path="/Products/Womens">
            <Womens />
          </Route>
          <Route exact path="/Products/:base_sku"
            render={(props) => <Product {...props} />}
          >
          </Route>
          <Route exact path="/Cart">
            <CartPage />
          </Route>
          <Route exact path="/Checkout">
            <Checkout />
          </Route>
          <Route exact path="/About">
            <About />
          </Route>
          <Route exact path="/Contact">
            <Contact />
          </Route>
          <Route exact path="/Login">
            <Login />
          </Route>
          <Route>
            {/* Error page? */}
          </Route>
        </Switch>
        <Footer />
      </>
    </Router>
  );
}

export default App;