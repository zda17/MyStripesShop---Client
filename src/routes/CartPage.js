import React, { useContext, useState, useEffect } from 'react';
import { CartContext } from '../utils/CartContext';
import { MyContext } from '../utils/Context';
import { CartItem, HandleQuantity, EmptyCart } from '../components/Cart';
import '../stylesheets/CartPage.scss';
import '../stylesheets/Checkout.scss';
import '../stylesheets/UserInfoForm.scss';
import { useHistory } from 'react-router-dom';
import localStorage from '../utils/localStorage';

export default function CartPage() {
    const { cart } = useContext(CartContext);
    const { windowWidth } = useContext(MyContext);

    function getTotalPrice() {
        return cart.reduce((sum, { totalProductPrice }) => sum + totalProductPrice, 0);
    };

    let totalPrice = getTotalPrice();

    const history = useHistory();

    const goToCheckout = () => {
        history.push('/Checkout');
        localStorage.setTotalPrice(totalPrice + parseInt(((totalPrice) * 0.08).toFixed(2)));
    }

    return (
        <>
            {cart && cart[0] ?
                <section className='cart-page-container'>
                    <h1>CART</h1>
                    {windowWidth > 780 && <hr className='horizontal-line'></hr>}
                    <section className='cart-info-wrapper'>
                        <ul className='cart-items-list'>
                            {windowWidth > 780 && <li id='product'>PRODUCT</li>}
                            <article className='cart-page-article-item'>
                                <CartItem
                                    displayQuantity={windowWidth > 400 ? false : true}
                                    displayRemove={true}
                                    displayTotalProdPrice={windowWidth > 780 ? false : true}
                                />
                            </article>
                        </ul>
                        <ul className='quantity-list'>
                            {windowWidth > 780 &&
                                <li id='quantity'>QUANTITY</li>}
                            {windowWidth > 400 && 
                            cart.map(product =>
                                <li>
                                    <article className='cart-page-article quantity-box'>
                                        <HandleQuantity
                                            product={product}
                                        />
                                    </article>
                                </li>
                            )}
                        </ul>
                        {windowWidth > 780 &&
                            <ul className='item-price-times-quantity'>
                                <li id='total'>TOTAL</li>
                                {cart.map(product =>
                                    <article className='cart-page-article'>
                                        <p className='total-prod-price'>${product.totalProductPrice}</p>
                                    </article>
                                )}
                            </ul>
                        }
                    </section>
                    {windowWidth > 780 &&
                        <hr className='horizontal-line-bottom'></hr>
                    }
                    <section className='cart-total-wrapper'>
                        <h3 className='checkout-total-title'>CART TOTAL: ${totalPrice}<span className='usd'> (USD)</span></h3>
                        <h4>Shipping & taxes calculated at checkout</h4>
                        <button type='button' className='checkout-btn' onClick={goToCheckout}>CHECKOUT</button>
                    </section>
                </section>
                :
                <EmptyCart />
            }
        </>
    )
}