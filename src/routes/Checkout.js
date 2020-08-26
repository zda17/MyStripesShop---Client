import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import UserInfoForm from '../components/Checkout/UserInfoForm';
import '../stylesheets/Checkout.scss';
import { CartItem, EmptyCart } from '../components/Cart';
import { CartContext } from '../utils/CartContext';
import { Link } from 'react-router-dom';

// Calculate costs and manage state for subtotal, shipping, taxes, coupon, and total
const Costs = () => {
    const { cart, total, setTotal, isPaneOpen } = useContext(CartContext);

    useEffect(() => {
        !isPaneOpen && window.scrollTo(0, 0);
        calculateTotal();
    }, [cart])


    const [subtotal, setSubtotal] = useState(0);
    const [shipping, setShipping] = useState(0);
    const [taxes, setTaxes] = useState(0);
    const [coupon, setCoupon] = useState(0);

    const calculateSubtotal = () => {
        if (cart[0]) {
            setSubtotal(cart.map(product => product.totalProductPrice).reduce((prev, next) => prev + next));
        }
    };

    const calculateShipping = () => {
        console.log(shipping);
    }

    const calculateTaxes = () => {
        setTaxes(parseInt(((subtotal + shipping) * 0.08).toFixed(2)));
    }

    const applyCoupon = () => {
        console.log('Apply discount code');
        setCoupon(0)
        // function to apply discount coupon to total
        // - Will need discount_codes table in DB
        // - Check provided discount code against discount_codes in DB
    }

    const calculateTotal = () => {
        setTotal((subtotal + shipping + taxes) - coupon);
    };

    useEffect(() => {
        if (cart) {
            calculateSubtotal();
        };
    }, [cart]);

    useEffect(() => {
        if (subtotal) {
            calculateTaxes();
        };
    }, [subtotal]);

    useEffect(() => {
        if (subtotal && taxes) {
            calculateTotal();
        };
    }, [subtotal, taxes, total]);

    const { register, handleSubmit } = useForm();

    return (
        <>
            <section>
                <form className='discount-form' onSubmit={handleSubmit(applyCoupon)}>
                    <input type='text' name='Discount' className='discount-input' ref={register} placeholder='Discount code' />
                    <button type='submit' className='apply-btn'>Apply</button>
                </form>
            </section>
            <section className='checkout-prices-wrapper'>
                <ul className='checkout-price-titles'>
                    <li>Subtotal</li>
                    <li>Shipping</li>
                    <li>Taxes</li>
                </ul>
                <ul className='checkout-price-amounts'>
                    <li>${subtotal}</li>
                    <li>{shipping ? shipping : 'Calculated at next step'}</li>
                    <li>${taxes} (estimated)</li>
                </ul>
            </section>
            <section className='checkout-total-wrapper'>
                <h3 className='checkout-total-title'>Total</h3>
                <h2 className='checkout-total-amount'><span className='usd'>USD </span>${total}</h2>
            </section>
        </>
    )
}


const Checkout = () => {

    const { cart } = useContext(CartContext);

    const [userShipInfo, setUserShipInfo] = useState(false);

    return (
        <>
            {cart[0] ?
                <section className="checkout-container">
                    <section className='cart-display'>
                        <h1>Order Summary</h1>
                        <CartItem
                            displayRemove={false}
                            displayQuantity={false}
                            displayTotalProdPrice={true}
                            numBub={true}
                        />
                        <div className='button-div'>
                            <Link to='/Cart' className='cart-btn'>
                                <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                                Return to cart
                        </Link>
                        </div>
                        <Costs />
                        {/* {userShipInfo && <Index />} */}
                    </section>
                    <section className='user-checkout-info'>
                        <UserInfoForm />
                    </section>
                </section>
                :
                <EmptyCart />
            }
        </>
    );
};

export default Checkout;
