import React, { useContext, useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import UserInfoForm from '../components/Checkout/UserInfoForm';
import '../stylesheets/Checkout.scss';
import { CartItem, EmptyCart } from '../components/Cart';
import { CartContext } from '../utils/CartContext';
import { MyContext } from '../utils/Context';
import { Link } from 'react-router-dom';
import localStorage from '../utils/localStorage';

// Calculate costs and manage state for subtotal, shipping, taxes, coupon, and total
const Costs = ({ open }) => {
    const { cart, total, setTotal, isPaneOpen } = useContext(CartContext);
    const { windowWidth } = useContext(MyContext);

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
        <div className={windowWidth <= 1199 && open === true || windowWidth > 1199 ? 'show' : 'hide'}>
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
                    <li>FREE SHIPPING</li>
                    <li>${taxes} (estimated)</li>
                </ul>
            </section>
            <section className='checkout-total-wrapper'>
                <h3 className='checkout-total-title'>Total</h3>
                <h2 className='checkout-total-amount'><span className='usd'>USD </span>${total}</h2>
            </section>
        </div>
    )
}


const Checkout = () => {
    const { cart, total, paid } = useContext(CartContext);
    const { windowWidth } = useContext(MyContext);

    const [open, setOpen] = useState(false)

    return (
        <>
            {cart && cart[0] ?
                <section className={paid ? 'completed-order' : 'checkout-container'}>
                    <section className={paid ? 'paid-card-display' : 'cart-display'}>
                        {paid &&
                            <div className='paid-div'>
                                <h1>Payment of ${total} successful!</h1>
                            </div>
                        }
                        {windowWidth <= 1199 && !paid ?
                            <header className='order-sum-header' onClick={() => setOpen(!open)}>
                                <h1><i className="fa fa-shopping-cart cart" aria-hidden="true"> </i>{!open ? ' Show' : ' Hide'} order summary {!open ? <i class="fas fa-chevron-down"></i> : <i class="fas fa-chevron-up"></i>}</h1>
                                <h1>{total ? '$' + total : ''}</h1>
                            </header>
                            :
                            <h2>Order Summary</h2>
                        }
                        <CartItem
                            open={open}
                            displayRemove={false}
                            displayQuantity={false}
                            displayTotalProdPrice={true}
                            numBub={true}
                        />
                        {!paid && <div className={windowWidth <= 1199 && open === true || windowWidth > 1199 ? 'show' : 'hide'}>
                            <div className={'button-div'}>
                                <Link to='/Cart' className='cart-btn'>
                                    <i class="fa fa-angle-double-left" aria-hidden="true"></i>
                                    Return to cart
                                </Link>
                            </div>
                        </div>
                        }
                        {!paid && <Costs
                            open={open}
                        />}
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
