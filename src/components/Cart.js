import React, { useState, useContext, useEffect } from 'react';
import SlidingPane from "react-sliding-pane";
import { useHistory, Link } from 'react-router-dom';
import localStorage from '../utils/localStorage';

//assets
import { CartContext } from '../utils/CartContext';

//routes


//components
import Image from "../components/Image";

//stlye
import "react-sliding-pane/dist/react-sliding-pane.css";
import "../stylesheets/Cart.scss";
import NumberBubble from './NumberBubble';

export const HandleQuantity = ({ product }) => {

  const { cart, setCart } = useContext(CartContext);

  const [outOfStock, setOutOfStock] = useState(false);

  const submitEmail = () => {
    // function to save email for sending updates on products
    console.log('save that email!');
  }

  //adds 1 to quantity
  const increment = (e) => {
    const nameAttr = e.target.getAttribute("name")
    console.log(cart);
    let newCart = [...cart];
    const itemInCart = newCart.find(
      (item) => nameAttr === item.sku
    );

    if (itemInCart && (itemInCart.quantity < itemInCart.quantity_available)) {
      let basePrice = itemInCart.totalProductPrice / itemInCart.quantity;

      itemInCart.quantity++;
      itemInCart.totalProductPrice = basePrice * itemInCart.quantity;
    }
    if (itemInCart.quantity >= itemInCart.quantity_available) {
      console.log('out of stock!');
      setOutOfStock(true);
    }
    setCart(newCart);
    localStorage.setUserCart(newCart);
  }

  //minus 1 from quanitity
  const decrement = (e) => {
    const nameAttr = e.target.getAttribute("name")
    console.log(cart);
    let newCart = [...cart];
    const itemInCart = newCart.find(
      (item) => nameAttr === item.sku
    );

    if (itemInCart) {
      if (itemInCart.quantity > 1) {
        let basePrice = itemInCart.totalProductPrice / itemInCart.quantity;
        --itemInCart.quantity;
        itemInCart.totalProductPrice = basePrice * itemInCart.quantity;
        setCart(newCart);
        localStorage.setUserCart(newCart);
      } else {
        let filteredCart = cart.filter(lineItem => lineItem.sku !== nameAttr);
        setCart(filteredCart);
        localStorage.setUserCart(filteredCart);
      };
    }
  }

  return (
    <>
      <div className="cart-options">
        <div className="quantity-input">
          <button name={product.sku} className="quantity-input__modifier quantity-input__modifier--left" onClick={decrement}>
            &mdash;
                </button>
          <input className="quantity-input__screen" type="number" value={product.quantity} max={product.quantity_available} readOnly />
          <button name={product.sku} className="quantity-input__modifier quantity-input__modifier--right" onClick={increment}>
            &#xff0b;
                </button>
        </div>
      </div>
      {outOfStock &&
        <div className='out-stock-wrapper'>
          <p className='out-of-stock'>Oops! Out of stock. Enter your email to be the first to know when it's back in stock.</p>
          <input type='text' placeholder="email@email.com"></input><span><button type='button' onClick={submitEmail}>>></button></span>
        </div>
      }
    </>
  )

}

//cart item component to insert into cart pane
export const CartItem = ({ displayQuantity, displayRemove, displayTotalProdPrice, numBub }) => {

  const { cart, setCart, setTotal } = useContext(CartContext);
  console.log(cart);

  //removes cart item based on sku.
  const remove = (e) => {
    const nameAttr = e.target.getAttribute("name");
    let filteredCart = cart.filter(lineItem => lineItem.sku !== nameAttr);
    setCart(filteredCart);
    localStorage.setUserCart(filteredCart);
    setTotal(0);
  };

  //converts size abbr to word
  const getSize = (size) => {
    if (size === "XS") {
      return "X-SMALL";
    } else if (size === "S") {
      return "SMALL";
    } else if (size === "M") {
      return "MEDIUM";
    } else if (size === "L") {
      return "LARGE";
    } else if (size === "XL") {
      return "X-LARGE";
    } else if (size === "XXL") {
      return "XX-Large";
    } else if (size === "XXXL") {
      return "XXX-LARGE";
    }
  }


  return (
    <>
      {/*lists all items in cart*/}
      {cart &&
        <>
          {
            cart.map((product, index) => (
              <div className="cart-item" key={index}>
                <div className="cart-image">
                  <Image
                    to={"/Products/" + product.base_sku}
                    imgDivClass='img-div-cart-page'
                    imgClass='product-img'
                    product={product}
                    numBub={numBub && product.quantity}
                  />
                </div>
                <div className="cart-info">
                  <h2><strong>{product.name}</strong></h2>
                  <span><p>{getSize(product.size)} ~ {product.color_name.toUpperCase()}</p></span>
                  <span>${displayTotalProdPrice ? product.totalProductPrice : product.price}</span>{displayRemove && <span className="cart-remove" name={product.sku} onClick={remove}>Remove</span>}
                  {displayQuantity &&
                    <HandleQuantity
                      product={product}
                    />}
                </div>
              </div>
            ))
          }
        </>
      }
    </>
  );
}

export const EmptyCart = () => {
  const { isPaneOpen, setIsPaneOpen } = useContext(CartContext);

  const history = useHistory();

  const goShop = () => {
    isPaneOpen && setIsPaneOpen(false);
    history.push('/Products/All');
  }

  return (
    <section className='empty-cart'>
      <h3>Cart is empty.</h3>
      <button type='button' onClick={goShop} className='shop-btn'>
        <i class="fa fa-angle-double-left" aria-hidden="true"></i>
        GO SHOP
      </button>
    </section>
  )
}


export const Cart = () => {

  //used to pass cart array
  const { cart, isPaneOpen, setIsPaneOpen } = useContext(CartContext);

  //set panes width
  const [windowWidth, setWindowWidth] = useState(0);
  let resizeWindow = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    resizeWindow();
    window.addEventListener("resize", resizeWindow);
    return () => window.removeEventListener("resize", resizeWindow);
  }, []);

  //gets total price
  function getTotalPrice() {
    if (cart) {
      return cart.reduce((sum, { totalProductPrice }) => sum + totalProductPrice, 0);
    }
  };

  let totalPrice = getTotalPrice() || 0;

  // useHistory for changing routes
  const history = useHistory();

  // onClick function that goes to checkout and closes cart pane
  const goToCheckout = () => {
    history.push('/Checkout');
    setIsPaneOpen(false);
  }

  const openCart = () => {
    setIsPaneOpen(true);
  }

  return (
    <>
      <div className="cart-wrapper">
        {/*cart button*/}
        <i className="fa fa-shopping-cart cart" aria-hidden="true" onClick={openCart}></i>
      </div>

      {/*pane and its contents*/}
      <SlidingPane
        className="cart-pane"
        overlayClassName="cart-overlay"
        isOpen={isPaneOpen}
        title="CART"
        width={windowWidth >= 380 ? "360px" : "90%"}
        onRequestClose={() => {
          // triggered on "<" on left top click or on outside click
          setIsPaneOpen(false);
          window.scrollTo(0, 0);
        }}
      >
        <CartItem
          displayQuantity={true}
          displayRemove={true}
          displayTotalProdPrice={false}
        />
        {cart[0] ?
          <input type="submit" value={"CHECKOUT ~ $" + totalPrice} onClick={goToCheckout} />
          :
          <EmptyCart />
        }
      </SlidingPane>
      {/*responsive pane*/}

    </>
  );
};
