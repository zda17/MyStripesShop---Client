import React, { useContext, useEffect } from 'react';
import { CartContext } from '../utils/CartContext';
import { CartItem, HandleQuantity } from '../components/Cart';
import Image from "../components/Image";
import '../stylesheets/CartPage.scss';
import '../stylesheets/Checkout.scss';
import '../stylesheets/UserInfoForm.scss';
import { useHistory } from 'react-router-dom';

export default function CartPage() {
    const { cart } = useContext(CartContext);

    function getTotalPrice() {
        return cart.reduce((sum, { totalProductPrice }) => sum + totalProductPrice, 0);
    };

    let totalPrice = getTotalPrice();

    const history = useHistory();

    const goToCheckout = () => {
        history.push('/Checkout');
    }

    return (
        <>
            <section className='cart-page-container'>
                <h2>CART</h2>
                <section className='cart-info-wrapper'>
                    <ul className='cart-items-list'>
                        <li>PRODUCT</li>
                        <article className='cart-page-article-item'>
                            <CartItem
                                displayQuantity={false}
                                displayRemove={true}
                                displayTotalProdPrice={false}
                            />
                        </article>
                    </ul>
                    <ul className='quantity-list'>
                        <li>QUANTITY</li>
                        {cart.map(product =>
                            <li>
                                <article className='cart-page-article quantity-box'>
                                    <HandleQuantity
                                        product={product}
                                    />
                                </article>
                            </li>
                        )}
                    </ul>
                    <ul className='item-price-times-quantity'>
                        <li>TOTAL</li>
                        {cart.map(product =>
                            <article className='cart-page-article'>
                                <p className='total-prod-price'>${product.totalProductPrice}</p>
                            </article>
                        )}
                    </ul>
                </section>
                <section className='checkout-total-wrapper'>
                    <h3 className='checkout-total-title'>CART TOTAL: ${totalPrice}<span className='usd'> (USD)</span></h3>
                    <h4>Shipping & taxes calculated at checkout</h4>
                    <button type='button' className='checkout-btn' onClick={goToCheckout}>CHECKOUT</button>
                </section>
            </section>
        </>
    )
}