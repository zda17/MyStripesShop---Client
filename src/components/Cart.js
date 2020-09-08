import React, { useState, useContext, useEffect } from 'react';
import SlidingPane from "react-sliding-pane";
import { useHistory, useLocation } from 'react-router-dom';
import localStorage from '../utils/localStorage';

//assets
import { CartContext } from '../utils/CartContext';
import { MyContext } from '../utils/Context';

//routes

//components
import Image from "../components/Image";

//stlye
import "react-sliding-pane/dist/react-sliding-pane.css";
import "../stylesheets/Cart.scss";
import axios from '../utils/axios';

export const HandleQuantity = ({ product }) => {

  const { cart, setCart, isPaneOpen, maxAvailable, setMaxAvailable, currProduct, setCurrProduct } = useContext(CartContext);


  //adds 1 to quantity
  const increment = (e) => {
    const nameAttr = e.target.getAttribute("name")
    let newCart = [...cart];
    const itemInCart = newCart.find(
      (item) => nameAttr === item.sku
    );

    if (itemInCart && (itemInCart.quantity < itemInCart.quantity_available)) {
      let basePrice = itemInCart.totalProductPrice / itemInCart.quantity;
      itemInCart.quantity++;
      itemInCart.totalProductPrice = basePrice * itemInCart.quantity;
      setMaxAvailable(false);
      setCurrProduct('');
    } else if (itemInCart.quantity + 1 > itemInCart.quantity_available) {
      setMaxAvailable(true);
      setCurrProduct(itemInCart.sku);
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
    setMaxAvailable(false);

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

  const location = useLocation();

  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [status, setStatus] = useState('');

  const handleEmail = e => setEmail(e.target.value);
  const handleUserName = e => setUserName(e.target.value);

  const resetForm = () => {
    setEmail('');
    setUserName('');
  }

  const ValidateEmail = email => {
    const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email.match(mailformat)) {
      return true
    } else {
      return false;
    }
  }

  const submitEmail = e => {
    e.preventDefault();
    let data = {};
    if (ValidateEmail(email)) {
      data = {
        name: userName,
        email,
        product
      }
      axios.post('/wait-list', data)
        .then(res => {
          setMaxAvailable(false);
          setStatus('success');
          resetForm();
        })
        .catch(err => {
          console.log(err);
          setStatus('fail')
        })
    } else {
      setStatus('invalid')
    }
  }

  const closeOut = () => {
    setMaxAvailable(false);
    resetForm();
    setStatus('');
  }

  const maxAvailableMsg = product => {
    const { sku, quantity_available, name } = product;
    return (
      <form onSubmit={submitEmail} method="post" encType="text/plain" id={sku} className={location.pathname !== '/Cart' && isPaneOpen ? 'out-stock-wrapper' : 'out-stock-wrapper-cart-page'}>
        <label htmlFor="email" className='out-of-stock'>You're snatching up our last {quantity_available > 1 ? quantity_available + ' ' + name + 's' : name}! Enter your name and email to be the first to know when we restock.</label>
        <input type="text" id="name" name="name" value={userName} onChange={handleUserName} placeholder="name"></input>
        <input type="email" id="email" name="email" value={email} onChange={handleEmail} placeholder="email@gmail.com"></input>
        <input type="submit" value=">>"></input>
        <input type="button" value="No thanks!" onClick={closeOut}></input>
      </form>
    )
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
      {maxAvailable && currProduct === product.sku &&
        maxAvailableMsg(product)
      }
      {status === 'success' &&
        <div className={location.pathname !== '/Cart' && isPaneOpen ? 'email-sent-slideout' : 'email-sent'}>
          <p><i class="fas fa-check"></i>Your email has been sent!</p>
        </div>
      }
      {status === 'fail' && maxAvailable &&
        <div className='email-not-sent'>
          <p>Email did not send. Please try again.</p>
        </div>
      }
      {status === 'invalid' && maxAvailable &&
        <div className={location.pathname !== '/Cart' && isPaneOpen ? 'email-not-sent-slideout' : 'email-not-sent'}>
          <p><i class="fas fa-exclamation"></i>Email is invalid. Please try again.</p>
        </div>
      }
    </>
  )

}

//cart item component to insert into cart pane
export const CartItem = ({ displayQuantity, displayRemove, displayTotalProdPrice, numBub, open }) => {

  const { cart, setCart, setTotal } = useContext(CartContext);
  const { windowWidth } = useContext(MyContext);

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
            cart.map((product, index) => {
              return (
                <div className={windowWidth <= 1199 && open || windowWidth > 1199 ? 'show' : 'hide'}>
                  <div className='cart-item' key={index}>
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
                </div>
              )
            })
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
  const { cart, isPaneOpen, setIsPaneOpen, setMaxAvailable } = useContext(CartContext);

  //set panes width
  const { windowWidth } = useContext(MyContext);

  const location = useLocation();

  // If user gets out of stock message, removes item, then adds another item, the out of stock message was still there and INACCURATE. This function prevents that and closes out of that message if they remove the item from the cart.
  useEffect(() => {
    !isPaneOpen && location.pathname !== '/Cart' && setMaxAvailable(false);
  }, [isPaneOpen]);

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
        {cart && cart[0] ?
          <input type="submit" value={"CHECKOUT ~ $" + totalPrice} onClick={goToCheckout} />
          :
          <EmptyCart />
        }
      </SlidingPane>
      {/*responsive pane*/}

    </>
  );
};
