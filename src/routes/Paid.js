import React, { useContext, useEffect } from 'react';
import '../stylesheets/Checkout.scss';
import { CartItem } from '../components/Cart';
import { CartContext } from '../utils/CartContext';
import { useHistory } from 'react-router-dom';
import localStorage from '../utils/localStorage';


const Paid = () => {
    const { cart, setCart, total, paid, setPaid, userInfo, confCode } = useContext(CartContext);

    const clearCart = () => {
        setCart([]);
        setPaid(false);
    }

    const history = useHistory();

    useEffect(() => {
        return () => {
            clearCart();
            localStorage.clearCart();
            localStorage.clearItem();
        };
    }, [])

    useEffect(() => {
        return () => { history.push('/') };
    }, [cart])

    return (
        <section className='completed-order'>
            <section className='paid-card-display'>
                {paid &&
                    <>
                        <div className='paid-div'>
                            <h1>Payment of <strong>${total}</strong> successful!<i class="fas fa-check"></i></h1>
                            <h5>Thank you for your order.</h5>
                            <h5>Your confirmation code is <strong>{confCode}</strong>.</h5>
                            <h5>A confirmation email has been sent to <strong>{userInfo.email}</strong>.</h5>
                        </div>
                        <hr className='horizontal-line'></hr>
                        <CartItem
                            open={true}
                            displayRemove={false}
                            displayQuantity={false}
                            displayTotalProdPrice={true}
                            numBub={true}
                        />
                    </>
                }
            </section>
        </section>
    )
}

export default Paid;